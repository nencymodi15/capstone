const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
app.use(express.json());
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connection to database
connectDB();

const PORT = process.env.PORT || 5000;
const users_routes = require("./routes/users");
const budget_router = require("./routes/budgets");
const spending_router = require("./routes/spendings");
const income_router = require("./routes/incomes");
const Goal_router = require("./routes/goals");

//middlewares

app.use("/api/users/", users_routes);
app.use("/api/budget/", budget_router);
app.use("/api/spendings/", spending_router);
app.use("/api/incomes/", income_router);
app.use("/api/goals/", Goal_router);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client/build")));
  app.get("#", (req, res) => {
    res.sendFile(path.resolve(__dirname, "FrontEnd/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
