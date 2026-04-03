import { Transaction } from "../../models/Transaction";
export const totalnodeliquidity = async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transaction.find({ userId });

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const netLiquidity = totalIncome - totalExpense;

    res.json({ netLiquidity });
  }
    catch (error) {
        res.status(500).json({ error: "Failed to calculate liquidity" });
    }
}