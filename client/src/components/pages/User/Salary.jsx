import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getMySalary } from "../../../services/attendance.api";

const Salary = () => {
    const currentMonth = new Date()
        .toISOString()
        .slice(0, 7);

    const [salaryMonth, setSalaryMonth] =
        useState(currentMonth);

    const {
        data,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["salaryByMonth", salaryMonth],
        queryFn: () => getMySalary(salaryMonth),
    });
    const salary = data?.salary?.salary || 0;
    const presentDays = data?.salary?.attendance || 0;
    const dailyWage = data?.salary?.dailyWage || 0;

    const formattedMonth = new Date(
        `${salaryMonth}-01`
    ).toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="min-h-screen w-full bg-slate-50 px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-8">

            <div className="w-full">

                {/* ================= HEADER ================= */}

                <div className="mb-8">

                    <p className="text-xs font-medium uppercase tracking-wide text-indigo-600 md:text-sm">
                        Salary
                    </p>

                    <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
                                My Salary
                            </h1>

                            <p className="mt-2 text-sm text-slate-600 md:text-base">
                                View your monthly salary and attendance summary.
                            </p>
                        </div>

                        {/* Month Selector */}

                        <div className="w-full sm:w-auto">

                            <label className="mb-2 block text-xs font-semibold text-slate-600">
                                Select Month
                            </label>

                            <input
                                type="month"
                                value={salaryMonth}
                                onChange={(e) =>
                                    setSalaryMonth(e.target.value)
                                }
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:w-[190px]"
                            />

                        </div>

                    </div>

                </div>


                {/* ================= LOADING ================= */}

                {isPending && (
                    <div className="grid gap-5 md:grid-cols-3">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-2xl bg-white shadow-sm"
                            />
                        ))}

                    </div>
                )}


                {/* ================= ERROR ================= */}

                {isError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

                        <p className="font-semibold text-red-600">
                            Unable to load salary
                        </p>

                        <p className="mt-1 text-sm text-red-500">
                            Please try again later.
                        </p>

                    </div>
                )}


                {/* ================= SALARY CONTENT ================= */}

                {!isPending && !isError && (
                    <>
                        {/* Selected Month */}

                        <div className="stat-card mb-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

                            <p className="text-xs font-medium uppercase tracking-wide text-indigo-500">
                                Salary For
                            </p>

                            <p className="mt-1 text-lg font-bold text-indigo-900">
                                {formattedMonth}
                            </p>

                        </div>


                        {/* ================= STATS ================= */}

                        <div className="grid gap-5 md:grid-cols-3">

                            {/* Present Days */}

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Present Days
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {presentDays}
                                        </p>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                                        📋
                                    </div>

                                </div>

                            </div>


                            {/* Daily Wage */}

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Daily Wage
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            ₹{dailyWage}
                                        </p>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                                        💼
                                    </div>

                                </div>

                            </div>


                            {/* Total Salary */}

                            <div className="stat-card rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 shadow-sm transition hover:shadow-md md:p-6">

                                <div className=" flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-green-700">
                                            Total Salary
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            ₹{salary}
                                        </p>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                                        💰
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================= SALARY DETAILS ================= */}

                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">

                            <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                                Salary Details
                            </h2>

                            <div className="mt-5 divide-y divide-slate-100">

                                {/* Month */}

                                <div className="flex items-center justify-between py-4">

                                    <span className="text-sm text-slate-500">
                                        Month
                                    </span>

                                    <span className="text-sm font-semibold text-slate-900">
                                        {formattedMonth}
                                    </span>

                                </div>


                                {/* Present Days */}

                                <div className="flex items-center justify-between py-4">

                                    <span className="text-sm text-slate-500">
                                        Present Days
                                    </span>

                                    <span className="text-sm font-semibold text-slate-900">
                                        {presentDays} days
                                    </span>

                                </div>


                                {/* Daily Wage */}

                                <div className="flex items-center justify-between py-4">

                                    <span className="text-sm text-slate-500">
                                        Daily Wage
                                    </span>

                                    <span className="text-sm font-semibold text-slate-900">
                                        ₹{dailyWage}
                                    </span>

                                </div>


                                {/* Salary */}

                                <div className="flex items-center justify-between py-4">

                                    <span className="text-sm font-semibold text-slate-700">
                                        Total Salary
                                    </span>

                                    <span className="text-xl font-bold text-green-600">
                                        ₹{salary}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </>
                )}

            </div>

        </div>
    );
};

export default Salary;