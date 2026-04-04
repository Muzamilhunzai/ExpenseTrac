import AddTransactionService from './AddTransactionService';
import getTransactions from './DatafetchService';
import TotalBurnService from './TotalBurnService';

export const transactionService = async (userId, data) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  const [addTransactionResult, transactionsData, totalBurnData] = await Promise.all([
    AddTransactionService.execute(data, userId),
    getTransactions({ userId }),
    TotalBurnService({ userId }),
  ]);

  return {
    addTransactionResult,
    transactions: transactionsData?.transactions || [],
    totalBurn: totalBurnData?.totalBurn || 0,
  };
};