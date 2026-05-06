import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Admin({ children }) {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setRole(snap.data().role);
      }

      setChecking(false);
    };

    fetchRole();
  }, [user]);

  if (loading || checking) {
    return <p>Loading...</p>;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/AdminLogin" replace />;
  }

  return children;
}