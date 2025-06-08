const mongoose  =  require('mongoose');
const User  = require('./User');

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

expenseSchema.pre("save", function (next) {
  if (!this.date || isNaN(new Date(this.date).getTime())) {
    this.date = new Date();
  }
  next();
});

const Expense = mongoose.model('Expense',expenseSchema);
module.exports = Expense;
