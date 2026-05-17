import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./Componenet/Navbar";
import Footer from "./Componenet/Footer";
/* Member Pages */
import MemberRegistration from "./Member Management/MemberRegistration";
import Login from "./Member Management/MemberLogin";
import Dashboard from "./Member Management/Memberdashboard";
import Homepage from "./Member Management/Homepage";

/* Admin Pages */
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";

import ProtectedRoute from "./ClassActivityAndSchedule/ProtectedRoute";
import AdminRoute from "./ClassActivityAndSchedule/Admin";

import Viewclasses from "./ClassActivityAndSchedule/Viewclasses";
import ClassRegistration from "./ClassActivityAndSchedule/ClassRegistration";
import ClassAttendance from "./ClassActivityAndSchedule/ClassAttendance";
import ClassNotifications from "./ClassActivityAndSchedule/ClassNotification";

import ClassCategories from "./ClassActivityAndSchedule/ClassCategories";
import Classes from "./ClassActivityAndSchedule/Classes";
import Schedule from "./ClassActivityAndSchedule/Schedule";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="page-wrapper">
        <Routes>
       
        
          <Route path="/" element={<Homepage />} />

     
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
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

         
          <Route
            path="/admin/class-categories"
            element={
              <AdminRoute>
                <ClassCategories />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/classes"
            element={
              <AdminRoute>
                <Classes />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/class-schedule"
            element={
              <AdminRoute>
                <Schedule />
              </AdminRoute>
            }
          />

          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        
       
        </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
