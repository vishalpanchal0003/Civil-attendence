import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save();

        return {
            accessToken,
            refreshToken
        };

    } catch (error) {
        console.log(
            "Error while generating access token and refresh token:",
            error
        );

        throw error;
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const userProfile = await UserModel.findById(userId).select("-password -refreshToken")
        if (!userProfile) {
            return res.status(404).json({ message: "user profile not found !" })
        }
        return res.status(200).json({ message: "user profile fetched successfully ", profile: userProfile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "smothing happend while fetching user pofile" })
    }
}


const adminRegister = async (req, res) => {
    try {
        const { name, email, mobile, password, userRole = "admin" } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ message: "all fields are required !" })
        }

        const existingUser = await UserModel.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            return res.status(400).json({ message: "user with the same Gmail or mobile number already exists" });
        }
        const newUser = await UserModel.create({
            name,
            email,
            mobile,
            password,
            userRole
        })
        const admin = newUser.toObject()
        delete admin.password
        delete admin.refreshToken;
        const option = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(admin._id)
        res.status(201)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({ message: "admin registered successfully", user: admin, accessToken });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });

    }
}
const userRegister = async (req, res) => {
    try {
        const { name, email, mobile, dailyWage, password } = req.body;
        if (!name || !email || !mobile || dailyWage <= 0 || !password) {
            return res.status(400).json({ message: "all fields are required !" })
        }
        const existingUser = await UserModel.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with the same Gmail or mobile number already exists" });
        }
        const newUser = await UserModel.create({
            name,
            email,
            mobile,
            dailyWage,
            password,
        })
        const user = newUser.toObject()
        delete user.password
        delete user.refreshToken;
        const option = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

        res.status(201)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({ message: "User registered successfully", user, accessToken });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const userLogin = async (req, res) => {
    try {
        const { identifyer, password } = req.body;

        if (!identifyer || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        const isEmail = identifyer.includes("@");

        const existingUser = await UserModel.findOne(
            isEmail
                ? { email: identifyer }
                : { mobile: identifyer }
        );
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const user = existingUser.toObject()
        delete user.password
        delete user.refreshToken
        const option = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)
        res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({ message: "User logged in successfully", user: user, accessToken });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const { name, email, dailyWage = 0, mobile } = req.body;
        const userId = req.user._id;

        if (!userId) {
            return res.status(404).json({
                message: "user not found !"
            });
        }

        const user = await UserModel.findById(userId).select("userRole");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!name || !email || !mobile) {
            return res.status(400).json({
                message: "fields are empty"
            });
        }

        if (user.userRole === "user" && dailyWage <= 0) {
            return res.status(400).json({
                message: "Daily wage is required"
            });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    name,
                    email,
                    mobile,
                    dailyWage
                }
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password -refreshToken");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User details updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ userRole: "user" }).select("-password -refreshToken");
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateUserDailyWage = async (req, res) => {
    try {
        let { dailyWage } = req.body;
        let { id } = req.params;
        if (dailyWage <= 0) {
            return res.status(400).json({ message: "daily wages required !" })
        }
        if (!id) {
            return res.status(404).json({ message: "user not found !" })
        }
        const updatedWage = await UserModel.findById(id).select("-password -refreshToken")
        if (!updatedWage) {
            return res.status(404).json({ message: "user not found !" })
        }
        updatedWage.dailyWage = dailyWage;
        await updatedWage.save()

        res.status(200).json({ message: "daily wage is update successfully", updated: updatedWage })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "somthing happend while update the user wage" })
    }
}

const logoutUser = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }
        await UserModel.findOneAndUpdate({ _id: userId }, { refreshToken: null }, { new: true });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const changePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { password, newPassword, confirmPassword } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "user is unAuth" })
        }
        if (!password || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "all fields are required !" })
        }
        if (password.toLowerCase() === newPassword.toLowerCase()) {
            return res.status(400).json({ message: "old password and new password is same  please use diffrent !" })
        }
        const currentUser = await UserModel.findById(userId);
        currentUser.password = newPassword;
        await currentUser.save({ runValidators: true })
        res.status(200).json({ message: "password update successfully" })
    } catch (error) {
        return res.status(500).json({ message: "somthing happend while changing user password" })
    }

}

export { userRegister, userLogin, changePassword, updateUserDetails, getAllUsers, logoutUser, getUserProfile, updateUserDailyWage, adminRegister };