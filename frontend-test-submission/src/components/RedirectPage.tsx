import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const { code } = useParams();
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    async function redirect() {
      const res = await fetch(`http://localhost:8080/${code}`);
      if (!res.ok) {
        const data = await res.json();
        if (data.error === "link expired") {
          setExpired(true);
        }
        return;
      }
      const data = await res.json();
      if (typeof data === "string") {
        // Ensure protocol
        let url = data;
        if (url.startsWith("http://") || url.startsWith("localhost")) {
          url = "http://" + url;
        }
        if (!/^https?:\/\//i.test(url)) {
          url = "https://" + url;
        }
        setOriginalUrl(url);
      }
    }
    redirect();
  }, [code]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        {expired ? (
          <p className="text-red-600 text-lg">URL expired</p>
        ) : originalUrl ? (
          <div>
            <p className="mb-4 text-lg text-gray-700">Redirect to:</p>
            <button
              onClick={() => window.location.replace(originalUrl)}
              className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              {originalUrl}
            </button>
          </div>
        ) : (
          <p className="text-red-600 text-lg">Invalid URL</p>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;
