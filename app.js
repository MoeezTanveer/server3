require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const orderRouter = require("./routes/orders");
const braintreeRouter = require("./routes/braintree");
const orderRoutes = require("./routes/orders"); 
const { loginCheck } = require("../registration-server/middleware/auth");
const path = require("path");
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/order", orderRouter);  // Protected Route for orders
app.use("/api/braintree", loginCheck, braintreeRouter);  // Protected Route for payments
app.use("/uploads", express.static(path.join(__dirname, "../database-server-1/public/uploads")));
// app.use("/orders", orderRoutes);
// Database Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database Server 2: Database connected"))
.catch((err) => console.log("Database connection error:", err));

// Root Route (Display Group Info)
app.get("/", (req, res) => {
  res.json({
    groupNumber: "1", 
    members: ["Roman", "Laiba", "Moeez"],  
    projectTitle: "Departmental Store",
  });
});

// Run Server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Database Server 3 is running on port ${PORT}`);
});
