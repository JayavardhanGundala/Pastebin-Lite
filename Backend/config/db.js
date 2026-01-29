import mongoose from "mongoose";
export const  connectDb=async ()=>{
    try{
        const con=mongoose.connect(process.env.mongourl)
    }
    catch(err){
        console.log(`mongodb not connected ${err}`)
    }
}