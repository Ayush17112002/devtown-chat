import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  where,
  or,
  and,
  getDoc,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
const senderId = "eOgI1cd34cYOwUceGBz9";
export default function Chat({ receiverId }) {
  const text = useRef("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      let unsub;
      try {
        const q = query(
          collection(db, "chats"),
          or(
            and(
              where("sentBy", "==", receiverId),
              where("receivedBy", "==", senderId)
            ),
            and(
              where("sentBy", "==", senderId),
              where("receivedBy", "==", receiverId)
            )
          ),
          orderBy("createdAt"),
          limit(50)
        );
        unsub = onSnapshot(q, (querySnapshot) => {
          let msgs = [];
          querySnapshot.forEach((message) => {
            msgs.push(message.data());
          });
          setMessages(msgs);
        });
      } catch (err) {
        console.log(err);
      }
      return () => unsub;
    };
    fetchMessages();
  }, [receiverId]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (text.current.value === "") {
      alert("Enter valid message");
      return;
    }
    await addDoc(collection(db, "chats"), {
      message: text.current.value,
      sentBy: senderId,
      receivedBy: receiverId,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="relative right-page min-h-screen w-1/2">
      <div className="relative messages min-h-screen w-1/2">
        {messages.map((message, index) => {
          return (
            <div key={index} className="relative m-3">
              <div
                className={`
              right-px
            `}
              >
                {message.message}
              </div>
            </div>
          );
        })}
      </div>
      <div className=" absolute inset-x-0 bottom-0 h-16">
        <input type="text" className="w-4/5 bg-slate-300" ref={text}></input>
        <button onClick={sendMessage} id="sendBtn">
          Send
        </button>
      </div>
    </div>
  );
}
