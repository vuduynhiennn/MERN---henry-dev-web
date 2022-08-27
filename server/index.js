require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.c5eiqpa.mongodb.net/?retryWrites=true&w=majority`, {
            // useCreateIndex: true, 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            // useFindAndModify: false 
        })
        console.log('connected to database')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(express.json())

app.use('api/auth', authRouter)

const PORT = 5000
app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})