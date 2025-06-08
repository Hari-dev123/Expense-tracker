const {
  addExpense,
  allExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController.js");
const { protect } = require("../middleware/authMiddleware.js");

const express = require("express");
const Router = express.Router();

Router.post("/addExpense", protect, addExpense);
Router.get("/allExpense", protect, allExpense);
Router.patch("/updateExpense/:id", protect, updateExpense);
Router.delete("/deleteExpense/:id", protect, deleteExpense);

module.exports = Router;
