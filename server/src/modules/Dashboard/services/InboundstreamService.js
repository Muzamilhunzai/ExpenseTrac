import { Transaction } from "../../../models/Transaction";

export const Inboundstream = async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ userId, type: "income" });
        res.json({ inboundStream: transactions });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch inbound stream" });
    }
}