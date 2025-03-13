import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/authContext";

export default function Papers() {
  const auth = useContext(AuthContext);
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    const fetchPapers = async () => {
      if (!auth?.token) return;

      try {
        const response = await fetch("http://localhost:8000/paper", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Papers:", data);

        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setPapers(shuffled);
        setFilteredPapers(shuffled);
      } catch (error) {
        console.error("Error fetching papers:", error.message);
      }
    };

    fetchPapers();
  }, [auth?.token]); // ✅ Triggers only when token changes

  const handleFilter = () => {
    let filtered = papers;
    if (search) {
      filtered = filtered.filter((paper) =>
        paper.Title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (subject) {
      filtered = filtered.filter((paper) =>
        paper.Subject.toLowerCase().includes(subject.toLowerCase())
      );
    }
    setFilteredPapers(filtered);
  };

  const toggleAnswer = (id) => {
    setShowAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen text-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Question Papers</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-blue-400 bg-blue-200 text-blue-900 p-3 rounded w-full placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Filter by subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-blue-400 bg-blue-200 text-blue-900 p-3 rounded w-full placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition w-full md:w-auto"
        >
          Filter
        </button>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map((paper) => (
          <div
            key={paper._id}
            className="bg-blue-950 p-5 rounded-lg shadow-md transform hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{paper.Title}</h3>
            <p className="text-sm text-blue-300">Subject: {paper.Subject}</p>
            <img
              src="/placeholder-image.jpg"
              alt="Paper Preview"
              className="w-full h-40 object-cover mt-3 rounded-lg"
            />
            <div className="flex flex-col gap-2 mt-4">
              <a
                href={paper.UrlLink}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded text-center font-medium transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Paper
              </a>
              <a
                href={paper.UrlLink}
                download
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded text-center font-medium transition"
              >
                Download
              </a>
            </div>
            <button
              onClick={() => toggleAnswer(paper._id)}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded w-full mt-3 font-medium transition"
            >
              {showAnswers[paper._id] ? "Hide Answer" : "Show Answer"}
            </button>
            {showAnswers[paper._id] && (
              <div className="mt-3 p-3 bg-blue-800 rounded text-white">
                <p>Answer details for {paper.Title}...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
