import { BrowserRouter as Router, Routes, Route, Navigate,useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./Componenet/Navbar";
import Footer from "./Componenet/Footer";

import MemberRegistration from "./Member Management/MemberRegistration";
import Login from "./Member Management/MemberLogin";
import Dashboard from "./Member Management/Memberdashboard";
import Homepage from "./Member Management/Homepage";
import Viewprofile from "./Member Management/Viewprofile";
import Editprofile from "./Member Management/Editprofile";
import DeleteAccount from "./Member Management/DeleteAccount";
import ForgotPassword from "./Member Management/ForgotPassword";
import Emailverification from "./Member Management/Emailverification";
import Updateprofilepicture from "./Member Management/Updateprofilepicture";

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

import TrainerProfilePage from "./AssignTrainerandTrack/Trainerprofile";
import TrainerAvailabilityCalendar from "./AssignTrainerandTrack/Traineravailability";
import TrainerLeaveManagement from "./AssignTrainerandTrack/Trainerleave";
import AssignTrainer from "./AssignTrainerandTrack/assigntrainer";
import TrackTrainerHours from "./AssignTrainerandTrack/Tracktrainer";
import TrainerListPage from "./AssignTrainerandTrack/TrainerListPage";
import AddTrainer from "./AssignTrainerandTrack/AddTrainer";
function AppContent() {
  const location = useLocation();
  return (
    <>
  
      
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
              path="/member/profile"
              element={
                <ProtectedRoute>
                  <Viewprofile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member/editprofile"
              element={
                <ProtectedRoute>
                  <Editprofile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member/updatepicture"
              element={
                <ProtectedRoute>
                  <Updateprofilepicture />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member/deleteaccount"
              element={
                <ProtectedRoute>
                  <DeleteAccount />
                </ProtectedRoute>
              }
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/email-verification"
              element={
                <ProtectedRoute>
                  <Emailverification />
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
           <Route
              path="/trainer/:id"
              element={
                <ProtectedRoute>
                  <TrainerProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/trainer-availability"
              element={
                <AdminRoute>
                  <TrainerAvailabilityCalendar />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/trainer-leave"
              element={
                <AdminRoute>
                  <TrainerLeaveManagement />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/assign-trainer"
              element={
                <AdminRoute>
                  <AssignTrainer />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/trainer-hours"
              element={
                <AdminRoute>
                  <TrackTrainerHours />
                </AdminRoute>
              }
            />
            <Route
  path="/trainers"
  element={
    <ProtectedRoute>
      <TrainerListPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/add-trainer"
  element={
    <AdminRoute>
      <AddTrainer />
    </AdminRoute>
  }
/>

         
          <Route path="*" element={<Navigate to="/" replace />} />
        
       
        </Routes>
        </div>
        {location.pathname==="/"&&<Footer />}
     
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
export default App;
