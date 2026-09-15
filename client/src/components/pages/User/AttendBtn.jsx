import React from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn, signOff } from "../../../services/attendance.api";
import { toast } from "sonner";

const AttendBtn = () => {

    const signInMutation = useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            toast.success(data?.message || "Sign in successful");
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Sign in failed"
            );
        }
    });

    const signOffMutation = useMutation({
        mutationFn: signOff,
        onSuccess: (data) => {
            toast.success(data?.message || "Sign out successful");
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Sign out failed"
            );
        }
    });

    const handleSignIn = () => {
        signInMutation.mutate();
    };

    const handleSignOff = () => {
        signOffMutation.mutate();
    };

    return (
        <div className="w-full flex gap-4 ">

            <button
                onClick={handleSignIn}
                disabled={signInMutation.isPending || signOffMutation.isPending}
                className="flex-1 h-12 px-6 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold transition"
            >
                {signInMutation.isPending ? "Signing In..." : "Sign In"}
            </button>

            <button
                onClick={handleSignOff}
                disabled={signInMutation.isPending || signOffMutation.isPending}
                className="flex-1 h-12 px-6 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold transition"
            >
                {signOffMutation.isPending ? "Signing Off..." : "Sign Off"}
            </button>

        </div>
    );
};

export default AttendBtn;