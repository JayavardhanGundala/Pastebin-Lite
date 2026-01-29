import React, { useState } from "react";

import axios from "axios";
import { Link } from 'react-router-dom'


const Create = () => {
  const [text, setText] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [ttlSeconds, setTtlSeconds] = useState("");
  const [message, setMessage] = useState("");

  // NEW STATE
  const [createdPaste, setCreatedPaste] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) {
      setMessage("Text is required");
      return;
    }

    let maxViewsValue = maxViews === "" ? null : parseInt(maxViews);
    let ttlValue = ttlSeconds === "" ? null : parseInt(ttlSeconds);

    if (maxViewsValue !== null && maxViewsValue < 1) {
      setMessage("Max Views must be ≥ 1 or leave empty for unlimited");
      return;
    }

    if (ttlValue !== null && ttlValue < 1) {
      setMessage("TTL seconds must be ≥ 1 or leave empty for unlimited");
      return;
    }

    const payload = {
      text: trimmedText,
      max_views: maxViewsValue,
      ttl_seconds: ttlValue,
    };

    try {
      const res = await axios.post(
        "https://pastebin-lite-6m8x.onrender.com/api/pastes",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // SAVE RESULT
      setCreatedPaste(res.data)
      console.log(res)

      // CLEAR FORM
      setText("");
      setMaxViews("");
      setTtlSeconds("");
      setMessage("");

    } catch (err) {
      setMessage(err.response?.data?.msg || "Server error");
    }
  };



  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">

      {/* ================= SUCCESS VIEW ================= */}
      {createdPaste ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg text-center">

          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Text Created Successfully 🎉
          </h2>

          <p className="mb-2 font-semibold">Your id:</p>
          <div className="border p-3 rounded mb-4 bg-gray-50">
            {createdPaste.data}
          </div>

          <p className="mb-2 font-semibold">Access Link:</p>
          <a
            href={createdPaste.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline break-all"
          >
            {createdPaste.msg}
          </a>

          <div className="flex gap-3 justify-center mt-6">
 <button
  onClick={() => window.location.reload()}
  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-bold"
>
  Create A Text
</button>
    <Link to="/Get" className='bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300'>Get text (URL)</Link>

          </div>
        </div>
      ) : (

      /* ================= FORM VIEW ================= */
      <>
        <h1 className="text-2xl font-bold mb-6">Create a New Text</h1>

        <form
          className="bg-white p-6 rounded shadow-md w-full max-w-lg flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-3 rounded w-full h-32 resize-none"
            placeholder="Enter your text here..."
          />

          <input
            type="number"
            min="1"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
            className="border p-3 rounded w-full"
            placeholder="Max Views (leave empty for unlimited)"
          />

          <input
            type="number"
            min="1"
            value={ttlSeconds}
            onChange={(e) => setTtlSeconds(e.target.value)}
            className="border p-3 rounded w-full"
            placeholder="Time to live in seconds (leave empty for unlimited)"
          />

          {message && <p className="text-red-500">{message}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-bold"
          >
            Create Text
          </button>
        </form>
      </>
      )}

    </div>
  );
};

export default Create;

