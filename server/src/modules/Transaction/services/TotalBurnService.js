import Transaction from "../../../models/Transaction.js";
import mongoose from "mongoose";

class TotalBurnService {
    async execute(userId) {
        const result = await Transaction.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    type: "expense"
                }
            },
            {
                $group: {
                    _id: null,
                    totalBurn: { $sum: "$amount" }
                }
            }
        ]);

        return result[0]?.totalBurn || 0;
    }
}

export default new TotalBurnService();