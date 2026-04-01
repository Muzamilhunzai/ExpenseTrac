import Transaction from '../models/Transaction.js';
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: transactions,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};