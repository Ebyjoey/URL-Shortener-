import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    setError(""); // Clear error
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/shorten", { longUrl: url });
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">URL Shortener</h1>

      {/* Input Field */}
      <div className="mb-4 w-full max-w-lg">
        <input
          type="text"
          className="w-full p-4 rounded-md shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Shorten Button */}
      <button
        onClick={shortenUrl}
        className="w-full max-w-lg px-4 py-2 rounded-md bg-primary text-white font-semibold shadow-md hover:bg-blue-600 transition duration-300"
      >
        Shorten URL
      </button>

      {/* Shortened URL */}
      {shortUrl && (
        <div className="mt-6 text-lg">
          <p className="font-semibold text-gray-700">Your Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
