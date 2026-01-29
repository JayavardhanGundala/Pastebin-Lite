import React from "react";
import { useLocation, Link } from "react-router-dom";

const Data = () => {
  const location = useLocation();
  const content = location.state?.content;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">


      <div className="bg-gray-100 p-6 rounded w-3/4 text-center">

        {content.text ? (
          <>
            <pre className="whitespace-pre-wrap">
              {content.text}
            </pre>

            <div className="mt-4 flex justify-center gap-2">
              <p>Views:</p>
              <p className="text-red-500">
                {content.max_views < 0 ? "Unlimited" : content.max_views}
              </p>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-lg">Check the URL</p>
        )}

      </div>

      {/* BUTTONS */}
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

    </div>
  );
};

export default Data;



