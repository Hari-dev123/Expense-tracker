const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const { isValidObjectId, Types } = require("mongoose");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(userId);

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);



    
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

  
    const lastTransactions = await Promise.all([
      Income.find({ userId }).sort({ date: -1 }).limit(5),
      Expense.find({ userId }).sort({ date: -1 }).limit(5),
    ]);

    const recentTransactions = [...lastTransactions[0], ...lastTransactions[1]]
      .map((item) => ({
        ...item.toObject(),
        type: item instanceof Income ? "income" : "expense",
      }))
      .sort((a, b) => b.date - a.date);

    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
   
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardData };
