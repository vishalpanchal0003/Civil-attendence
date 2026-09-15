import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    getUserProfile,
    updateUserDetails,
} from "../../../services/auth.api";

const ProfileInformation = () => {
    const [isEditing, setIsEditing] = useState(false);

    const { data, isPending } = useQuery({
        queryKey: ["myprofile"],
        queryFn: getUserProfile,
    });


    const userDetails = data?.profile;


    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        mobile: "",
        dailyWage: "",
    });

useEffect(() => {
    if (data?.profile) {
        setProfileData({
            name: data.profile.name || "",
            email: data.profile.email || "",
            mobile: data.profile.mobile || "",
            dailyWage:
                userDetails?.userRole !== "admin"
                    ? data.profile.dailyWage || ""
                    : "",
        });
    }
}, [data?.profile, userDetails?.userRole]);

    const updateProfileMutation = useMutation({
        mutationFn: ({ id, userData }) =>
            updateUserDetails(id, userData),

        onSuccess: (response) => {
            toast.success(
                response?.message || "Profile updated successfully"
            );

            setIsEditing(false);
        },

        onError: (error) => {
            console.log("Profile update error:", error);

            toast.error(
                error?.response?.data?.message ||
                "Profile update failed"
            );
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!profileData.name ||
            !profileData.email ||
            !profileData.mobile ||
            (userDetails?.userRole !== "admin" && profileData.dailyWage <= 0)
        ) {
            return toast.error("All fields are required!");
        }


        updateProfileMutation.mutate({
            id: userDetails?._id,
            userData: profileData,
        });
    };

    if (isPending) {
        return (
            <div className="animate-pulse rounded-2xl bg-white p-6 shadow-sm">
                <div className="h-6 w-40 rounded bg-slate-200" />
                <div className="mt-6 h-12 rounded bg-slate-200" />
                <div className="mt-4 h-12 rounded bg-slate-200" />
                <div className="mt-4 h-12 rounded bg-slate-200" />
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">

            {/* Header */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Profile Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Update your personal information
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsEditing((prev) => !prev)}
                    className={`w-full rounded-lg px-5 py-2.5 text-sm font-semibold sm:w-auto ${isEditing
                        ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>

            </div>

            {/* Avatar */}

            <div className="mb-6 flex items-center gap-4 border-b border-slate-200 pb-6">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                    {userDetails?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-slate-900">
                        {userDetails?.name || "--"}
                    </h3>

                    <p className="truncate text-sm text-slate-500">
                        {userDetails?.email || "--"}
                    </p>
                </div>

            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-12 w-full rounded-lg border-2 border-slate-200 px-4 outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="h-12 w-full rounded-lg border-2 border-slate-200 px-4 outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        name="mobile"
                        value={profileData.mobile}
                        onChange={handleChange}
                        maxLength={10}
                        disabled={!isEditing}
                        className="h-12 w-full rounded-lg border-2 border-slate-200 px-4 outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />
                </div>

                {userDetails?.userRole !== "admin" && <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Daily Wage
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            ₹
                        </span>

                        <input
                            type="number"
                            name="dailyWage"
                            value={profileData.dailyWage}
                            onChange={handleChange}
                            disabled={!isEditing}
                            min="0"
                            className="h-12 w-full rounded-lg border-2 border-slate-200 pl-8 pr-4 outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-50"
                        />
                    </div>
                </div>}

                {isEditing && (
                    <button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        className="h-12 w-full rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {updateProfileMutation.isPending
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                )}

            </form>

        </div>
    );
};

export default ProfileInformation;

