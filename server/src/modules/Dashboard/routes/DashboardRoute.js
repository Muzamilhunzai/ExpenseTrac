// routes/dashboardRoutes.js
import express from 'express';
import getDashboardData from '../controllers/DashboardController.js';

const router = express.Router();

// Only ONE route for all dashboard analytics
router.route('/Dashboard').get(getDashboardData);        // ← Calls the controller, not individual services

export default router;