import express from "express";

import {
    userRegister,
    userLogin,
    updateUserDetails,
    getAllUsers,
    logoutUser,
    updateUserDailyWage,
    adminRegister,
    getUserProfile,
    changePassword
} from "../controller/user.controller.js";

import jwtVerify from "../middlewares/jwtVerity.js";
import verifyRole from "../middlewares/roleVerify.js";

const router = express.Router();


router.get("/getalluser", jwtVerify, verifyRole, getAllUsers);
router.post("/login", userLogin);
router.post("/createuser", userRegister);
router.post("/createadmin", jwtVerify, verifyRole, adminRegister);
router.put("/updateprofile/:id", jwtVerify, updateUserDetails);
router.patch("/dailywage/:id", jwtVerify, verifyRole, updateUserDailyWage);
router.get("/getprofile", jwtVerify, getUserProfile);
router.post("/logout", jwtVerify, logoutUser);
router.put("/updatepassword/:id", jwtVerify, changePassword);



export default router;