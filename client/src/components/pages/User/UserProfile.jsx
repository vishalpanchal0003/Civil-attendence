import React, { useState } from "react";
import ProfileInformation from "./ProfileUpdate";
import ChangePassword from "./PasswordUpdate";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 px-3 py-5 pb-24 sm:px-4 md:px-8 md:py-8 md:pb-8">

      <div className="mx-auto w-full max-w-2xl">

        {/* Header */}
        <div className="mb-6 md:mb-8">

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            Profile Settings
          </h1>

          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Manage your account information and security
          </p>

        </div>

        {/* Tabs */}
        <div className="mb-6 flex w-full overflow-x-auto border-b border-slate-200">

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold sm:text-base ${activeTab === "profile"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
          >
            Profile Information
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("password")}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold sm:text-base ${activeTab === "password"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
          >
            Change Password
          </button>

        </div>

        {/* Content */}

        {activeTab === "profile" && (
          <ProfileInformation />
        )}

        {activeTab === "password" && (
          <ChangePassword />
        )}

      </div>

    </div>
  );
};

export default Profile;