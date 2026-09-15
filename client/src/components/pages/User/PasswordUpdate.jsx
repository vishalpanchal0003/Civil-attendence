import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import {
    getUserProfile,
    updateUserPassword,
} from "../../../services/auth.api";

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { data } = useQuery({
        queryKey: ["myprofile"],
        queryFn: getUserProfile,
    });

    const userDetails = data?.profile;

    const passwordMutation = useMutation({
        mutationFn: ({ id, userData }) =>
            updateUserPassword(id, userData),

        onSuccess: (response) => {
            toast.success(
                response?.message ||
                "Password updated successfully"
            );

            setPasswordData({
                password: "",
                newPassword: "",
                confirmPassword: "",
            });
        },

        onError: (error) => {
            console.log("Password update error:", error);

            toast.error(
                error?.response?.data?.message ||
                "Password update failed"
            );
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            password,
            newPassword,
            confirmPassword,
        } = passwordData;

        if (!password || !newPassword || !confirmPassword) {
            return toast.error("All fields are required!");
        }

        if (newPassword.length < 6) {
            return toast.error(
                "New password must be at least 6 characters"
            );
        }

        if (newPassword !== confirmPassword) {
            return toast.error(
                "New password and confirm password do not match"
            );
        }

        passwordMutation.mutate({
            id: userDetails?._id,
            userData: passwordData,
        });
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">

            <div className="mb-6">

                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Change Password
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Update your account password
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5"
            >

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Current Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={passwordData.password}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        className="h-12 w-full rounded-lg border-2 border-slate-200 px-4 outline-none focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        New Password
                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="h-12 w-full rounded-lg border-2 border-slate-200 px-4 outline-none focus:border-indigo-500"
                    />

                    <p className="mt-1 text-xs text-slate-500">
                        Minimum 6 characters
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Confirm New Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className="h-12 w-full rounded-lg border-2 border-slate-200 px-4 outline-none focus:border-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={passwordMutation.isPending}
                    className="h-12 w-full rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {passwordMutation.isPending
                        ? "Updating..."
                        : "Change Password"}
                </button>

            </form>

        </div>
    );
};

export default ChangePassword;