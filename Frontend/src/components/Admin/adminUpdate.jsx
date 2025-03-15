import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionPaper, setQuestionPaper] = useState(null);

  useEffect(() => {
    const fetchQuestionPaper = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/admin/paper/${id}`,
          { method: "GET" }
        );
        const data = await response.json();
        setQuestionPaper(data);
      } catch (error) {
        console.error("Error fetching question paper:", error);
      }
    };
    fetchQuestionPaper();
  }, [id]);

  const handleApproval = async (isApproved) => {
    try {
      await fetch("http://localhost:8000/admin/updateApproved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          approved: isApproved ? "true" : "false",
          questionPapersId: id,
        }),
      });
    //   navigate(-1);
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  if (!questionPaper) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen text-white flex">
      <div className="w-2/3 p-4">
        <iframe
          src={questionPaper.UrlLink}
          title={questionPaper.Title}
          className="w-full h-screen rounded-lg shadow-lg"
        ></iframe>
      </div>
      <div className="w-1/3 p-6 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">{questionPaper.Title}</h2>
        <p className="text-gray-300">📚 Subject: {questionPaper.Subject}</p>
        <p className="text-gray-400">
          📖 Topic: {questionPaper.Topic || "N/A"}
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleApproval(true)}
            className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Approve
          </button>
          <button
            onClick={() => handleApproval(false)}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReview;
