import {
  getSpendingTrends,
  getRecentLogs,
  getOutboundStream,
  getInboundStream,
  getTotalNodeLiquidity
} from '../../services/dashboard';

import { asyncHandler } from '../../utils/asyncHandler.js';

export const spendingTrends = asyncHandler(async (req, res) => {
  const data = await getSpendingTrends(req.user._id);

  res.status(200).json({
    success: true,
    data
  });
});

export const recentLogs = asyncHandler(async (req, res) => {
  const data = await getRecentLogs(req.user._id);

  res.status(200).json({
    success: true,
    data
  });
});

export const outboundStream = asyncHandler(async (req, res) => {
  const data = await getOutboundStream(req.user._id);

  res.status(200).json({
    success: true,
    data
  });
});

export const inboundStream = asyncHandler(async (req, res) => {
  const data = await getInboundStream(req.user._id);

  res.status(200).json({
    success: true,
    data
  });
});

export const totalNodeLiquidity = asyncHandler(async (req, res) => {
  const data = await getTotalNodeLiquidity(req.user._id);

  res.status(200).json({
    success: true,
    data
  });
});