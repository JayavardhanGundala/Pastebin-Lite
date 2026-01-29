import mongoose from "mongoose"
import { user } from "../Model/userModel.js"
import { request } from "express"
export const checking=async (req,res)=>{
    try{
    const dbState=mongoose.connection.readyState
    if(dbState==1){
        return res.status(200).json({ok:true})
    }
    else{
        return res.status(404).json({ok:false})
    }

    }
    catch(error){
        return res.status(404).json({ok:false})
    }
    
}

export const create=async(req,res)=>{
    try{
        const {text,ttl_seconds,max_views}=req.body
        if(!text || typeof text!=="string" || text.trim()==""){
            return res.status(400).json({msg:"Content is required"})
        }
        if(ttl_seconds !== null && ttl_seconds !== undefined){
            if(typeof ttl_seconds !== "number" || ttl_seconds < 1){
                return res.status(400).json({ msg: "ttl_seconds must be a number >= 1 or null" });
            }
        }
        if(max_views !== null && max_views !== undefined){
            if(typeof max_views !== "number" || max_views < 1){
                return res.status(400).json({ msg: "max_views must be a number >= 1 or null" });
            }
        }

        

        const expires_At=(ttl_seconds!==null && ttl_seconds!==undefined)? new Date(Date.now()+ttl_seconds*1000):null
        
        const data=await user.create({
            text,
            max_views:max_views??null,
            expires_At:expires_At??null
            
        })
        return res.status(201).json({msg:`https://pastebin-lite-6m8x.onrender.com/pastes/${data._id}`,max_views,expires_At,data:data._id})


    }
    catch(err){
        res.status(400).json({msg:"server error"})
    }
}
export const getUser=async (req,res)=>{
    const id=req.params.id;
    const textExists=await user.findById(id)
    if (!textExists){
        return res.status(404).json({msg:"Enter valid url with id"})
    }
    if(textExists.expires_At!==null && textExists.expires_At!==undefined){
        if (new Date() > new Date(textExists.expires_At)) {
            return res.status(404).json({msg:"Time  expires"})

      }
        
    }
    if (textExists.max_views!==null || textExists.max_views!==undefined){
        if (textExists.max_views==0){
            return res.status(404).json({msg:"view limit over "})
        }
    }
    textExists.max_views-=1
    await textExists.save()


    
    return res.status(200).json(textExists)
}