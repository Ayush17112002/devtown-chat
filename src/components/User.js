import { db } from "../firebase";
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";

import { useEffect, useState } from "react";
const senderId = "eOgI1cd34cYOwUceGBz9";
export default function User({ onUserChange }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({ user: doc.data(), id: doc.id });
        });
        setUsers(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="users-list min-h-screen w-1/2">
      {users.map((user) => {
        if (user.id !== senderId) {
          return (
            <button
              key={user.id}
              id={user.id}
              className="user block"
              onClick={onUserChange}
            >
              {user.id}
            </button>
          );
        }
      })}
    </div>
  );
}
