import { Transaction } from "../../../models/Transaction";

export const getHighestCategory = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  try {
    const transactions = await Transaction.find({
      userId,
      month,
      type: "expense",
    }).select("amount category");

    if (!transactions.length) return null;

    const categoryTotals = transactions.reduce((totals, transaction) => {
      const category = transaction.category;

      totals[category] = (totals[category] || 0) + transaction.amount;
      return totals;
    }, {});

    const highestCategory = Object.keys(categoryTotals).reduce((highest, category) => {
      return categoryTotals[category] > categoryTotals[highest]
        ? category
        : highest;
    });

    return {
      category: highestCategory,
      total: categoryTotals[highestCategory],
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