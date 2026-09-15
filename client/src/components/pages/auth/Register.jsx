import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import { registerUser } from "../../../services/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dailyWage: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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

  const registerMutation = useMutation({
    mutationFn: (userData) => registerUser(userData),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/dashboard", { replace: true });
      toast.success(data?.message || "Account created successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
    if (!formData.dailyWage) newErrors.dailyWage = "Daily wage is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <div className="w-full min-h-screen  flex items-center justify-center p-4">

      <div className="w-full max-w-sm lg:max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">

          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl lg:text-3xl font-bold mb-4 shadow-lg shadow-blue-500/30">
            WA
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-1">
            Create Account
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm lg:text-base">
            Join us and start earning today
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl lg:rounded-3xl  bg-white p-6 lg:p-10">

          <form onSubmit={handleRegister} className="space-y-5 lg:space-y-6">

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm lg:text-base font-semibold text-slate-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full h-12 lg:h-13 px-4 lg:px-5 rounded-lg lg:rounded-xl border-2 transition-all duration-200 text-base lg:text-lg outline-none ${errors.name
                  ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email + Mobile - STACK ON MOBILE */}
            <div className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm lg:text-base font-semibold text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-12 lg:h-13 px-4 lg:px-5 rounded-lg lg:rounded-xl border-2 transition-all duration-200 text-base lg:text-lg outline-none ${errors.email
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm lg:text-base font-semibold text-slate-700 mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="10 digit number"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full h-12 lg:h-13 px-4 lg:px-5 rounded-lg lg:rounded-xl border-2 transition-all duration-200 text-base lg:text-lg outline-none ${errors.mobile
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                />
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                )}
              </div>

            </div>

            {/* Daily Wage */}
            <div>
              <label
                htmlFor="dailyWage"
                className="block text-sm lg:text-base font-semibold text-slate-700 mb-2"
              >
                Daily Wage
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base lg:text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  id="dailyWage"
                  name="dailyWage"
                  placeholder="500"
                  min="0"
                  value={formData.dailyWage}
                  onChange={handleChange}
                  className={`w-full h-12 lg:h-13 pl-8 lg:pl-10 pr-4 lg:pr-5 rounded-lg lg:rounded-xl border-2 transition-all duration-200 text-base lg:text-lg outline-none ${errors.dailyWage
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                />
              </div>
              {errors.dailyWage && (
                <p className="text-xs text-red-500 mt-1">{errors.dailyWage}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm lg:text-base font-semibold text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type={isShow ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a strong password"
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
              disabled={registerMutation.isPending}
              className="w-full h-12 lg:h-13 mt-8 rounded-lg lg:rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-300 disabled:to-blue-300 text-white font-semibold text-base lg:text-lg transition-all duration-200 active:scale-95 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-700/40"
            >
              {registerMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 lg:pt-8 border-t border-slate-200 text-center">
            <p className="text-sm lg:text-base text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Login here
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;