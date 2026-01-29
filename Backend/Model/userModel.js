import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    max_views:{
        type:Number,
        default:null
    },
    expires_At:{
        type:Date,
        default:null
    }

})
export const user=mongoose.model("user",userSchema)