
export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total income
    const income = await Transaction.aggregate([
      { $match: { userId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total expense
    const expense = await Transaction.aggregate([
      { $match: { userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Category-wise expense (for pie chart)
    const categoryData = await Transaction.aggregate([
      { $match: { userId, type: "expense" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalIncome: income[0]?.total || 0,
        totalExpense: expense[0]?.total || 0,
        categoryBreakdown: categoryData,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};