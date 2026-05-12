import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useAuth } from "../AuthContext";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore";

export default function ClassAttendance() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const fetchData = async () => {
    const regQ = query(
      collection(db, "classRegistrations"),
      where("userId", "==", user.uid)
    );
    const regSnap = await getDocs(regQ);

    const classSnap = await getDocs(collection(db, "classes"));
    const attSnap = await getDocs(collection(db, "classAttendance"));

    setRegistrations(regSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setClasses(classSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setAttendance(attSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markAttendance = async (classId) => {
    await addDoc(collection(db, "classAttendance"), {
      classId,
      userId: user.uid,
      date: new Date().toLocaleDateString()
    });

    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Class Attendance</h2>

      <ul>
        {registrations.map((reg) => {
          const cls = classes.find((c) => c.id === reg.classId);
          const attended = attendance.filter(
            (a) => a.classId === reg.classId && a.userId === user.uid
          );

          return (
            <li key={reg.id} style={{ marginTop: "15px" }}>
              <strong>{cls?.name}</strong>

              <p>Attendance Count: {attended.length}</p>

              <button onClick={() => markAttendance(reg.classId)}>
                Mark Attendance
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}