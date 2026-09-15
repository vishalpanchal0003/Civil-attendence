import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyAttendance } from "../../../services/attendance.api";

const Attendence = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getMyAttendance,
    queryKey: ["my-attendance"],
  });
  console.log("my attendance at attendance jsx",data)
  const attendanceRecords = data?.attendance || [];
  console.log("myaatendance", attendanceRecords)

  if (isLoading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <p className="text-sm text-slate-500">
          Loading attendance...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-4 sm:p-6">
        <p className="text-sm font-medium text-red-600">
          {error?.response?.data?.message ||
            "Failed to load attendance"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          My Attendance
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your complete attendance history
        </p>
      </div>

      {/* Empty */}
      {attendanceRecords.length === 0 ? (
        <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
            📅
          </div>

          <h3 className="text-lg font-semibold text-slate-800">
            No Attendance Found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Your attendance records will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">

                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                      Name
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                      Mobile
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                      Date
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                      Sign In
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                      Sign Out
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                      Status
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                      Work Time
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {attendanceRecords.map((attendance) => {
                    const workingHours =
                      Number(attendance?.workingHours) || 0;

                    return (
                      <tr
                        key={attendance._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-4 text-sm font-semibold text-slate-800 lg:px-6">
                          {attendance?.userId?.name || "--"}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-500 lg:px-6">
                          {attendance?.userId?.mobile || "--"}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-slate-700 lg:px-6">
                          {attendance?.date || "--"}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                          {attendance?.signIn
                            ? new Date(
                              attendance.signIn
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : "--"}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                          {attendance?.signOut
                            ? new Date(
                              attendance.signOut
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : "--"}
                        </td>

                        <td className="px-4 py-4 lg:px-6">
                          <StatusBadge
                            status={attendance?.status || "--"}
                          />
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-slate-700 lg:px-6">
                          {workingHours > 0
                            ? `${workingHours.toFixed()} hrs`
                            : "--"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="space-y-4 md:hidden">

            {attendanceRecords.map((attendance) => {
              const workingHours =
                Number(attendance?.workingHours) || 0;

              return (
                <div
                  key={attendance._id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >

                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {attendance?.userId?.name || "--"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {attendance?.userId?.mobile || "--"}
                      </p>
                    </div>

                    <StatusBadge
                      status={attendance?.status}
                    />

                  </div>

                  {/* Details */}
                  <div className="mt-4 grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs text-slate-400">
                        Date
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {attendance?.date || "--"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Work Time
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {workingHours > 0
                          ? `${workingHours.toFixed(1)} hrs`
                          : "--"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Sign In
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {attendance?.signIn
                          ? new Date(
                            attendance.signIn
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "--"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Sign Out
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {attendance?.signOut
                          ? new Date(
                            attendance.signOut
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "--"}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === "Present"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"
        }`}
    >
      {status || "Unknown"}
    </span>
  );
};

export default Attendence;