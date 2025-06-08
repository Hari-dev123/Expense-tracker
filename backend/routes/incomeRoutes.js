const {
  addIncome,
  allIncome,
  deleteIncome,
  updateIncome,
} = require("../controllers/incomeController.js");

const { protect } = require("../middleware/authMiddleware.js");
const express = require("express");

const Router = express.Router();

Router.post("/addIncome", protect, addIncome);
Router.get("/allIncome", protect, allIncome);
Router.patch("/updateIncome/:id", protect, updateIncome);
Router.delete("/deleteIncome/:id", protect, deleteIncome);

module.exports = Router; 
