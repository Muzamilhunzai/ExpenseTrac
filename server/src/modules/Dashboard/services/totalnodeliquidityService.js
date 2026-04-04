import mongoose from 'mongoose';
import { Transaction } from '../../../models/Transaction';

const totalnodeliquidity = async ({ userId }) => {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid userId');
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [currentResult, previousResult] = await Promise.all([
      Transaction.aggregate([
        { $match: { userId: userObjectId } },
        {
          $group: {
            _id: null,
            totalIncome: {
              $sum: {
                $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
              },
            },
            totalExpense: {
              $sum: {
                $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
              },
            },
          },
        },
      ]),

      Transaction.aggregate([
        {
          $match: {
            userId: userObjectId,
            date: { $lt: startOfCurrentMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalIncome: {
              $sum: {
                $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
              },
            },
            totalExpense: {
              $sum: {
                $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
              },
            },
          },
        },
      ]),
    ]);

      const currentIncome = currentResult?.[0]?.totalIncome || 0;
    const currentExpense = currentResult?.[0]?.totalExpense || 0;
    const currentNet = currentIncome - currentExpense;

    const previousIncome = previousResult?.[0]?.totalIncome || 0;
    const previousExpense = previousResult?.[0]?.totalExpense || 0;
    const previousNet = previousIncome - previousExpense;

    let percentageChange = 0;
    if (previousNet !== 0) {
      percentageChange = ((currentNet - previousNet) / previousNet) * 100;
    }

    return {
      totalNodeLiquidity: currentNet,
      percentageChange: Number(percentageChange.toFixed(1)),
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to calculate total node liquidity');
  }
};

export default totalnodeliquidity;x x 