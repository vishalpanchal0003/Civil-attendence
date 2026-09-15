import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllUsers, updateDailyWage } from "../../../services/auth.api";
import { toast } from "sonner";

const AllWorkers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);
    const [dailyWage, setDailyWage] = useState(0);

    const { data, isLoading } = useQuery({
        queryKey: ["allworker"],
        queryFn: getAllUsers,
    });

    // Update Daily Wage
    const updateWageByAdmin = useMutation({
        mutationFn: ({ id, dailyWage }) =>
            updateDailyWage(id, dailyWage),

        onSuccess: (response) => {
            toast.success(response?.message);
            setIsOpen(false);
            setDailyWage(0);
        },

        onError: (error) => {
            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        },
    });

    // Submit Wage
    const handleUpdateWage = (e) => {
        e.preventDefault();

        if (dailyWage <= 0) {
            toast.error("Please enter valid daily wage!");
            return;
        }

        updateWageByAdmin.mutate({
            id: selectedWorkerId,
            dailyWage: dailyWage,
        });
    };

    // Search Filter
    const filterData = data?.users?.filter(
        (worker) =>
            worker.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            String(worker.mobile).includes(searchTerm)
    );


    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        All Workers
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        Manage all registered workers
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 mb-5">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search worker by name or mobile..."
                    className="w-full md:max-w-md px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-indigo-500"
                />
            </div>

            {/* Loading */}
            {isLoading ? (
                <div className="text-center py-10 text-slate-500">
                    Loading workers...
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-2xl border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">

                                <thead className="bg-slate-50">
                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm text-slate-600">
                                            Worker
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm text-slate-600">
                                            Mobile
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm text-slate-600">
                                            Daily Wage
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm text-slate-600">
                                            Action
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filterData?.length === 0 ? (

                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center py-10 text-slate-500"
                                            >
                                                Worker not found
                                            </td>
                                        </tr>

                                    ) : (

                                        filterData?.map((worker) => (

                                            <tr
                                                key={worker._id}
                                                className="border-t border-slate-100"
                                            >

                                                {/* Worker */}
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    {worker.name}
                                                </td>

                                                {/* Mobile */}
                                                <td className="px-6 py-4 text-slate-500">
                                                    {worker.mobile}
                                                </td>

                                                {/* Wage */}
                                                <td className="px-6 py-4 font-medium">
                                                    ₹{worker.dailyWage}
                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-4">

                                                    <button
                                                        onClick={() => {
                                                            setSelectedWorkerId(
                                                                worker._id
                                                            );

                                                            setDailyWage(
                                                                worker.dailyWage
                                                            );

                                                            setIsOpen(true);
                                                        }}
                                                        className="text-indigo-600 font-medium mr-4"
                                                    >
                                                        Edit
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">

                        {filterData?.length === 0 ? (

                            <div className="text-center py-10 text-slate-500">
                                Worker not found
                            </div>

                        ) : (

                            filterData?.map((worker) => (

                                <div
                                    key={worker._id}
                                    className="bg-white rounded-2xl border border-slate-100 p-5"
                                >

                                    {/* Worker Info */}
                                    <div className="flex items-start justify-between">

                                        <div>

                                            <h2 className="font-bold text-slate-900">
                                                {worker.name}
                                            </h2>

                                            <p className="text-sm text-slate-500 mt-1">
                                                {worker.mobile}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Daily Wage */}
                                    <div className="mt-4">

                                        <p className="text-xs text-slate-500">
                                            Daily Wage
                                        </p>

                                        <p className="text-lg font-bold text-slate-900">
                                            ₹{worker.dailyWage}
                                        </p>

                                    </div>

                                    {/* Action */}
                                    <div className="flex gap-3 mt-4">

                                        <button
                                            onClick={() => {
                                                setSelectedWorkerId(
                                                    worker._id
                                                );

                                                setDailyWage(
                                                    worker.dailyWage
                                                );

                                                setIsOpen(true);
                                            }}
                                            className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium"
                                        >
                                            Edit
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>
                </>
            )}

            {/* Update Wage Modal */}
            {isOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

                            <div>

                                <h2 className="text-lg font-bold text-slate-900">
                                    Update Daily Wage
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Set the worker's daily wage
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    setDailyWage(0);
                                }}
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleUpdateWage}
                            className="p-5"
                        >

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Daily Wage
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    placeholder="Enter daily wage"
                                    name="dailyWage"
                                    value={dailyWage}
                                    onChange={(e) =>
                                        setDailyWage(e.target.value)
                                    }
                                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                />

                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-6">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setDailyWage(0);
                                    }}
                                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        updateWageByAdmin.isPending
                                    }
                                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {updateWageByAdmin.isPending
                                        ? "Updating..."
                                        : "Update Wage"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default AllWorkers;