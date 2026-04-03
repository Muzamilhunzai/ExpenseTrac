import { Transaction } from "../../../models/Transaction";



export const Recentlogs= async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ userId }).sort({ date: -1 }).limit(10);
        res.json({ recentLogs: transactions });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch recent logs" });
    }
}