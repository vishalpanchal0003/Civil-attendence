import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", required: true
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    signIn: { type: Date, required: true },
    signOut: { type: Date, default: null },
    status: { type: String, enum: ["Present", "Half Day", "Absent"], default:"Present" },
    workingHours: { type: Number, default: 0 }
  },
  { timestamps: true }
);

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;