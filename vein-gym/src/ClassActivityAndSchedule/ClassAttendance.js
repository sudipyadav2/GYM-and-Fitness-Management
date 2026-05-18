import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useAuth } from "../AuthContext";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where
} from "firebase/firestore";

export default function ClassAttendance() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // 1. Get user registrations
      const regQ = query(
        collection(db, "classRegistrations"),
        where("userId", "==", user.uid)
      );
      const regSnap = await getDocs(regQ);
      const regList = regSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRegistrations(regList);

      // 2. Get all classes
      const classSnap = await getDocs(collection(db, "classes"));
      setClasses(classSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      // 3. Load attendance for each class
      let attData = {};
      for (let reg of regList) {
        const attRef = doc(db, "classAttendance", reg.classId);
        const attSnap = await getDoc(attRef);
        attData[reg.classId] = attSnap.exists() ? attSnap.data() : {};
      }
      setAttendance(attData);
    };

    fetchData();
  }, [user.uid]);

  const markAttendance = async (classId) => {
    await setDoc(
      doc(db, "classAttendance", classId),
      { [user.uid]: true },
      { merge: true }
    );

    // refresh attendance
    const attRef = doc(db, "classAttendance", classId);
    const attSnap = await getDoc(attRef);
    setAttendance((prev) => ({
      ...prev,
      [classId]: attSnap.exists() ? attSnap.data() : {}
    }));
  };

  return (
    <div style={{ padding: "20px", marginTop: "40px" }}>
      <h2>Your Class Attendance</h2>

      <ul>
        {registrations.map((reg) => {
          const cls = classes.find((c) => c.id === reg.classId);
          const attended = attendance[reg.classId]?.[user.uid] ? 1 : 0;

          return (
            <li key={reg.id} style={{ marginTop: "15px" }}>
              <strong>{cls?.name}</strong>

              <p>Attendance: {attended ? "Present" : "Not Marked"}</p>

              {!attended && (
                <button onClick={() => markAttendance(reg.classId)}>
                  Mark Attendance
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
