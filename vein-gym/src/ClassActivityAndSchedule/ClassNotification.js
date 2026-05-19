import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useAuth } from "../AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ClassNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const q = query(
        collection(db, "classNotifications"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Sort newest first
      list.sort((a, b) => new Date(b.date) - new Date(a.date));

      setNotifications(list);
    };

    fetchNotifications();
  }, [user.uid]);

  return (
    <div style={{ padding: "30px", maxWidth: "800px", marginTop: "40 px" }}>
      <h2 style={{ marginBottom: "20px" }}>Notifications</h2>

      {notifications.length === 0 && <p>No notifications yet.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              display: "flex",
              gap: "15px",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          >
            {/* IMAGE */}
            <img
              src={n.image}
              alt={n.className}
              style={{
                width: "120px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{n.className}</h3>
              <p style={{ margin: "0 0 5px 0" }}>{n.message}</p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                {new Date(n.date).toLocaleString()}
              </p>

              <Link to={`/class/register/${n.classId}`}>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "#00e5ff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  View Class
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
