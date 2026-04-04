import { Transaction } from '../../../models/Transaction';
import mongoose from 'mongoose';

const recentLogs = async ({ userId }) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const transactions = await Transaction.find({ 
    userId: userObjectId 
  })
    .sort({ date: -1 })
    .limit(10)
    .select('title description category amount type date paymentMethod icon');

  return {
    recentLogs: transactions
  };
};

export default recentLogs;