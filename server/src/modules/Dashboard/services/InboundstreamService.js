
import { Transaction } from '../../../models/Transaction';
import mongoose from 'mongoose';

const inboundStream = async ({ userId }) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const transactions = await Transaction.find({
    userId: userObjectId,
    type: 'income'
  })
    .sort({ date: -1 })
    .select('title description category amount type date paymentMethod icon');

  return {
    inboundStream: transactions
  };
};

export default inboundStream;