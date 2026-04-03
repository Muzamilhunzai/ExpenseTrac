import express from 'express';

import {
  totalNodeLiquidity,
  inboundStream,
  outboundStream,
  recentLogs,
  spendingTrends
} from '@/controllers/dashboard/dashboard.controller.js';

import { authenticate } from '@/middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.route('/liquidity').get(totalNodeLiquidity);
router.route('/streams/inbound').get(inboundStream);
router.route('/streams/outbound').get(outboundStream);
router.route('/logs/recent').get(recentLogs);
router.route('/analytics/spending-trends').get(spendingTrends);

export default router;