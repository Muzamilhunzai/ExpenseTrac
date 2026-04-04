import Transaction from "../../models/Transaction.js";

export const getAvgDailySpending = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  try {
    const transactions = await Transaction.find({
      userId,
      month,
      type: "expense",
    }).select("amount");

    if (!transactions.length) return 0;

    const totalSpending = transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const [year, monthNumber] = month.split("-"); // assuming format YYYY-MM
    const daysInMonth = new Date(year, monthNumber, 0).getDate();

    return totalSpending / daysInMonth;
  } catch (error) {
    console.error("getAvgDailySpending failed:", {
      userId,
      month,
      error: error.message,
    });
    throw error;
  }
};