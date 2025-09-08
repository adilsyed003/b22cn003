import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shorten } from "../api";

export const Home = () => {
  const [url, setUrl] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [shortUrl, setShortUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await shorten(url, minutes);
    if (res.error) {
      alert(res.error);
    } else {
      setShortUrl(res.shortUrl);
    }
  };

  const handleStats = () => {
    navigate(`/stats`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-8 right-8">
        <button
          onClick={handleStats}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
              fill="white"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
            />
          </svg>
        </button>
      </div>
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 mx-2">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          URL Shortener
        </h2>
        <form className="mb-6" onSubmit={handleShorten}>
          <input
            className="w-full mb-3 px-4 py-2 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the long URL (e.g. https://example.com)"
          />
          <input
            className="w-full mb-3 px-4 py-2 border-2 border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            placeholder="Expiry in minutes (0 = 1 day)"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="mb-2">Shortened URL:</p>
            <button
              onClick={() => {
                navigate(`/${shortUrl.split("/").pop()}`);
              }}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold hover:bg-blue-200 transition"
            >
              {shortUrl}
            </button>
            <button
              onClick={handleStats}
              className="ml-4 bg-green-100 text-green-700 px-4 py-2 rounded font-semibold hover:bg-green-200 transition"
            >
              View Stats
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
