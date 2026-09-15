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
        isError: attendanceError,
    } = useQuery({
        queryKey: ["myattendance"],
        queryFn: getMyAttendance,
    });

    const username =
        attendanceData?.attendance?.[0]?.userId?.name || "";

    const presentDays = attendanceData?.attendance?.filter(
        (a) => a.status === "Present")

    // ================= SALARY =================

    const currentMonth = new Date()
        .toISOString()
        .slice(0, 7);

    const {
        data: salaryData,
        isPending: salaryPending,
        isError: salaryError,
    } = useQuery({
        queryKey: ["my-salary", currentMonth],
        queryFn: () => getMySalary(currentMonth),
    });

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

            </div>

        </div>
    );
};

export default UserDashboard;