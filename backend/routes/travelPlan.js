const express = require('express')
const router = express.Router()
const { createTravelPlan, getTravelPlans, getTravelPlanById, searchSimilarTravelPlans } = require('../controllers/travelPlanController')
const auth = require('../middleware/auth')


router.post('/', auth, createTravelPlan)

// Get all travel plans for logged-in user
router.get('/', auth, getTravelPlans)

router.get('/:id', auth, getTravelPlanById)

router.get('/:id/search', auth, searchSimilarTravelPlans)

module.exports = router;

