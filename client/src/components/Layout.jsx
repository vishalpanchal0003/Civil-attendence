import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "./common/Loader";

const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const UserLayout = lazy(() => import("./pages/User/userLayout"));
const UserDashboard = lazy(() => import("./pages/User/UserDashboard"));
const Attendance = lazy(() => import("./pages/User/Attendence"));
const UserProfile = lazy(() => import("./pages/User/UserProfile"));
const ForgetPassword = lazy(() => import("./pages/User/ForgetPassword"));
const ProtectedRoute = lazy(() => import("./pages/User/ProtectedRoute"));
const Salary = lazy(() => import("./pages/User/Salary"));

const AdminRegister = lazy(() => import("./pages/admin/Register"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AllWorkers = lazy(() => import("./pages/admin/AllWorkers"));
const AllWorkerAttendacne = lazy(() =>
    import("./pages/admin/AllWorkerAttendacne")
);
const AllWorkerSalary = lazy(() =>
    import("./pages/admin/AllWorkerSalary")
);
const AdminProfile = lazy(() =>
    import("./pages/admin/AdminProfile")
);

const HomeRedirect = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const role = localStorage.getItem("userRole");

    if (role === "admin") {
        return <Navigate to="/adminDashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
};
const Layout = () => {

    return (
        <Routes>
            {/* ================= AUTH ROUTES ================= */}

            <Route path="/" element={<HomeRedirect />} />

            <Route
                path="/register"
                element={
                    <Suspense fallback={<Loading />}>
                        <Register />
                    </Suspense>
                }
            />

            <Route
                path="/register/admin"
                element={
                    <Suspense fallback={<Loading />}>
                        <AdminRegister />
                    </Suspense>
                }
            />

            <Route
                path="/forgetpassword"
                element={
                    <Suspense fallback={<Loading />}>
                        <ForgetPassword />
                    </Suspense>
                }
            />

            <Route
                path="/login"
                element={
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                }
            />


            {/* ================= PROTECTED ROUTES ================= */}

            <Route
                element={
                    <Suspense fallback={<Loading />}>
                        <ProtectedRoute />
                    </Suspense>
                }
            >


                {/* ================= USER ================= */}

                <Route
                    element={
                        <Suspense fallback={<Loading />}>
                            <UserLayout />
                        </Suspense>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={
                            <Suspense fallback={<Loading />}>
                                <UserDashboard />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/myattendance"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Attendance />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/salary"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Salary />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <Suspense fallback={<Loading />}>
                                <UserProfile />
                            </Suspense>
                        }
                    />

                </Route>


                {/* ================= ADMIN ================= */}

                <Route
                    element={
                        <Suspense fallback={<Loading />}>
                            <AdminLayout />
                        </Suspense>
                    }
                >

                    <Route
                        path="/adminDashboard"
                        element={
                            <Suspense fallback={<Loading />}>
                                <AdminDashboard />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/admin/workers"
                        element={
                            <Suspense fallback={<Loading />}>
                                <AllWorkers />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/admin/attendance"
                        element={
                            <Suspense fallback={<Loading />}>
                                <AllWorkerAttendacne />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/admin/salary"
                        element={
                            <Suspense fallback={<Loading />}>
                                <AllWorkerSalary />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/admin/profile"
                        element={
                            <Suspense fallback={<Loading />}>
                                <AdminProfile />
                            </Suspense>
                        }
                    />

                </Route>

            </Route>

        </Routes>
    );
};

export default Layout;