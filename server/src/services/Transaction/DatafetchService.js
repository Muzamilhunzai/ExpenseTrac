import { Transaction } from "../../models/Transaction";

export const getTransactions = async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
}
