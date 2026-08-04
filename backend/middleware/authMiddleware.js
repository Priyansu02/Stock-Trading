const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "Authentication header missing",
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN RECEIVED:", token);

        if (!token) {
            return res.status(401).json({
                message: "Token missing",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED TOKEN:", decoded);

        req.userId = decoded.userId;

        next();

    } catch (err) {
        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;