
import express from "express";
import { signIn, signOut, calculateSalaryOne, getMyAttendance, getAllAttendance, calculateSalaryAll } from "../controller/attendance.controller.js";
import jwtVerify from "../middlewares/jwtVerity.js";
import verifyRole from "../middlewares/roleVerify.js";
import adminStats from "../controller/adminStats.controller.js";

const router = express.Router();

router.post("/signin", jwtVerify, signIn);
router.post("/signout", jwtVerify, signOut);
router.get("/getattendance", jwtVerify, getMyAttendance);
router.get("/getallattendance", jwtVerify, verifyRole, getAllAttendance);
router.post("/getsalary", jwtVerify, calculateSalaryOne);
router.get("/getallsalary", jwtVerify,verifyRole, calculateSalaryAll);
router.get("/adminstats", jwtVerify,verifyRole, adminStats);


export default router;