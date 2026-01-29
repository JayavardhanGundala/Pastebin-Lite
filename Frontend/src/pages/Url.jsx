import React from 'react'
import { Link } from 'react-router-dom'

const Url = () => {
  return (
    <>
    <div className='flex items-center justify-center h-screen bg-gray-500 gap-10'>
    <Link to="/Create" className="bg-blue-500 text-white  py-2 px-4 rounded hover:bg-blue-600 font-bold">Create A text</Link>
    <Link to="/Get" className='bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300'>Get text (URL)</Link>
    </div>

    </>
  )
}

export default Url