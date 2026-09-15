import UserModel from "../models/UserModel.js";

const verifyRole = async (req,res,next) => {
try {
        const user = req.user._id;
        if (!user) {
            return res.status(401).json({ message: "unAuth user !" })
        }
        const existingUser = await UserModel.findById(user);
        if(!existingUser){
            return res.status(404).json({message:"user not found !"})
        }
        if (existingUser.userRole === "admin") {
         return next()
        }
        else {
            return res.status(403).json({ message: "user dont have permission !" })
        }
} catch (error) {
    console.log(error)
    return res.status(500).json({message:"somthing happend while running cheaking user role"})
}

}
export default verifyRole