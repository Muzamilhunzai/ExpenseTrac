import express from "express"
import AnalyticsController from "../controllers/AnalyticsController.js"

const router = express.Router()

router.get("/analytics/expenses-by-category", AnalyticsController.getExpensesByCategory)
router.get("/analytics/highest-category", AnalyticsController.getHighestCategory)
router.get("/analytics/top-expenditures", AnalyticsController.getTopExpenditures)

export default router