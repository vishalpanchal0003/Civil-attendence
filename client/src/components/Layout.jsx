import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import UserLayout from "./pages/User/userLayout";
import UserDashboard from "./pages/User/UserDashboard";
import Attendance from "./pages/User/Attendence";
import UserProfile from "./pages/User/UserProfile";
import ForgetPassword from "./pages/User/ForgetPassword";
import ProtectedRoute from "./pages/User/ProtectedRoute";
import Salary from "./pages/User/Salary";
import AdminRegister from './pages/admin/Register'
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AllWorkers from "./pages/admin/AllWorkers";
import AllWorkerAttendacne from "./pages/admin/AllWorkerAttendacne";
import AllWorkerSalary from "./pages/admin/AllWorkerSalary";
import AdminProfile from "./pages/admin/AdminProfile";


const Layout = () => {
    return (
        <Routes>

            {/* Auth Routes */}
            <Route
                path="/"
                element={<Register />}
            />
            <Route
                path="/register/admin"
                element={<AdminRegister />}
            />

            <Route
                path="/forgetpassword"
                element={<ForgetPassword />}
            />
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>

                {/* User */}
                <Route element={<UserLayout />}>
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/myattendance" element={<Attendance />} />
                    <Route path="/salary" element={<Salary />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Route>

                {/* Admin */}
                <Route element={<AdminLayout />}>
                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/admin/workers" element={<AllWorkers />} />
                    <Route path="/admin/attendance" element={<AllWorkerAttendacne />} />
                    <Route path="/admin/salary" element={<AllWorkerSalary />} />
                    *<Route path="/admin/profile" element={<AdminProfile />} />
                </Route>

            </Route>

        </Routes>
    );
};

export default Layout;