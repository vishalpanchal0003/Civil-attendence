import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeClosed } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/auth.api";
const Login = () => {
    const [isShow, setIsShow] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        identifyer: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const loginMutation = useMutation({
        mutationFn: (userData) => loginUser(userData),
        onSuccess: (response) => {
            console.log("login message", response)
            localStorage.setItem("accessToken", response.accessToken);

            if (response?.user?.userRole === "admin") {
                navigate("/adminDashboard", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }

            toast.success(response.message);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Login failed");
        }
    })

    const handleLogin = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.identifyer.trim()) {
            newErrors.identifyer = "Email or mobile is required";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        loginMutation.mutate(formData)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">

            <div className="w-full max-w-sm lg:max-w-lg">

                {/* Header */}
                <div className="text-center mb-8 lg:mb-10">

                    {/* Logo */}
                    <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl lg:text-3xl font-bold shadow-xl shadow-blue-500/30">
                        WA
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
                        Welcome Back
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-500 text-sm lg:text-base">
                        Login to your worker account
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl lg:rounded-3xl  p-6 lg:p-8">

                    <form onSubmit={handleLogin} className="space-y-5 lg:space-y-6">

                        {/* Email/Mobile */}
                        <div>
                            <label
                                htmlFor="identifyer"
                                className="block text-sm lg:text-base font-semibold text-slate-700 mb-2"
                            >
                                Email or Mobile
                            </label>
                            <input
                                type="text"
                                id="identifyer"
                                name="identifyer"
                                placeholder="Enter your email or mobile"
                                value={formData.identifyer}
                                onChange={handleChange}
                                className={`w-full h-12 lg:h-13 px-4 lg:px-5 rounded-lg lg:rounded-xl border-2 transition-all duration-200 text-base lg:text-lg outline-none ${errors.identifyer
                                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    }`}
                            />
                            {errors.identifyer && (
                                <p className="text-xs text-red-500 mt-1">{errors.identifyer}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm lg:text-base font-semibold text-slate-700"
                                >
                                    Password
                                </label>
                                {/* <Link
                                    to={'/forgetpassword'}
                                    className="text-xs lg:text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                                >
                                    Forgot password?
                                </Link> */}
                            </div>
                            <input
                                type={isShow ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full h-12 lg:h-13 px-4 lg:px-5 rounded-lg lg:rounded-xl border-2 transition-all duration-200 text-base lg:text-lg outline-none ${errors.password
                                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    }`}
                            />
                            <span className="absolute mt-3 ml-[-40px]" onClick={() => setIsShow((prev) => !prev)}>{isShow ? <Eye /> : <EyeClosed />}</span>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full h-12 lg:h-13 mt-7 lg:mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-300 disabled:to-blue-300 text-white font-semibold text-base lg:text-lg rounded-lg lg:rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 active:scale-95 disabled:cursor-not-allowed"
                        >
                            {loginMutation.isPending ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Logging in...
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-7 lg:my-8">
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <span className="text-xs text-slate-400 font-medium">OR</span>
                        <div className="h-px flex-1 bg-slate-200"></div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-sm lg:text-base text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            Create account
                        </Link>
                    </p>

                </div>

                {/* Footer */}
                <p className="text-center text-xs lg:text-sm text-slate-500 mt-6 lg:mt-8">
                    Worker Attendance & Salary Management System
                </p>

            </div>

        </div>
    );
};

export default Login;