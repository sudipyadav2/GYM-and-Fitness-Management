import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

export default function ClassRegistration() {
  const { id } = useParams();
  const { user } = useAuth();

  const [classInfo, setClassInfo] = useState(null);
  const [message, setMessage] = useState("");

  const fetchClass = async () => {
    const snap = await getDocs(collection(db, "classes"));
    const cls = snap.docs.find((d) => d.id === id);
    if (cls) setClassInfo({ id: cls.id, ...cls.data() });
  };

  useEffect(() => {
    fetchClass();
  }, []);

  const register = async () => {
    const q = query(
      collection(db, "classRegistrations"),
      where("classId", "==", id),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      setMessage("You are already registered for this class.");
      return;
    }

    await addDoc(collection(db, "classRegistrations"), {
      classId: id,
      userId: user.uid,
      timestamp: new Date()
    });

    setMessage("Successfully registered!");
  };

  if (!classInfo) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register for {classInfo.name}</h2>
      <p>Category: {classInfo.category}</p>
      <p>Instructor: {classInfo.instructor}</p>
      <p>{classInfo.description}</p>

      <button onClick={register}>Confirm Registration</button>

      {message && <p>{message}</p>}
    </div>
  );
}