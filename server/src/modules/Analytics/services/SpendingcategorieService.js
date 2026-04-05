import mongoose from "mongoose";
import { Transaction } from "../../../models/Transaction";

export const getTopExpenditures = async (userId, month, limit = 5) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  if (limit <= 0 || limit > 50) {
    throw new Error("Invalid limit value");
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
          _id: { $toLower: "$category" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    return result.map((item) => ({
      category: item._id,
      total: item.total,
    }));
  } catch (error) {
    console.error("getTopExpenditures failed:", {
      userId,
      month,
      error: error.message,
    });
    throw error;
  }
};