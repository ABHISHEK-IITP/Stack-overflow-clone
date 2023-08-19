import express from 'express'
import mongoose from 'mongoose'
import cors from  'cors'
import dotenv from "dotenv"

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import subsroutes from './routes/Subsroutes.js'
import chatRoutes from "./routes/ChatAi.js";
import otpRoutes from "./routes/Otp.js";

// import connectDB from "./connectMongoDb.js"

dotenv.config();
// connectDB();

const app = express();
app.use(express.json({limit: "30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

app.get('/', (req ,res)=>{
    res.send("This is stack overflow clone API")
})

app.use('/user',userRoutes)
app.use('/question', questionRoutes)
app.use('/answer', answerRoutes)
app.use('/subscription', subsroutes)
app.use('/chat', chatRoutes)
app.use('/otp', otpRoutes)

const PORT= process.env.PORT || 5000

const CONNECTION_URL= process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=> {console.log(`server running on port ${PORT}`)}))
.catch((err)=> console.log(err.message))