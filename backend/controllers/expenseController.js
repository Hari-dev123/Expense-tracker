const Expense = require("../models/Expense.js");
const User = require("../models/User.js");


const addExpense = async (req, res) => {
  const userId = req.user._id;
  let { category, amount, date } = req.body;

  if (!category || !amount ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!date || isNaN(new Date(date).getTime())) {
    date = new Date();
  }

  try {
    const expense = new Expense({
      userId: userId,
      category,
      amount,
      date,
    });

    await expense.save();
    return res
      .status(200)
      .json({ message: "Expense added successfully", expense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const allExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ expenses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense record not found" });
    }

    return res
      .status(200)
      .json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addExpense,
  allExpense,
  deleteExpense,
  updateExpense,
};
