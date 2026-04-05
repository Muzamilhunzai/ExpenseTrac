import express from 'express';
import getDashboardData from '../controllers/DashboardController.js';

const router = express.Router();

router.route('/analytics')
      .get(getDashboardData);

export default router;