const express = require('express')
const router = express.Router()
const { createTravelPlan, getTravelPlans, getTravelPlanById, editTravelPlan, searchSimilarTravelPlans, joinRide, deleteTravelPlan } = require('../controllers/travelPlanController')
const auth = require('../middleware/auth')


router.post('/', auth, createTravelPlan)

// Get all travel plans for logged-in user
router.get('/', auth, getTravelPlans)

router.get('/:id', auth, getTravelPlanById)

router.post('/:id', auth, editTravelPlan)

router.get('/:id/search', auth, searchSimilarTravelPlans)

router.get('/:id/search/:join_id', auth, joinRide)

router.get('/:id/delete', auth, deleteTravelPlan)

module.exports = router;

