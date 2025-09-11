require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const http = require("http")
const { Server } = require("socket.io")
const chatSocket = require("./sockets/chatSocket")
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/user')
const travelPlanRoutes = require('./routes/travelPlan')
const accountRoutes = require("./routes/account")

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

// Attach socket to the server
const io = new Server(server, {
    cors : {
        origin : "*"
    }
})

// ✅ initialize socket logic
chatSocket(io)

// Middleware
app.use(cors({origin : "http://10.10.22.25:3000"}));
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/auth/profile', profileRoutes)
app.use('/api/travelPlans', travelPlanRoutes)
app.use('/api/auth/account', accountRoutes)

// Sample route 
app.get('/', (req, res) => {
    res.send('Backend is working')
})

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log('MongoDB connected')
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
.catch((err) => console.error('Mongo error:', err))

// ✅ Store io in app locals (so routes/controllers can use it)
app.set("io", io)
