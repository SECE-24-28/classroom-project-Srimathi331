const jwt = require("jsonwebtoken");

// ===============================
// VERIFY JWT TOKEN
// ===============================
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Bearer <token>
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token format invalid" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      req.user = decoded; // store decoded payload in req.user
      next();
    });
  } catch (error) {
    console.error("verifyToken error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ===============================
// CHECK IF USER IS ADMIN
// ===============================
exports.isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access only" });
    }

    next();
  } catch (error) {
    console.error("isAdmin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
