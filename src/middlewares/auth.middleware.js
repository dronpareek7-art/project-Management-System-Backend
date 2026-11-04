import jwt from "jsonwebtoken";

export async function verifyToken(req, res) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Missing token. Please login first."
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        next();
    }
    catch (error) {
        console.error("Token not verify");
        return res.status(500).json({
            success: false,
            messsage: "Unauthorized Invalid/Expired token "
        })
    }

}