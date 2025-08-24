require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/user')
const travelPlanRoutes = require('./routes/travelPlan')
const accountRoutes = require("./routes/account");

const app = express()
const PORT = process.env.PORT || 5000

//Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', profileRoutes);
app.use('/api/travelPlans', travelPlanRoutes);
app.use('/api/auth/profile', accountRoutes);


//Sample route 
app.get('/', (req, res) => {
    res.send('Backend is working');
});

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    });
})
.catch((err) => console.error('Mongo error:', err));