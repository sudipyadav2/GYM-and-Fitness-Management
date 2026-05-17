import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ViewClasses() {
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    const classSnap = await getDocs(collection(db, "classes"));
    const catSnap = await getDocs(collection(db, "classCategories"));
    const scheduleSnap = await getDocs(collection(db, "classSchedule"));

    setClasses(classSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setCategories(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setSchedule(scheduleSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredClasses = filter
    ? classes.filter((c) => c.category === filter)
    : classes;

  const getCategory = (name) =>
    categories.find((c) => c.name === name) || {};

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>All Classes</h2>

      {/* FILTER */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "25px"
        }}
      >
        {filteredClasses.map((cls) => {
          const cat = getCategory(cls.category);
          const classSchedule = schedule.filter((s) => s.classId === cls.id);

          return (
            <div
              key={cls.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                background: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
                cursor: "pointer"
              }}
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cls.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "15px" }}>
                {/* CLASS NAME */}
                <h3 style={{ margin: "0 0 10px 0" }}>{cls.name}</h3>

                {/* TAGS */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "10px"
                  }}
                >
                  {cat.tags?.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "5px 10px",
                        background: "#f0f0f0",
                        borderRadius: "15px",
                        fontSize: "12px"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* TRAINER */}
                <p style={{ margin: "5px 0" }}>
                  <strong>Trainer:</strong> {cls.trainer}
                </p>

                {/* SCHEDULE */}
                <p style={{ margin: "5px 0" }}>
                  <strong>Schedule:</strong>{" "}
                  {classSchedule.length === 0
                    ? "No schedule yet"
                    : classSchedule.map((s) => (
                        <span key={s.id}>
                          {s.date} at {s.time}{" "}
                        </span>
                      ))}
                </p>

                {/* REGISTER BUTTON */}
                <Link to={`/class/register/${cls.id}`}>
                  <button
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      padding: "10px",
                      background: "#00e5ff",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    View / Register
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
