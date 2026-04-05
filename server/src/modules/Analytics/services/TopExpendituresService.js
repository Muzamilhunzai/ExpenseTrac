import { Transaction } from "../../../models/Transaction";

export const getHighestCategory = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId,
          month,
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    if (!result.length) return null;

    return {
      category: result[0]._id,
      total: result[0].total,
    };
  } catch (error) {
    console.error("getHighestCategory failed:", {
      userId,
      month,
      error: error.message,
    });
    throw error;
  }
};