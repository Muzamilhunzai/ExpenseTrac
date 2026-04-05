import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String },

    category: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    
    month: {
        type: String,
        required: true,
    },

    paymentMethod: {
      type: String,
    },

    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
