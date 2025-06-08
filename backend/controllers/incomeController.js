const Income = require('../models/Income.js');
const User = require('../models/User.js');
const addIncome = async (req, res) => {
    const userId = req.user._id;
    let { source, amount ,date } = req.body;
    if (!source || !amount ) {
        return res.status(400).json({ message: "All fields are required" });
    }
     if (!date || isNaN(new Date(date).getTime())) {
       date = new Date();
     }
    try{
       const income = new Income({
              userId,
              source,
              amount,
              date 
       })
       await income.save();
         return res.status(200).json({message : "Income added successfully" , income});

    }catch(error){
           return res.status(500).json({message : "Internal server error" , error : error.message})
    }
}


const allIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ income });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const income = await Income.findByIdAndDelete(id);
     if (!income) {
       return res.status(404).json({ message: "Income record not found" });
     }
    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, source, date } = req.body; 
    
    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { amount, source, date },
      { new: true, runValidators: true }
    );



    return res
      .status(200)
      .json({ message: "Income updated successfully", updatedIncome });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


module.exports = {
    addIncome,
    allIncome,
    deleteIncome,
    updateIncome
} 