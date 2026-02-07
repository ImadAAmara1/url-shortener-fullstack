import { useState } from "react";

function UrlForm({ onUrlShortened }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // valider url avant d'envoi a l'api
  const validateUrl = (url) => {
    const pattern =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return pattern.test(url); // cette fonction retourne true si l'url est valide, sinon false
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateUrl(url)) {
      setError("invalid url");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/shorturl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        onUrlShortened(data);
        setUrl("");
      }
    } catch (err) {
      setError("Server error , Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      {error && <div className="text-red-500 text-sm">Error: {error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}
export default UrlForm;
