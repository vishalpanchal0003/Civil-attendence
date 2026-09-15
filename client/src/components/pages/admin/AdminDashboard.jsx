import { useQuery } from "@tanstack/react-query";
import React from "react";
import { adminStats, getAllAttendance, getAllSalary } from "../../../services/attendance.api";

const AdminDashboard = () => {

    const { data: stats, isPending } = useQuery({
        queryKey: ["allworker"],
        queryFn: adminStats,
    })
    const currentMonth = new Date()
        .toISOString()
        .slice(0, 7);




    const {
        data: salaryData,
        isPending: salaryPending,
        isError: salaryError,
    } = useQuery({
        queryKey: ["my-salary", currentMonth],
        queryFn: () => getAllSalary(currentMonth),
    });

    const { data: todayAttendance, isPending: attendacneLoading } = useQuery({
        queryKey: ["allworkerattendacne"],
        queryFn: getAllAttendance
    })
    const todayDate = new Date().toISOString().slice(0, 10)
    const todayPunch = todayAttendance?.allAttendance?.filter((record) => record?.date === todayDate )

    return (
        <div className="min-h-screen bg-slate-50 p-4   md:p-6 lg:p-8">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Admin Dashboard
                </h1>

                <p className="mt-1 text-sm md:text-base text-slate-500">
                    Manage workers, attendance and salary
                </p>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Total Workers */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500">
                        Total Workers
                    </p>

                    <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
                        {isPending ? "--" : stats?.stat?.allWorker}
                    </h2>
                </div>


                {/* Present Today */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500">
                        Present Today
                    </p>

                    <h2 className="mt-2 text-2xl md:text-3xl font-bold text-green-600">
                        {isPending ? "--" : stats?.stat?.todayPresentUser}
                    </h2>
                </div>


                {/* Absent Today */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500">
                        Absent Today
                    </p>

                    <h2 className="mt-2 text-2xl md:text-3xl font-bold text-red-500">
                        {isPending ? "--" : stats?.stat?.absentToday}
                    </h2>
                </div>


                {/* Monthly Salary */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500">
                        This Month Salary
                    </p>

                    <h2 className="mt-2 text-2xl md:text-3xl font-bold text-indigo-600">
                        {isPending ? "--" : salaryData?.salary?.totalSalaryOfAllWorker || 0}
                    </h2>
                </div>

            </div>


            {/* Recent Attendance */}
            {/* Recent Attendance */}
            <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-5 py-5 md:px-6 border-b border-slate-200">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-slate-900">
                                Today's Attendance
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Workers who have punched in today
                            </p>
                        </div>

                        <span className="shrink-0 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                            {todayPunch?.length || 0} Records
                        </span>
                    </div>
                </div>


                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden md:block overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                                    Worker
                                </th>

                                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                                    Date
                                </th>

                                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                                    Sign In
                                </th>

                                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                                    Sign Out
                                </th>

                                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                                    Status
                                </th>

                                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                                    Hours
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {todayPunch?.length > 0 ? (
                                todayPunch.map((record) => (
                                    <tr
                                        key={record._id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                                    >

                                        {/* Worker */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                                    {record?.userId?.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase() || "W"}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {record?.userId?.name || "--"}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {record?.userId?.mobile || ""}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(record.date).toLocaleDateString("en-IN")}
                                        </td>

                                        {/* Sign In */}
                                        <td className="px-6 py-4 text-slate-600">
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
                                        </td>

                                        {/* Sign Out */}
                                        <td className="px-6 py-4 text-slate-600">
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
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">

                                            <span
                                                className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${record.status === "Present"
                                                        ? "bg-green-100 text-green-700"
                                                        : record.status === "Half Day"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {record.status}
                                            </span>

                                        </td>

                                        {/* Hours */}
                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            {Math.floor(record.workingHours || 0)}h
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-slate-500"
                                    >
                                        No attendance records for today
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>


                {/* ================= MOBILE CARDS ================= */}
                <div className="md:hidden p-4 space-y-3">

                    {attendacneLoading ? (
                        <div className="py-10 text-center text-slate-500">
                            Loading attendance...
                        </div>
                    ) : todayPunch?.length > 0 ? (

                        todayPunch.map((record) => (
                            <div
                                key={record._id}
                                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50"
                            >

                                {/* Top */}
                                <div className="flex items-center justify-between gap-3">

                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                            {record?.userId?.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || "W"}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {record?.userId?.name || "--"}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                {record?.userId?.mobile || ""}
                                            </p>
                                        </div>

                                    </div>


                                    <span
                                        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${record.status === "Present"
                                                ? "bg-green-100 text-green-700"
                                                : record.status === "Half Day"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {record.status}
                                    </span>

                                </div>


                                {/* Details */}
                                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Date
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-0.5">
                                            {new Date(record.date).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Working Hours
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-0.5">
                                            {Math.floor(record.workingHours || 0)}h
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Sign In
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-0.5">
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


                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Sign Out
                                        </p>

                                        <p className="text-sm font-medium text-slate-700 mt-0.5">
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
                        ))

                    ) : (

                        <div className="py-10 text-center">

                            <p className="text-slate-500 font-medium">
                                No attendance records for today
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                Workers who punch in will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;