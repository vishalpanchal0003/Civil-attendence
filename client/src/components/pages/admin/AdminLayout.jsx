import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logOut } from "../../../services/auth.api";
import { MyTheme } from "../../../context/ThemeContext";
import { CalendarDays, IndianRupeeIcon, LucideHome, MoonIcon, Sun, User, UserGroup, } from "lucide-react";

const AdminLayout = () => {
    const { dark, setDark } = useContext(MyTheme);

    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: logOut,

        onSuccess: (response) => {
            localStorage.removeItem("accessToken");

            toast.success(
                response?.message || "Logout successfully"
            );

            navigate("/login", { replace: true });
        },

        onError: (error) => {
            localStorage.removeItem("accessToken");

            toast.error(
                error?.response?.data?.message || "Logout failed"
            );

            navigate("/login", { replace: true });
        },
    });
     const mobileNavLinkClass = ({ isActive }) =>
  `w-16 h-10 flex items-center justify-center rounded-full
   transition-all duration-300 ease-out
   backdrop-blur-xl
   border
   shadow-black

   ${
     isActive
   
       ? "bg-white/45   text-black-600 scale-110 border-blue-200 shadow-black"
       : "bg-white/10 border-white/20 text-slate-700 hover:bg-white/30 hover:border-white/40 hover:scale-105"
   }`;

    return (
        <div className=" w-full min-h-screen bg-slate-50">
            <button
                className="absolute mt-5 ml-2"
                onClick={() => setDark(!dark)}>
                {dark ? <Sun /> : <MoonIcon />}
            </button>

            {/* Header */}
            <header className=" bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6">

                    <div className=" h-16 flex ml-10 items-center justify-between">

                        {/* Logo */}
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">
                                Admin Panel
                            </h1>

                            <p className="text-xs text-slate-500">
                                Attendance Management System
                            </p>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-2">
                            <NavLink
                                to="/adminDashboard"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${isActive
                                        ? "bg-indigo-600 text-white rounded-3xl"
                                        : "text-slate-600 hover:bg-blue-300 rounded-3xl "
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/admin/workers"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${isActive
                                        ? "bg-indigo-600 text-white rounded-3xl"
                                        : "text-slate-600 hover:bg-blue-300 rounded-3xl "
                                    }`
                                }
                            >
                                Workers
                            </NavLink>

                            <NavLink
                                to="/admin/attendance"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${isActive
                                        ? "bg-indigo-600 text-white rounded-3xl"
                                        : "text-slate-600 hover:bg-blue-300 rounded-3xl "
                                    }`
                                }
                            >
                                Attendance
                            </NavLink>

                            <NavLink
                                to="/admin/salary"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${isActive
                                        ? "bg-indigo-600 text-white rounded-3xl"
                                        : "text-slate-600 hover:bg-blue-300 rounded-3xl "
                                    }`
                                }
                            >

                                Salary
                            </NavLink>

                            <NavLink
                                to="/admin/profile"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${isActive
                                        ? "bg-indigo-600 text-white rounded-3xl"
                                        : "text-slate-600 hover:bg-blue-300 rounded-3xl "
                                    }`
                                }
                            >
                                Profile
                            </NavLink>

                            <button
                                onClick={() => logoutMutation.mutate()}
                                disabled={logoutMutation.isPending}
                                className="ml-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                            >
                                {logoutMutation.isPending
                                    ? "Logging out..."
                                    : "Logout"}
                            </button>

                        </nav>

                        {/* Mobile Logout */}
                        <button
                            onClick={() => logoutMutation.mutate()}
                            disabled={logoutMutation.isPending}
                            className="md:hidden px-3 py-2 rounded-lg bg-red-500 text-white text-sm"
                        >
                            Logout
                        </button>

                    </div>

                </div>
            </header>


            {/* Page Content */}
            <main className="pb-20 md:pb-0">
                <Outlet />
            </main>


            {/* Mobile Navigation */}
            <nav className="h-16 items-center justify-center mb-2 shadow-black/60 w-[90%] max-w-[385px] rounded-full stat-card fixed bottom-2 left-1/2 -translate-x-1/2 z-50 border-2 border-solid border-black/60 bg-transparent shadow-[0_-4px_15px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden">

                <div className="h-16 flex items-center justify-around">

                    <NavLink
                        to="/adminDashboard"
                        className={mobileNavLinkClass}
                    >
                        <LucideHome />
                    </NavLink>

                    <NavLink
                        to="/admin/workers"
                         className={mobileNavLinkClass}
                    >
                        <UserGroup />
                    </NavLink>

                    <NavLink
                        to="/admin/attendance"
                         className={mobileNavLinkClass}
                    >
                        <CalendarDays />
                    </NavLink>

                    <NavLink
                        to="/admin/salary"
                        className={mobileNavLinkClass}
                    >
                        <IndianRupeeIcon />
                    </NavLink>

                    <NavLink
                        to="/admin/profile"
                        className={mobileNavLinkClass}
                    >
                        <User />
                    </NavLink>

                </div>

            </nav>

        </div>
    );
};

export default AdminLayout;