import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logOut } from "../../../services/auth.api";
import { MyTheme } from "../../../context/ThemeContext";

import {
    CalendarDays,
    IndianRupeeIcon,
    LucideHome,
    MoonIcon,
    Sun,
    User,
    UserGroup,
} from "lucide-react";

const AdminLayout = () => {
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
        `rounded-3xl px-4 py-2 text-sm font-medium transition ${isActive
            ? "bg-indigo-600 text-white"
            : "text-slate-600 hover:bg-blue-300"
        }`;

    // ================= MOBILE GLASS NAV =================

 const mobileNavLinkClass = ({ isActive }) =>
    `w-12 h-10 flex items-center justify-center rounded-full
    transition-all duration-300 ease-out
    backdrop-blur-xl
    border
    ${
        isActive
            ? "bg-white/45 bg-blue-700 text-white scale-110"
            : "bg-white/10 border-white/20 text-slate-700 hover:bg-white/30 hover:border-white/40 hover:scale-105"
    }`;

    return (
        <div className="w-full min-h-screen bg-slate-50">

            {/* ================================================= */}
            {/* THEME BUTTON */}
            {/* ================================================= */}

            <button
                className="absolute mt-5 ml-2 z-50"
                onClick={() => setDark(!dark)}
            >
                {dark ? <Sun /> : <MoonIcon />}
            </button>

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <header className="bg-white border-b border-slate-200">

                <div className="max-w-7xl mx-auto px-4 md:px-6">

                    <div className="h-16 flex ml-10 items-center justify-between">

                        {/* Logo */}

                        <div>
                            <h1 className="text-xl font-bold text-slate-900">
                                Admin Panel
                            </h1>

                            <p className="text-xs text-slate-500">
                                Attendance Management System
                            </p>
                        </div>

                        {/* ================================================= */}
                        {/* DESKTOP NAVIGATION */}
                        {/* ================================================= */}

                        <nav className="hidden md:flex items-center gap-2">

                            <NavLink
                                to="/adminDashboard"
                                className={navLinkClass}
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/admin/workers"
                                className={navLinkClass}
                            >
                                Workers
                            </NavLink>

                            <NavLink
                                to="/admin/attendance"
                                className={navLinkClass}
                            >
                                Attendance
                            </NavLink>

                            <NavLink
                                to="/admin/salary"
                                className={navLinkClass}
                            >
                                Salary
                            </NavLink>

                            <NavLink
                                to="/admin/profile"
                                className={navLinkClass}
                            >
                                Profile
                            </NavLink>

                            {/* Logout */}

                            <button
                                onClick={() =>
                                    logoutMutation.mutate()
                                }
                                disabled={logoutMutation.isPending}
                                className="ml-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {logoutMutation.isPending
                                    ? "Logging out..."
                                    : "Logout"}
                            </button>

                        </nav>

                        {/* ================================================= */}
                        {/* MOBILE LOGOUT */}
                        {/* ================================================= */}

                        <button
                            onClick={() =>
                                logoutMutation.mutate()
                            }
                            disabled={logoutMutation.isPending}
                            className="md:hidden px-3 py-2 rounded-xl bg-red-500 text-white text-sm font-medium transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {logoutMutation.isPending
                                ? "..."
                                : "Logout"}
                        </button>

                    </div>

                </div>

            </header>

            {/* ================================================= */}
            {/* PAGE CONTENT */}
            {/* ================================================= */}

            <main className="pb-20 md:pb-0">
                <Outlet />
            </main>

            {/* ================================================= */}
            {/* MOBILE GLASS BOTTOM NAVIGATION */}
            {/* ================================================= */}

          <nav className="
    w-[90%] max-w-[380px]
    rounded-full
    fixed bottom-2 left-1/2 -translate-x-1/2
    z-50
    px-2
    md:hidden
    bg-black/20
    backdrop-blur-xl
    border-2 border-black/60
">

                <div className="flex h-[55px] items-center justify-around">

                    {/* Dashboard */}

                    <NavLink
                        to="/adminDashboard"
                        className={mobileNavLinkClass}
                    >
                        <LucideHome size={22} />
                    </NavLink>

                    {/* Workers */}

                    <NavLink
                        to="/admin/workers"
                        className={mobileNavLinkClass}
                    >
                        <UserGroup size={22} />
                    </NavLink>

                    {/* Attendance */}

                    <NavLink
                        to="/admin/attendance"
                        className={mobileNavLinkClass}
                    >
                        <CalendarDays size={22} />
                    </NavLink>

                    {/* Salary */}

                    <NavLink
                        to="/admin/salary"
                        className={mobileNavLinkClass}
                    >
                        <IndianRupeeIcon size={22} />
                    </NavLink>

                    {/* Profile */}

                    <NavLink
                        to="/admin/profile"
                        className={mobileNavLinkClass}
                    >
                        <User size={22} />
                    </NavLink>

                </div>

            </nav>

        </div>
    );
};

export default AdminLayout;