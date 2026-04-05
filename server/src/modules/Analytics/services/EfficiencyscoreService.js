import mongoose from "mongoose";
import { Transaction } from "../../../models/Transaction";

export const getEfficiencyScore = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          month,
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    if (!result.length) return 100;

    const { totalIncome, totalExpense } = result[0];

    if (totalIncome === 0) return 0;

    const efficiencyScore =
      ((totalIncome - totalExpense) / totalIncome) * 100;

    return Math.max(0, Math.min(100, efficiencyScore));
  } catch (error) {
    console.error("getEfficiencyScore failed:", {
      userId,
      month,
      error: error.message,
    });
    throw error;
  }
};