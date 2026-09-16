import UserModel from "../models/UserModel.js";
import Attendance from "../models/AttendanceModel.js";

const signIn = async (req, res) => {
    try {
        const userId = req.user._id;
        const now = new Date

        const date = now.toISOString().split("T")[0];
        const time = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })

        const existingAttendance = await Attendance.findOne({
            userId: userId,
            date: date,
        });
        if (existingAttendance) {
            return res.status(400).json({
                message: "Attendance already marked for today",
            });
        }
        const attendance = await Attendance.create({
            userId: userId,
            date: date,
            time: time,
            signIn: now,
        });

        return res.status(201).json({
            message: "Sign in successful",
            attendance,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

const signOut = async (req, res) => {
    try {
        const userId = req.user._id;
        const now = new Date();

        const date = now.toISOString().split("T")[0];
        const attendance = await Attendance.findOne({
            userId: userId,
            date: date,
        });
        if (!attendance) {
            return res.status(400).json({
                message: "Attendance record not found ",
            });
        }

        if (!attendance.signIn) {
            return res.status(400).json({
                message: "please signIn first ! ",
            });
        }

        if (attendance.signOut) {
            return res.status(400).json({
                message: "you already punched ! ",
            });
        }
        if (attendance)
            attendance.signOut = now;
        attendance.workingHours = (attendance.signOut - attendance.signIn) / (1000 * 60 * 60)
        attendance.status =
            attendance.status =
            attendance.workingHours >= 8
                ? "Present"
                : attendance.workingHours > 2 && attendance.workingHours <= 5
                    ? "Half Day"
                    : "Absent";

        await attendance.save();
        return res.status(200).json({
            message: "Sign out successful",
            attendance,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

const getMyAttendance = async (req, res) => {
    try {
        const userId = req.user._id;
        const attendanceRecords = await Attendance.find({ userId: userId, })
            .populate("userId", "name mobile")
            .sort({ date: -1 });
        // const Present = attendanceRecords.workingHours >= 8 * 60 * 60;
        // const absent = attendanceRecords.workingHours <= 4 * 60 * 60;
        res.status(200).json({ message: "Attendance records retrieved successfully", attendance: attendanceRecords });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAllAttendance = async (req, res) => {
    try {
        const allAttendance = await Attendance.find().populate("userId", "name mobile");
        if (allAttendance.length === 0) {
            return res.status(200).json({ message: "something happend while fetching attendance" })
        }
        return res.status(200).json({ message: "all attendance get successfully", allAttendance })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

const calculateSalaryOne = async (req, res) => {
    try {
        const userId = req.user._id;
        const { month } = req.query;
        if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
            return res.status(400).json({
                message: "Month is required"
            });
        }
        const user = await UserModel
            .findById(userId)
            .select("name mobile dailyWage");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const startDate = `${month}-01`;
        const [year, monthNumber] = month.split("-").map(Number);
        const endDate = `${month}-${String(new Date(Date.UTC(year, monthNumber, 0)).getUTCDate()).padStart(2, "0")}`;

        const attendance = await Attendance.find({
            userId: userId,
            date: {
                $gte: startDate,
                $lte: endDate
            },
            status: { $in: ["Present", "Half Day", "Absent"] }
        });

        const presentDays = attendance.filter(
            (record) =>
                record.status === "Present" &&
                record.workingHours >= 8
        ).length;

        const halfDays = attendance.filter(
            (record) =>
                record.status === "Half Day" &&
                record.workingHours <= 5 &&
                record.workingHours >= 1
        ).length;
        const dailyWage = user.dailyWage
        const salary = (presentDays + halfDays / 2) * user.dailyWage;

        return res.status(200).json({
            message: "Monthly salary fetched successfully",
            salary: {
                name: user.name,
                mobile: user.mobile,
                attendance: presentDays,
                halfDays,
                dailyWage,
                salary
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const calculateSalaryAll = async (req, res) => {
    try {
        const allUsersSalary = [];
        const { month } = req.query;

        if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
            return res.status(400).json({
                message: "Month is required"
            });
        }
        const allUsers = await UserModel
            .find({ userRole: "user" })
            .select("name mobile dailyWage");
        const startDate = `${month}-01`;
        const [year, monthNumber] = month.split("-").map(Number);
        const endDate = `${month}-${String(new Date(Date.UTC(year, monthNumber, 0)).getUTCDate()).padStart(2, "0")}`;
        let totalSalaryOfAllWorker = 0;
        for (const user of allUsers) {
            const allUserAttendance = await Attendance.find({
                userId: user._id,
                date: {
                    $gte: startDate,
                    $lte: endDate
                },
                status: { $in: ["Present", "Half Day"] },
            });
            const presentDays = allUserAttendance.filter((record) => record.status === "Present").length;
            const halfDays = allUserAttendance.filter((record) => record.status === "Half Day").length;
            const userSalary = (presentDays + halfDays / 2) * user.dailyWage;
            totalSalaryOfAllWorker += userSalary
            allUsersSalary.push({
                name: user.name,
                dailyWage: user.dailyWage,
                mobile: user.mobile,
                attendance: presentDays,
                halfDays,
                salary: userSalary,
            });
            totalSalary: totalSalaryOfAllWorker
        }

        return res.status(200).json({
            message: "All user salary fetched successfully",
            salary: { allUsersSalary, totalSalaryOfAllWorker }
        });

    } catch (error) {
        console.error("Error calculating all users salary:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateSignInAndSignOff = async (req, res) => {
    try {
        const { signIn, signOut } = req.body;
        let { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "user not found !" })
        }
        if (!signIn || !signOut) {
            return res.status(400).json({ message: "fileds are required !" })
        }
        const currentUser = await Attendance.findById(id)
        if (!currentUser) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }
        currentUser.signIn = signIn;
        currentUser.signOut = signOut;
        await currentUser.save({ validateBeforeSave: true })
        res.status(200).json({ message: "SignIn/SignOut time update successfully" })
    } catch (error) {
        return res.status(500).json({ message: "somthing happend while updating signIn/signOut time" })
    }
}


export { signOut, signIn, calculateSalaryOne, getAllAttendance, getMyAttendance, calculateSalaryAll, updateSignInAndSignOff }