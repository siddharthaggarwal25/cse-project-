import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authContext";

const UploadQuestionPaper = () => {
  const auth = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const objectURL = URL.createObjectURL(uploadedFile);
      setPreview(objectURL);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    if (!topic.trim()) return alert("Please enter a topic");
    if (!subject.trim()) return alert("Please enter a Subject");
    if (!auth?.token) return alert("You are not authorized. Please log in.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("topic", topic);
    formData.append("subject", subject);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });

      if (response.ok) {
        alert("File uploaded successfully");
        setFile(null);
        setPreview(null);
        setTopic("");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg m-40">
      <h2 className="text-xl font-semibold mb-3">Upload a Question Paper</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="border border-gray-700 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-2">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subject "
          />
        </div>
        <div className="border border-gray-700 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-2">Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter topic"
          />
        </div>

        <div className="border border-gray-700 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-2">
            Select a file:
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png, application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {preview && (
          <div className="mt-3">
            <p className="text-sm font-medium">Preview:</p>
            {file?.type?.startsWith("image/") ? (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-40 h-40 rounded-lg object-cover"
              />
            ) : (
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-400 underline"
              >
                View PDF
              </a>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadQuestionPaper;
