import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true, match: /^\d{10}$/ },
    dailyWage: { type: Number, min: 0, default: 0 },
    password: { type: String, required: true, minlength: 6 },
    refreshToken: { type: String, default: null },
    userRole: { type: String, enum: ["admin", "user"], default: "user" }
  },
  { timestamps: true }
);


userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashPassword
    next()
  }
  catch (err) {
    next(err)
  }
})


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d' }
  );
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema)
export default UserModel;  
