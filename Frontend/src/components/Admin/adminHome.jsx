import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin(){
    const navigate = useNavigate();
    const [questionPapers, setQuestionPapers] = useState([]);
  
    useEffect(() => {
      const fetchQuestionPapers = async () => {
        try {
          const response = await fetch("http://localhost:8000/admin/pendingQuestionPaper" , {
             method : "GET",
          });
          const data = await response.json();
          console.log( data);
          setQuestionPapers(data);
        } catch (error) {
          console.error("Error fetching question papers:", error);
        }
      };
      fetchQuestionPapers();
    }, []);
  
    return (
      <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Pending Question Papers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionPapers.map((qp) => (
            <div key={qp._id} className="bg-gray-800 p-5 shadow-xl rounded-xl flex flex-col justify-between transform transition duration-300 hover:scale-105">
              <div>
                <h3 className="text-xl font-semibold mb-2">{qp.Subject}</h3>
                <p className="text-gray-400">📖 Topic: {qp.Title || "N/A"}</p>
                <p className="mt-2 text-blue-400 truncate">🔗 <a href={qp.UrlLink} target="_blank" rel="noopener noreferrer" className="hover:underline">View Paper</a></p>
              </div>
              <button
                onClick={() => navigate(`/review/${qp._id}`)}
                className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    );

}
export default Admin    