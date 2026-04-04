// services/spendingTrendsService.js
import { Transaction } from '../../../models/Transaction';
import mongoose from 'mongoose';

const SpendingTrends = async ({ userId }) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const currentYear = new Date().getFullYear();

  const monthlyExpenses = await Transaction.aggregate([
    {
      $match: {
        userId: userObjectId,
        type: 'expense',
        date: {
          $gte: new Date(currentYear, 0, 1),
          $lt: new Date(currentYear + 1, 0, 1)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$date' },
        total: { $sum: '$amount' }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ]);

  const monthsOrder = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const monthlyTotals = {
    JAN: 0, FEB: 0, MAR: 0, APR: 0, MAY: 0, JUN: 0,
    JUL: 0, AUG: 0, SEP: 0, OCT: 0, NOV: 0, DEC: 0
  };

  monthlyExpenses.forEach((item) => {
    const monthIndex = item._id - 1;
    const monthName = monthsOrder[monthIndex];
    if (monthName) {
      monthlyTotals[monthName] = item.total;
    }
  });

  const labels = monthsOrder;
  const data = monthsOrder.map((month) => monthlyTotals[month]);

  return {
    labels,
    data,
    year: currentYear
  };
};

export default SpendingTrends;