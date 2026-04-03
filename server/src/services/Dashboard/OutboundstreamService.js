import { Transaction } from "../../models/Transaction";
export const Outboundstream = async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ userId, type: "expense" });
        res.json({ outboundStream: transactions });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch outbound stream" });
    }
}
