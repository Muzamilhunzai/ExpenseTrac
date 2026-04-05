import mongoose from "mongoose";
import { Transaction } from "../../../models/Transaction";

export const monthlySpendChartData = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          month,
          type: "expense",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
            },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return result.map((item) => ({
      date: item._id,
      total: item.total,
    }));
  } catch (error) {
    console.error("monthlySpendChartData failed:", {
      userId,
      month,
      error: error.message,
    });
    throw error;
  }
};