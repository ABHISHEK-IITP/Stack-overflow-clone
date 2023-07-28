import express from 'express'
import mongoose from 'mongoose'
import cors from  'cors'
import dotenv from "dotenv"

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import chatRoutes from "./routes/ChatAi.js";
import socialRoutes from "./routes/Social.js";
import subsRoutes from "./routes/subscription.js";
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

app.use("/chat/", chatRoutes);
app.use("/user/", userRoutes);
app.use("/questions/", questionRoutes);
app.use("/answer/", answerRoutes);
app.use("/social/post/", socialRoutes);
app.use("/subscription", subsRoutes);


const PORT= process.env.PORT || 5000

const CONNECTION_URL= process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=> {console.log(`server running on port ${PORT}`)}))
.catch((err)=> console.log(err.message))