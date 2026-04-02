import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    currency: { type: String, default: "PKR" },
    theme: { type: String, enum: ["light", "dark"], default: "dark" },

    notifications: {
      budgetThresholds: { type: Boolean, default: true },
      dailySummary: { type: Boolean, default: true },
      systemUpdates: { type: Boolean, default: false },
    },

    twoFactorEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserSettings = mongoose.model("UserSettings", userSettingsSchema);