import { useState } from "react";
import UrlForm from "./components/UrlForm";

function App() {
  const [urls, setUrls] = useState([]);

  const handleUrlShortened = (newUrl) => {
    setUrls([newUrl, ...urls]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          URL Shortener
        </h1>

        <UrlForm onUrlShortened={handleUrlShortened} />

        {urls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent URLs:</h2>
            {urls.map((url, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded mb-2">
                <p className="text-sm text-gray-600">{url.original_url}</p>
                <p className="text-indigo-600 font-semibold">
                  Short: {url.short_url}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
