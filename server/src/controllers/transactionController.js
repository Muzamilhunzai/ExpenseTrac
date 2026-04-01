import user from '../models/User.js';
import Transaction from '../models/Transaction.js';
export const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
      userId: req.user.id, 
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};