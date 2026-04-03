import Transaction from "../../../models/Transaction.js";
import { AppError } from "../../../common/utils/AppError.js";

class AddTransactionService {
    async execute(data, userId) {
        const {
            title,
            description,
            amount,
            date,
            type,
            category,
            paymentMethod
        } = data;

        // Basic validation
        if (!title || !amount || !type) {
            throw new AppError("Title, amount, and type are required", 400);
        }

        // Normalize data
       const cleanTitle = typeof title === "string" ? title.trim() : "";
        const cleanAmount = Number(amount);

        if (isNaN(cleanAmount) || cleanAmount <= 0) {
            throw new AppError("Amount must be a valid number greater than 0", 400);
        }

        if (!["income", "expense"].includes(type)) {
            throw new AppError("Invalid transaction type", 400);
        }

        const transaction = await Transaction.create({
            title: cleanTitle,
            description,
            amount: cleanAmount,
            date: date ? new Date(date) : new Date(),
            type,
            category,
            paymentMethod,
            user: userId
        });

        return transaction;
    }
}

export default new AddTransactionService();