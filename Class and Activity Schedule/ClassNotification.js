
import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useAuth } from "../AuthContext";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

export default function ClassNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const q = query(
      collection(db, "classNotifications"),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(q);
    setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Class Notifications</h2>

      <ul>
        {notifications.map((n) => (
          <li key={n.id} style={{ marginTop: "10px" }}>
            <strong>{n.title}</strong>
            <p>{n.message}</p>
            <small>{n.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}