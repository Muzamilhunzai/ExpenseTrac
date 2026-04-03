import { Transaction } from "../../../models/Transaction";


export const SpendingTrends = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({
      userId,
      type: "expense",
    });

    const monthsOrder = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const monthlyTotals = {
      JAN: 0, FEB: 0, MAR: 0, APR: 0,
      MAY: 0, JUN: 0, JUL: 0, AUG: 0,
      SEP: 0, OCT: 0, NOV: 0, DEC: 0
    };

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthIndex = date.getMonth();
      const monthName = monthsOrder[monthIndex];
      monthlyTotals[monthName] += t.amount;
    });

    const labels = monthsOrder;
    const data = monthsOrder.map((month) => monthlyTotals[month]);

    res.json({ labels, data });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spending trends" });
  }
};