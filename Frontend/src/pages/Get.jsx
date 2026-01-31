import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

const Get = () => {
    const [content,setContent]=useState("")
    const [message,setMessage]=useState("")
    const [text,setText]=useState("")
    const navigate=useNavigate()



    const handleChange=(e)=>{
        const value=e.target.value
        setText(value)
        


    }
    const handleSubmit=async ()=>{
        if(!text.trim()){
            setMessage("content cannoyt be empty")
            return
            
            
        }
        try{
            const res=await axios.get(`${text}`)
            console.log(res.data)
            setContent(res.data)
            navigate(`/p/${res.data._id}`,{
                state:{
                    content:res.data
                }
            })
        }
        catch(err){
            console.log(err)
            setMessage(err.response?.data?.msg||"check the url")
        }

    }
         
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 gap-4 px-4'>
         <textarea
         value={text}
         onChange={handleChange}
        className="w-full max-w-lg h-40 p-4 border border-gray-300 rounded resize-none"
        placeholder="Type your URL here..."
      />
        <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-bold"
      >
        Send
      </button>
            <Link
        to="/Create"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-bold"
      >
        Create A text
      </Link>

      <Link
        to="/Get"
        className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300"
      >
        Get text (URL)
      </Link>
       {message && <p className="text-red-500">{message}</p>}



    </div>
  )
}

export default Get