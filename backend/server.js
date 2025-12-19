const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// ROUTES
const userRoutes = require("./routes/userRoutes");
const planRoutes = require("./routes/planRoutes");
const rechargeRoutes = require("./routes/rechargeRoutes");
const benefitRoutes = require("./routes/benefitRoutes");
const footerRoutes = require("./routes/footerRoutes");
const menuRoutes = require("./routes/menuRoutes");
const offerRoutes = require("./routes/offerRoutes");
const popularPlanRoutes = require("./routes/popularPlanRoutes");
const operatorRoutes = require("./routes/operatorRoutes");
const dthPlanRoutes = require("./routes/dthPlans");
const adminRoutes = require("./routes/adminRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ================= MIDDLEWARE =================

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// ✅ VERY IMPORTANT: serve uploaded avatars
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROUTES =================
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/recharges", rechargeRoutes);
app.use("/api/benefits", benefitRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/popular-plans", popularPlanRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/dth-plans", dthPlanRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Rechago Backend is running!");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
