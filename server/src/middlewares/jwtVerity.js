import jwt from "jsonwebtoken";

const jwtVerify = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        console.error("Error verifying JWT:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
export default jwtVerify;