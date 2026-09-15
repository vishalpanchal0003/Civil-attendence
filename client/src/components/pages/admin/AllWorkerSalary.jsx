import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllSalary } from "../../../services/attendance.api";

const AllWorkerSalary = () => {
    const currentMonth = new Date()
        .toISOString()
        .slice(0, 7);
    const [salaryMonth, setSalaryMonth] = useState(currentMonth);
    const { data, isPending } = useQuery({
        queryKey: ['allworkersalary', salaryMonth],
        queryFn: () => getAllSalary(salaryMonth),
    })
    console.log("all worker salary", data?.salary?.totalSalaryOfAllWorker)


    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Worker Salary
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        View monthly salary of all workers
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                        Select Month
                    </label>

                    <input
                        type="month"
                        value={salaryMonth}
                        onChange={(e) => setSalaryMonth(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-indigo-500"
                    />
                </div>

            </div>


            {/* Total Salary */}
            <div className="bg-indigo-600 text-white rounded-2xl p-5 mb-6">

                <p className="text-sm text-indigo-100">
                    Total Salary
                </p>

                <h2 className="text-3xl font-bold mt-1">
                    {isPending ? "--" : data?.salary?.totalSalaryOfAllWorker || 0}
                </h2>

                <p className="text-sm text-indigo-100 mt-1">
                    {currentMonth}
                </p>

            </div>


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
                                    Daily Wage
                                </th>

                                <th className="text-left px-6 py-4 text-sm text-slate-600">
                                    Present Days
                                </th>

                                <th className="text-left px-6 py-4 text-sm text-slate-600">
                                    Salary
                                </th>
                            </tr>
                        </thead>
                        {
                            salaryMonth ? (
                                <tbody>
                                    {data?.salary?.allUsersSalary.map((worker, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-t border-slate-100"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {worker.name || "--"}
                                            </td>

                                            <td className="px-6 py-4">
                                                ₹{worker.dailyWage || 0}
                                            </td>

                                            <td className="px-6 py-4">
                                                {worker.attendance || 0}
                                            </td>

                                            <td className="px-6 py-4 font-bold text-indigo-600">
                                                ₹{worker.salary || 0}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            ) : (
                                <h1>
                                    records not found
                                </h1>
                            )
                        }


                    </table>

                </div>

            </div>


            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">

                {data?.salary?.allUsersSalary
                    .map((worker, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl border border-slate-100 p-5"
                        >

                            <h2 className="font-bold text-slate-900">
                                {worker.name}
                            </h2>

                            <div className="grid grid-cols-2 gap-4 mt-4">

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Daily Wage
                                    </p>

                                    <p className="font-semibold">
                                        ₹{worker.dailyWage}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Present Days
                                    </p>

                                    <p className="font-semibold">
                                        {worker.attendance}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-xs text-slate-500">
                                    Total Salary
                                </p>

                                <p className="text-xl font-bold text-indigo-600">
                                    ₹{worker.salary}
                                </p>
                            </div>

                        </div>
                    ))}

            </div>

        </div>
    );
};

export default AllWorkerSalary;