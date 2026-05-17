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
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Load class
      const classSnap = await getDocs(collection(db, "classes"));
      const cls = classSnap.docs.find((d) => d.id === id);

      if (!cls) return;

      const classData = { id: cls.id, ...cls.data() };
      setClassInfo(classData);

      // Load category
      const catSnap = await getDocs(collection(db, "classCategories"));
      const cat = catSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .find((c) => c.name === classData.category);

      setCategory(cat);

      // Load schedule
      const scheduleSnap = await getDocs(collection(db, "classSchedule"));
      const classSchedule = scheduleSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((s) => s.classId === id);

      setSchedule(classSchedule);

      // Check if user already registered
      const regSnap = await getDocs(
        query(
          collection(db, "classRegistrations"),
          where("classId", "==", id),
          where("userId", "==", user.uid)
        )
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
    <div style={{ padding: "30px", maxWidth: "700px", margin: "auto" }}>
      {/* IMAGE */}
      <img
        src={category.image}
        alt={classInfo.name}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      />

      {/* CLASS NAME */}
      <h2>{classInfo.name}</h2>

      {/* TAGS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {category.tags?.map((t) => (
          <span
            key={t}
            style={{
              padding: "6px 12px",
              background: "#f0f0f0",
              borderRadius: "20px",
              fontSize: "12px"
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* TRAINER */}
      <p>
        <strong>Trainer:</strong> {classInfo.trainer}
      </p>

      {/* DESCRIPTION */}
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
