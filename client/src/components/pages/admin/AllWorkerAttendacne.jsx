import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    getAllAttendance,
    updateSignInSignOutTime,
} from "../../../services/attendance.api";
import { toast } from "sonner";
import { Edit, X } from "lucide-react";

const AllWorkerAttendacne = () => {

    const [isSelected, setIsSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    const { data, isPending } = useQuery({
        queryKey: ["allworkerattendacne"],
        queryFn: getAllAttendance,

        onSuccess: (response) => {
            toast.success(response?.message || "update success");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        },
    });

    const [entrytime, setEntryTime] = useState({
        signIn: data,
        signOut: "",
    });
    // ================= UPDATE ENTRY TIME =================

    const updateEntryTimeMutation = useMutation({
        mutationFn: ({ id, userData }) =>
            updateSignInSignOutTime(id, userData),

        mutationKey: ["updateEntryTime"],

        onSuccess: (response) => {
            toast.success(
                console.log("update entry times at allworkerattendance",response),
                response?.message || "Attendance updated successfully"
            );

            setIsOpen(false);

            setEntryTime({
                signIn: "",
                signOut: "",
            });
        },

        onError: (error) => {
            console.log("error at update entry", error)
            toast.error(
                error?.response?.data?.message ||
                "Failed to update attendance"
            );
        },
    });

    // ================= HANDLE UPDATE =================

    const handleEntryTime = (e) => {
        e.preventDefault();

        if (!entrytime.signIn || !entrytime.signOut) {
            toast.error("All fields are required!");
            return;
        }

        updateEntryTimeMutation.mutate({
            id: isSelected,
            userData: entrytime,
        });
    };

    // ================= FILTER =================

    const [filterDate, setFilterDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filterData = data?.allAttendance?.filter((record) => {

        const statusMatch =
            filterStatus === "all" ||
            record.status?.toLowerCase() ===
            filterStatus.toLowerCase();

        const dateMatch =
            !filterDate ||
            record.date === filterDate;

        return statusMatch && dateMatch;
    });

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 md:py-8 lg:px-8">

            {/* ================= UPDATE MODAL ================= */}

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

                    <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-6">

                        {/* MODAL HEADER */}

                        <div className="flex items-start justify-between mb-6">

                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Update Attendance
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Update sign in and sign out time
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);

                                    setEntryTime({
                                        signIn: "",
                                        signOut: "",
                                    });
                                }}
                                className="w-9 h-9 flex items-center justify-center rounded-full
                                text-slate-500
                                hover:text-red-500
                                hover:bg-red-50
                                transition-all duration-200"
                            >
                                <X size={20} />
                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={handleEntryTime}
                            className="space-y-5"
                        >

                            {/* SIGN IN */}

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Sign In Time
                                </label>

                                <input
                                    type="time"
                                    name="signIn"
                                    value={entrytime.signIn}
                                    onChange={(e) =>
                                        setEntryTime({
                                            ...entrytime,
                                            [e.target.name]:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full h-12 px-4 rounded-xl
                                    border-2 border-slate-200
                                    bg-slate-50
                                    text-slate-800
                                    outline-none
                                    focus:border-indigo-500
                                    focus:ring-4 focus:ring-indigo-500/10
                                    transition-all duration-200"
                                />
                            </div>


                            {/* SIGN OUT */}

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Sign Out Time
                                </label>

                                <input
                                    type="time"
                                    name="signOut"
                                    value={entrytime.signOut}
                                    onChange={(e) =>
                                        setEntryTime({
                                            ...entrytime,
                                            [e.target.name]:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full h-12 px-4 rounded-xl
                                    border-2 border-slate-200
                                    bg-slate-50
                                    text-slate-800
                                    outline-none
                                    focus:border-indigo-500
                                    focus:ring-4 focus:ring-indigo-500/10
                                    transition-all duration-200"
                                />
                            </div>


                            {/* BUTTONS */}

                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);

                                        setEntryTime({
                                            signIn: "",
                                            signOut: "",
                                        });
                                    }}
                                    className="flex-1 h-11 rounded-xl
                                    border border-slate-200
                                    text-slate-600
                                    font-semibold
                                    hover:bg-slate-100
                                    transition-all duration-200"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        updateEntryTimeMutation.isPending
                                    }
                                    className="flex-1 h-11 rounded-xl
                                    bg-indigo-600
                                    text-white
                                    font-semibold
                                    hover:bg-indigo-700
                                    disabled:bg-indigo-300
                                    disabled:cursor-not-allowed
                                    transition-all duration-200"
                                >
                                    {updateEntryTimeMutation.isPending
                                        ? "Updating..."
                                        : "Update"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}


            <div className="mx-auto max-w-7xl">

                {/* ================= HEADER ================= */}

                <div className="mb-8">

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                        All Worker Attendance
                    </h1>

                    <p className="text-sm md:text-base text-slate-600 mt-2">
                        View and manage worker attendance records
                    </p>

                </div>


                {/* ================= FILTERS ================= */}

                <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 mb-6 shadow-sm">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

                        {/* DATE FILTER */}

                        <div>

                            <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
                                Date
                            </label>

                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) =>
                                    setFilterDate(e.target.value)
                                }
                                className="w-full h-11 md:h-12 px-4 rounded-lg md:rounded-xl
                                border-2 border-slate-200
                                bg-slate-50
                                text-sm md:text-base
                                outline-none
                                focus:border-indigo-500
                                focus:ring-4 focus:ring-indigo-500/10
                                transition"
                            />

                        </div>


                        {/* STATUS FILTER */}

                        <div>

                            <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
                                Status
                            </label>

                            <select
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                                className="w-full h-11 md:h-12 px-4 rounded-lg md:rounded-xl
                                border-2 border-slate-200
                                bg-slate-50
                                text-sm md:text-base
                                outline-none
                                focus:border-indigo-500
                                focus:ring-4 focus:ring-indigo-500/10
                                transition cursor-pointer"
                            >

                                <option value="all">
                                    All Status
                                </option>

                                <option value="present">
                                    Present
                                </option>

                                <option value="absent">
                                    Absent
                                </option>

                                <option value="half day">
                                    Half Day
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* ================= LOADING ================= */}

                {isPending && (

                    <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center min-h-96">

                        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4">
                        </div>

                        <p className="text-slate-600 font-medium">
                            Loading attendance data...
                        </p>

                    </div>

                )}


                {/* ================= DESKTOP TABLE ================= */}

                {!isPending && data?.allAttendance && (

                    <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                {/* TABLE HEAD */}

                                <thead className="bg-slate-50 border-b border-slate-200">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-xs md:text-sm font-semibold text-slate-700">
                                            Worker
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs md:text-sm font-semibold text-slate-700">
                                            Date
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs md:text-sm font-semibold text-slate-700">
                                            Sign In
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs md:text-sm font-semibold text-slate-700">
                                            Sign Out
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs md:text-sm font-semibold text-slate-700">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs md:text-sm font-semibold text-slate-700">
                                            Work Hours
                                        </th>

                                        <th className="text-left px-6 py-4 text-xs md:text-sm font-semibold text-slate-700">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                {/* TABLE BODY */}

                                <tbody>

                                    {filterData?.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-10 text-slate-500"
                                            >
                                                Attendance record not found
                                            </td>

                                        </tr>

                                    ) : (

                                        filterData?.map((record) => (

                                            <tr
                                                key={record._id}
                                                className="border-t border-slate-100 hover:bg-slate-50 transition"
                                            >

                                                {/* WORKER */}

                                                <td className="px-6 py-4 text-sm md:text-base font-semibold text-slate-900">
                                                    {record?.userId?.name || "--"}
                                                </td>


                                                {/* DATE */}

                                                <td className="px-6 py-4 text-sm md:text-base text-slate-600">

                                                    {record.date
                                                        ? new Date(
                                                            record.date
                                                        ).toLocaleDateString(
                                                            "en-IN"
                                                        )
                                                        : "--"}

                                                </td>


                                                {/* SIGN IN */}

                                                <td className="px-6 py-4 text-sm md:text-base text-slate-600">

                                                    {record.signIn
                                                        ? new Date(
                                                            record.signIn
                                                        ).toLocaleTimeString(
                                                            "en-IN",
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            }
                                                        )
                                                        : "--"}

                                                </td>


                                                {/* SIGN OUT */}

                                                <td className="px-6 py-4 text-sm md:text-base text-slate-600">

                                                    {record.signOut
                                                        ? new Date(
                                                            record.signOut
                                                        ).toLocaleTimeString(
                                                            "en-IN",
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            }
                                                        )
                                                        : "--"}

                                                </td>


                                                {/* STATUS */}

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${record.status ===
                                                            "Present"
                                                            ? "bg-green-100 text-green-700"
                                                            : record.status ===
                                                                "Half Day"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {record.status || "--"}
                                                    </span>

                                                </td>


                                                {/* WORK HOURS */}

                                                <td className="px-6 py-4 text-sm md:text-base text-slate-600 font-medium">

                                                    {Math.floor(
                                                        record.workingHours || 0
                                                    )}
                                                    h

                                                </td>


                                                {/* EDIT */}

                                                <td className="px-6 py-4">

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsSelected(record._id);

                                                            setEntryTime({
                                                                signIn: record.signIn
                                                                    ? new Date(record.signIn).toTimeString().slice(0, 5)
                                                                    : "",
                                                                signOut: record.signOut
                                                                    ? new Date(record.signOut).toTimeString().slice(0, 5)
                                                                    : "",
                                                            });

                                                            setIsOpen(true);
                                                        }}
                                                        className="w-9 h-9 flex items-center justify-center
                                                        rounded-lg
                                                        text-slate-500
                                                        hover:text-indigo-600
                                                        hover:bg-indigo-50
                                                        transition-all duration-200"
                                                    >
                                                        <Edit size={18} />
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}


                {/* ================= MOBILE CARDS ================= */}

                {!isPending && data?.allAttendance && (

                    <div className="md:hidden space-y-4">

                        {filterData?.length === 0 ? (

                            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                                Attendance record not found
                            </div>

                        ) : (

                            filterData?.map((record) => (

                                <div
                                    key={record._id}
                                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition"
                                >

                                    {/* HEADER */}

                                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-100">

                                        <div>

                                            <p className="text-lg font-bold text-slate-900">
                                                {record?.userId?.name || "--"}
                                            </p>

                                            <p className="text-xs text-slate-500 mt-0.5">

                                                {record.date
                                                    ? new Date(
                                                        record.date
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )
                                                    : "--"}

                                            </p>

                                        </div>


                                        {/* STATUS */}

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${record.status === "Present"
                                                ? "bg-green-100 text-green-700"
                                                : record.status === "Half Day"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {record.status || "--"}
                                        </span>

                                    </div>


                                    {/* DETAILS */}

                                    <div className="grid grid-cols-2 gap-4 mb-4">

                                        {/* SIGN IN */}

                                        <div>

                                            <p className="text-xs font-semibold text-slate-600 mb-1">
                                                Sign In
                                            </p>

                                            <p className="text-sm font-medium text-slate-900">

                                                {record.signIn
                                                    ? new Date(
                                                        record.signIn
                                                    ).toLocaleTimeString(
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


                                        {/* SIGN OUT */}

                                        <div>

                                            <p className="text-xs font-semibold text-slate-600 mb-1">
                                                Sign Out
                                            </p>

                                            <p className="text-sm font-medium text-slate-900">

                                                {record.signOut
                                                    ? new Date(
                                                        record.signOut
                                                    ).toLocaleTimeString(
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


                                    {/* WORK HOURS */}

                                    <div className="bg-slate-50 rounded-lg p-3">

                                        <p className="text-xs font-semibold text-slate-600 mb-1">
                                            Work Hours
                                        </p>

                                        <p className="text-lg font-bold text-indigo-600">

                                            {Math.floor(
                                                record.workingHours || 0
                                            )}{" "}
                                            Hours

                                        </p>

                                    </div>


                                    {/* EDIT BUTTON */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEntryTime({
                                                signIn: record.signIn
                                                    ? new Date(record.signIn).toTimeString().slice(0, 5)
                                                    : "",
                                                signOut: record.signOut
                                                    ? new Date(record.signOut).toTimeString().slice(0, 5)
                                                    : "",
                                            });
                                            setIsSelected(record._id);
                                            setIsOpen(true);
                                        }}
                                        className="w-full mt-4 h-10 rounded-xl
                                        flex items-center justify-center gap-2
                                        bg-indigo-50 text-indigo-600
                                        font-semibold text-sm
                                        hover:bg-indigo-100
                                        transition-all duration-200"
                                    >
                                        <Edit size={17} />
                                        Edit Attendance
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                )}


                {/* ================= NO DATA ================= */}

                {!isPending &&
                    (!data?.allAttendance ||
                        data.allAttendance.length === 0) && (

                        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 flex flex-col items-center justify-center">

                            <div className="text-4xl mb-4">
                                📭
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                                No Attendance Records
                            </h3>

                            <p className="text-sm md:text-base text-slate-600 text-center">
                                No attendance records found.
                            </p>

                        </div>

                    )}

            </div>

        </div>
    );
};

export default AllWorkerAttendacne;