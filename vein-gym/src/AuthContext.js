import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged , signOut} from "firebase/auth";
import { auth,db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user || null);
        if (user) {
          const snap = await getDoc(doc(db, "users", user.uid));
          setRole(snap.data().role);
        } else {
          setRole(null);
        }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
