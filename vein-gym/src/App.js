import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";

import MemberRegistration from "./Member Management/MemberRegistration";
import Login from "./Member Management/MemberLogin";
import Dashboard from "./Member Management/Memberdashboard";
import Homepage from "./Member Management/Homepage";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import ProtectedRoute from "../../Class Activity and Schedule/ProtectedRoute";
import Admin from "../../Class Activity and Schedule/Admin";
import ClassAttendance from "../../Class Activity and Schedule/ClassAttendance";
import ClassCategories from "../../Class Activity and Schedule/ClassCategories";
import Classes from "../../Class Activity and Schedule/Classes";
import ClassNotifications from "../../Class Activity and Schedule/ClassNotification";
import ClassRegistration from "../../Class Activity and Schedule/ClassRegistration";
import Schedule from "../../Class Activity and Schedule/Schedule";
import ViewClasses from "../../Class Activity and Schedule/Viewclasses";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Homepage */}
          <Route path="/" element={<Homepage />} />

          {/* Member */}
          <Route path="/register" element={<MemberRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

        
          <Route
            path="/classes"
            element={
              <ProtectedRoute>
                <Viewclasses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/class/register/:id"
            element={
              <ProtectedRoute>
                <ClassRegistration />
              </ProtectedRoute>
            }
          />

          <Route
            path="/class/attendance"
            element={
              <ProtectedRoute>
                <ClassAttendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/class/notifications"
            element={
              <ProtectedRoute>
                <ClassNotifications />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/class-categories"
            element={
              <Admin>
                <ClassCategories />
              </Admin>
            }
          />

          <Route
            path="/admin/classes"
            element={
              <Admin>
                <Classes />
              </Admin>
            }
          />

          <Route
            path="/admin/class-schedule"
            element={
              <Admin>
                <Schedule />
              </Admin>
            }
          />
          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;