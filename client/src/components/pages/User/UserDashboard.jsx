import { useQuery } from "@tanstack/react-query";
import {
    getMyAttendance,
    getMySalary,
} from "../../../services/attendance.api";
import AttendBtn from "./AttendBtn";

const UserDashboard = () => {

    // ================= ATTENDANCE =================

    const {
        data: attendanceData,
        isPending: attendancePending,
    } = useQuery({
        queryKey: ["myattendance"],
        queryFn: getMyAttendance,
    });

    const username =
        attendanceData?.attendance?.[0]?.userId?.name || "";

    const presentDays = attendanceData?.attendance?.filter(
        (a) => a.status === "Present"
    ) || [];

    // ================= SALARY =================

    const currentMonth = new Date()
        .toISOString()
        .slice(0, 7);

    const {
        data: salaryData,
        isPending: salaryPending
    } = useQuery({
        queryKey: ["my-salary", currentMonth],
        queryFn: () => getMySalary(currentMonth),
    });

    console.log("attendance data for today", attendanceData);

    const todayDate = new Date().toISOString().slice(0, 10);

    const todayPunch = attendanceData?.attendance?.filter(
        (record) => record?.date === todayDate
    ) || [];

    return (
        <div className="min-h-screen w-full bg-slate-50 px-4 py-6 md:px-8 md:py-8">

            <div className="w-full">

                {/* ================= HEADER ================= */}

                <div className="mb-8 w-full">

                    <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 md:text-sm">
                        Worker Dashboard
                    </p>

                    <h1 className="mt-2 flex flex-wrap items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">

                        <span>
                            Welcome To Dashboard
                        </span>

                        <span className="font-normal text-blue-400">
                            {attendancePending
                                ? "-----"
                                : username}
                        </span>

                    </h1>

                    <p className="mt-2 text-sm text-slate-600 md:text-base">
                        Manage your attendance and keep track of your work.
                    </p>

                </div>


                {/* ================= TOP SECTION ================= */}

                <div className="mb-6 grid gap-5 md:gap-6 lg:grid-cols-3">


                    {/* ================= TODAY ATTENDANCE ================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:shadow-md md:p-6 lg:col-span-2">

                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                                    Today's Attendance
                                </h2>

                                <p className="mt-1 text-xs text-slate-600 md:text-sm">
                                    Mark your attendance for today
                                </p>

                            </div>

                            <div className="inline-flex w-fit whitespace-nowrap rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 md:rounded-xl md:px-4 md:py-2 md:text-sm">
                                Today
                            </div>

                        </div>

                        <div className="mt-6">
                            <AttendBtn />
                        </div>

                    </div>


                    {/* ================= QUICK STATS ================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:shadow-md md:p-6">

                        <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                            Quick Stats
                        </h2>

                        <div className="mt-5 space-y-4">

                            {/* ================= PRESENT DAYS ================= */}

                            <div className="stat-card rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-4">

                                <p className="text-xs font-medium text-slate-700 md:text-sm">
                                    Present Days
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">

                                    {attendancePending
                                        ? "--"
                                        : presentDays.length}

                                </p>

                            </div>


                            {/* ================= SALARY ================= */}

                            <div className="stat-card rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-green-100/50 p-4">

                                <p className="text-xs font-medium text-slate-700 md:text-sm">
                                    This Month Salary
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">

                                    {salaryPending
                                        ? "--"
                                        : `₹${salaryData?.salary?.salary || 0}`}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ========================================================= */}
                {/* ================= TODAY'S ATTENDANCE ==================== */}
                {/* ========================================================= */}

                <div className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md sm:p-5 md:p-6">

                    {/* ================= SECTION HEADER ================= */}

                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                                Today's Attendance
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Your attendance details for today
                            </p>
                        </div>

                        <div className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
                            Today
                        </div>

                    </div>


                    {/* ================= CONTENT ================= */}

                    {attendancePending ? (

                        <div className="flex min-h-32 items-center justify-center">
                            <p className="text-sm font-medium text-slate-500">
                                Loading attendance...
                            </p>
                        </div>

                    ) : todayPunch?.length > 0 ? (

                        <div className="grid grid-cols-1 gap-4">

                            {todayPunch.map((record) => (

                                <div
                                    key={record._id}
                                    className="stat-card rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition duration-200 hover:bg-white hover:shadow-sm sm:p-5"
                                >

                                    {/* ================= TOP INFO ================= */}

                                    <div className=" flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className=" flex items-center gap-3">

                                            {/* Avatar */}

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">

                                                {record?.userId?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "W"}

                                            </div>


                                            {/* User Info */}

                                            <div className="min-w-0">

                                                <p className="truncate font-semibold text-slate-900">
                                                    {record?.userId?.name || "--"}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    {record?.userId?.mobile || ""}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Status */}

                                        <span
                                            className={`stat-card w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${record.status === "Present"
                                                ? "bg-green-100 text-green-700"
                                                : record.status === "Half Day"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {record.status}
                                        </span>

                                    </div>


                                    {/* ================= DETAILS ================= */}

                                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 sm:grid-cols-4">

                                        {/* Date */}

                                        <div className="rounded-xl bg-white p-3">

                                            <p className="text-xs text-slate-400">
                                                Date
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {new Date(record.date).toLocaleDateString(
                                                    "en-IN"
                                                )}
                                            </p>

                                        </div>


                                        {/* Working Hours */}

                                        <div className="rounded-xl bg-white p-3">

                                            <p className="text-xs text-slate-400">
                                                Working Hours
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-700">
                                                {Math.floor(record.workingHours || 0)}h
                                            </p>

                                        </div>


                                        {/* Sign In */}

                                        <div className="rounded-xl bg-white p-3">

                                            <p className="text-xs text-slate-400">
                                                Sign In
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-700">

                                                {record.signIn
                                                    ? new Date(record.signIn).toLocaleTimeString(
                                                        "en-IN",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }
                                                    )
                                                    : "--"}

                                            </p>

                                        </div>


                                        {/* Sign Out */}

                                        <div className="rounded-xl bg-white p-3">

                                            <p className="text-xs text-slate-400">
                                                Sign Out
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-700">

                                                {record.signOut
                                                    ? new Date(record.signOut).toLocaleTimeString(
                                                        "en-IN",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }
                                                    )
                                                    : "--"}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        /* ================= EMPTY STATE ================= */

                        <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-4 text-center">

                            <p className="font-medium text-slate-500">
                                No attendance records for today
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Workers who punch in will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default UserDashboard;