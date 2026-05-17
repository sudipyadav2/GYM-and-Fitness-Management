import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc
} from "firebase/firestore";

export default function ClassRegistration() {
  const { id } = useParams();
  const { user } = useAuth();

  const [classInfo, setClassInfo] = useState(null);
  const [category, setCategory] = useState(null);
  const [schedule, setSchedule] = useState([]);
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

      setIsRegistered(!regSnap.empty);
    };

    fetchData();
  }, [id, user.uid]);

  // REGISTER
  const register = async () => {
    if (isRegistered) {
      setMessage("You are already registered.");
      return;
    }

    await addDoc(collection(db, "classRegistrations"), {
      classId: id,
      userId: user.uid,
      timestamp: new Date()
    });

    // Notification
    await addDoc(collection(db, "classNotifications"), {
      userId: user.uid,
      classId: id,
      className: classInfo.name,
      category: classInfo.category,
      image: category.image,
      message: `You registered for ${classInfo.name}`,
      date: new Date().toISOString()
    });

    setIsRegistered(true);
    setMessage("Successfully registered!");
  };

  // CANCEL REGISTRATION
  const cancelRegistration = async () => {
    const q = query(
      collection(db, "classRegistrations"),
      where("classId", "==", id),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      await deleteDoc(snap.docs[0].ref);

      // Notification
      await addDoc(collection(db, "classNotifications"), {
        userId: user.uid,
        classId: id,
        className: classInfo.name,
        category: classInfo.category,
        image: category.image,
        message: `You cancelled your registration for ${classInfo.name}`,
        date: new Date().toISOString()
      });

      setIsRegistered(false);
      setMessage("Registration cancelled.");
    }
  };

  if (!classInfo || !category) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register for {classInfo.name}</h2>
      <p>Category: {classInfo.category}</p>
      <p>Instructor: {classInfo.instructor}</p>
      <p>{classInfo.description}</p>

      {/* SCHEDULE */}
      <h3>Schedule</h3>
      {schedule.length === 0 ? (
        <p>No schedule available</p>
      ) : (
        schedule.map((s) => (
          <p key={s.id}>
            {s.date} at {s.time}
          </p>
        ))
      )}

      {/* REGISTER / CANCEL BUTTON */}
      {isRegistered ? (
        <button
          onClick={cancelRegistration}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Cancel Registration
        </button>
      ) : (
        <button
          onClick={register}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            background: "#00e5ff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      )}

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}
