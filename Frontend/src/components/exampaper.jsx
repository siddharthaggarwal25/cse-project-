import { useEffect, useState } from "react";

export default function Papers() {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch("/api/questionpapers");
      const data = await response.json();
      const shuffled = data.sort(() => Math.random() - 0.5);
      setPapers(shuffled);
      setFilteredPapers(shuffled);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

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
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Filter by subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded">
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map((paper) => (
          <div key={paper._id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{paper.Title}</h3>
            <p className="text-sm text-gray-600">Subject: {paper.Subject}</p>
            <img
              src="/placeholder-image.jpg"
              alt="Question Paper Preview"
              className="w-full h-40 object-cover mt-2 rounded"
            />
            <div className="flex gap-2 mt-2">
              <a
                href={paper.UrlLink}
                className="bg-blue-500 text-white p-2 rounded text-center w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Paper
              </a>
              <a
                href={paper.UrlLink}
                download
                className="bg-green-500 text-white p-2 rounded text-center w-full"
              >
                Download
              </a>
            </div>
            <button
              onClick={() => toggleAnswer(paper._id)}
              className="bg-gray-500 text-white p-2 rounded w-full mt-2"
            >
              {showAnswers[paper._id] ? "Hide Answer" : "Show Answer"}
            </button>
            {showAnswers[paper._id] && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p>Answer details for {paper.Title}...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
