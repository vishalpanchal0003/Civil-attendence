import { useMutation } from "@tanstack/react-query";
import React, { Suspense, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logOut } from "../../../services/auth.api";
import { MyTheme } from "../../../context/ThemeContext";
import {
    Calendar1Icon,
    HomeIcon,
    IndianRupee,
    MoonIcon,
    Sun,
    User2,
} from "lucide-react";
import Loading from "../../common/Loader";

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
            ? "bg-indigo-600 text-white rounded-3xl"
            : "text-slate-600 hover:bg-blue-300 rounded-3xl"
        }`;

    // ================= MOBILE NAV =================

const mobileNavLinkClass = ({ isActive }) =>
  `w-20 h-10 flex items-center justify-center rounded-full
   transition-all duration-300 ease-out
   backdrop-blur-xl
   border
   ${
     isActive
   
       ? "bg-white/45 bg-blue-700  text-black-600 scale-110 "
       : "bg-white/10 border-white/20 text-slate-700 hover:bg-white/30 hover:border-white/40 hover:scale-105"
   }`;

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">

            {/* ================================================= */}
            {/* DESKTOP / TOP NAVBAR */}
            {/* ================================================= */}

            <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">

                <button
                    className="absolute mt-5 ml-2"
                    onClick={() => setDark(!dark)}
                >
                    {dark ? <Sun /> : <MoonIcon />}
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
                        className="bg-red-500 rounded-xl px-3 py-2 text-sm font-medium text-black-600 transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
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

            <main className="pb-20 md:pb-0">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>

            {/* ================================================= */}
            {/* MOBILE BOTTOM NAVBAR */}
            {/* ================================================= */}

            <nav className=" shadow-black/60 w-[90%] max-w-[380px] rounded-full stat-card fixed bottom-2 left-1/2 -translate-x-1/2 z-50 border-2 border-solid border-black/60 bg-transparent shadow-[0_-4px_15px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden">
                <div className="flex   h-[55px] items-center justify-around ">

                    {/* Dashboard */}

                    <NavLink
                        to="/dashboard"
                        className={mobileNavLinkClass}
                    >
                        <HomeIcon />
                    </NavLink>

                    {/* Attendance */}

                    <NavLink
                        to="/myattendance"
                        className={mobileNavLinkClass}
                    >
                        <Calendar1Icon />
                    </NavLink>

                    {/* Salary */}

                    <NavLink
                        to="/salary"
                        className={mobileNavLinkClass}
                    >
                        <IndianRupee />
                    </NavLink>

                    {/* Profile */}

                    <NavLink
                        to="/profile"
                        className={mobileNavLinkClass}
                    >
                        <User2 />
                    </NavLink>

                </div>

            </nav>

        </div>
    );
};

export default UserLayout;