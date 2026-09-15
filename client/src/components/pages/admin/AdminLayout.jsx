import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logOut } from "../../../services/auth.api";
import { MyTheme } from "../../../context/ThemeContext";
import { MoonIcon, Sun,  } from "lucide-react";

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

    return (
        <div className=" w-full min-h-screen bg-slate-50">
           <button
           className="absolute mt-5 ml-2"
           onClick={() => setDark(!dark)}>
            {dark ? <Sun/> : <MoonIcon/>}
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
                                    `px-4 py-2 rounded-lg ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/admin/workers"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`
                                }
                            >
                                Workers
                            </NavLink>

                            <NavLink
                                to="/admin/attendance"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`
                                }
                            >
                                Attendance
                            </NavLink>

                            <NavLink
                                to="/admin/salary"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`
                                }
                            >
                                
                                Salary
                            </NavLink>

                            <NavLink
                                to="/admin/profile"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg ${
                                        isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-slate-600 hover:bg-slate-100"
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
            <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-200">

                <div className="h-16 flex items-center justify-around">

                    <NavLink
                        to="/adminDashboard"
                        className={({ isActive }) =>
                            `text-xs ${
                                isActive
                                    ? "text-indigo-600 font-semibold"
                                    : "text-slate-500"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/workers"
                        className={({ isActive }) =>
                            `text-xs ${
                                isActive
                                    ? "text-indigo-600 font-semibold"
                                    : "text-slate-500"
                            }`
                        }
                    >
                        Workers
                    </NavLink>

                    <NavLink
                        to="/admin/attendance"
                        className={({ isActive }) =>
                            `text-xs ${
                                isActive
                                    ? "text-indigo-600 font-semibold"
                                    : "text-slate-500"
                            }`
                        }
                    >
                        Attendance
                    </NavLink>

                    <NavLink
                        to="/admin/salary"
                        className={({ isActive }) =>
                            `text-xs ${
                                isActive
                                    ? "text-indigo-600 font-semibold"
                                    : "text-slate-500"
                            }`
                        }
                    >
                        Salary
                    </NavLink>

                    <NavLink
                        to="/admin/profile"
                        className={({ isActive }) =>
                            `text-xs ${
                                isActive
                                    ? "text-indigo-600 font-semibold"
                                    : "text-slate-500"
                            }`
                        }
                    >
                        Profile
                    </NavLink>

                </div>

            </nav>

        </div>
    );
};

export default AdminLayout;