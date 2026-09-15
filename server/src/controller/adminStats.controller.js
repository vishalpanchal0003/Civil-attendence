import Attendance from "../models/AttendanceModel.js";
import UserModel from "../models/UserModel.js";

const adminStats = async (req, res) => {
    try {
        const now = new Date();
        const date = now.toISOString().split("T")[0];

        const allWorker = await UserModel.countDocuments({
            userRole: "user"
        });

        const todayPresentUser = await Attendance.countDocuments({
            date: date,
            status: "Present"
        });
        

        const absentToday = allWorker-todayPresentUser

        const stats = {
            allWorker,
            todayPresentUser,
            absentToday
        }
        return res.status(200).json({
            message: "stats fetch successfully",
            stat: stats
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "somthing happend while getting stats" })
    }
};

export default adminStats;