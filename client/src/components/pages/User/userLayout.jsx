import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logOut } from "../../../services/auth.api";
import { MyTheme } from "../../../context/ThemeContext";
import { MoonIcon, Sun } from "lucide-react";

const UserLayout = () => {
    const { dark, setDark } = useContext(MyTheme);
    const navigate = useNavigate();

    // ================= LOGOUT =================

    const logoutMutation = useMutation({
        mutationFn: logOut,

        onSuccess: (response) => {
            localStorage.removeItem("accessToken");

            toast.success(
                response?.message || "Logout successfully"
            );

            navigate("/login", {
                replace: true,
            });
        },

        onError: (error) => {
            console.log("Logout error:", error);

            // Token localStorage se remove kar dena
            // chahe backend logout fail ho
            localStorage.removeItem("accessToken");

            toast.error(
                error?.response?.data?.message ||
                "Logout failed"
            );

            navigate("/login", {
                replace: true,
            });
        },
    });

    // ================= DESKTOP NAV =================

    const navLinkClass = ({ isActive }) =>
        `rounded-xl px-4 py-2 text-sm font-medium transition ${
            isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
        }`;

    // ================= MOBILE NAV =================

    const mobileNavLinkClass = ({ isActive }) =>
        `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-xs font-medium transition ${
            isActive
                ? "text-indigo-600"
                : "text-slate-500"
        }`;

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">

            {/* ================================================= */}
            {/* DESKTOP / TOP NAVBAR */}
            {/* ================================================= */}

            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
   <button
           className="absolute mt-5 ml-2"
           onClick={() => setDark(!dark)}>
            {dark ? <Sun/> : <MoonIcon/>}
        </button>
                <div className="flex min-h-[64px] w-full items-center justify-between px-4 md:px-8">

                    {/* Logo */}

                    <NavLink
                        to="/dashboard"
                        className="shrink-0 ml-7 text-xl font-bold text-slate-900"
                    >
                        Worker
                        <span className="text-indigo-600">
                            Panel
                        </span>
                    </NavLink>


                    {/* Desktop Navigation */}

                    <div className="hidden items-center gap-1 md:flex md:gap-2">

                        <NavLink
                            to="/dashboard"
                            className={navLinkClass}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/myattendance"
                            className={navLinkClass}
                        >
                            Attendance
                        </NavLink>

                        <NavLink
                            to="/salary"
                            className={navLinkClass}
                        >
                            Salary
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={navLinkClass}
                        >
                            Profile
                        </NavLink>


                        {/* Logout */}

                        <button
                            type="button"
                            onClick={() =>
                                logoutMutation.mutate()
                            }
                            disabled={logoutMutation.isPending}
                            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {logoutMutation.isPending
                                ? "Logging out..."
                                : "Logout"}
                        </button>

                    </div>


                    {/* Mobile Logout */}

                    <button
                        type="button"
                        onClick={() =>
                            logoutMutation.mutate()
                        }
                        disabled={logoutMutation.isPending}
                        className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
                    >
                        {logoutMutation.isPending
                            ? "..."
                            : "Logout"}
                    </button>

                </div>

            </nav>


            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <main className="w-full pb-20 md:pb-0">
                <Outlet />
            </main>


            {/* ================================================= */}
            {/* MOBILE BOTTOM NAVBAR */}
            {/* ================================================= */}

            <nav className="stat-card fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-4px_15px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">

                <div className="flex h-[68px] items-center justify-around px-1">

                    {/* Dashboard */}

                    <NavLink
                        to="/dashboard"
                        className={mobileNavLinkClass}
                    >
                        <span className="text-xl">
                            🏠
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </NavLink>


                    {/* Attendance */}

                    <NavLink
                        to="/myattendance"
                        className={mobileNavLinkClass}
                    >
                        <span className="text-xl">
                            📋
                        </span>

                        <span>
                            Attendance
                        </span>
                    </NavLink>


                    {/* Salary */}

                    <NavLink
                        to="/salary"
                        className={mobileNavLinkClass}
                    >
                        <span className="text-xl">
                            💰
                        </span>

                        <span>
                            Salary
                        </span>
                    </NavLink>


                    {/* Profile */}

                    <NavLink
                        to="/profile"
                        className={mobileNavLinkClass}
                    >
                        <span className="text-xl">
                            👤
                        </span>

                        <span>
                            Profile
                        </span>
                    </NavLink>

                </div>

            </nav>

        </div>
    );
};

export default UserLayout;