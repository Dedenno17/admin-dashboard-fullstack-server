import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import OverallStat from '../models/OverallStat.js';

// get user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get dashboard
export const getDashboardStats = async (req, res) => {
  try {
    // harcoded values
    const currentMonth = 'November';
    const currentYear = '2021';
    const currentDay = '2021-11-15';

    // recent transaction
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // overall stats
    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStats = overallStats[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStats[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
