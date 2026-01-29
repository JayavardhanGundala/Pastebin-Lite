import express from "express"
import cors from "cors"
import dotenv  from "dotenv"
import {connectDb} from "./config/db.js"
import {route} from "./routes/routes.js"
const app=express()
app.use(express.json())
app.use(cors())
dotenv.config()
connectDb()
app.use("/api",route)

app.listen("https://pastebin-lite-6m8x.onrender.com",()=>{
    console.log("server running",)
})  