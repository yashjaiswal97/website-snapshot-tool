import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  const previewScreenshot = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }
    setError("");
    setLoading(true);
    setScreenshot("");
    setPreview(false);

    try {
      const apiKey = "cb1d26e2e9df4f16bc77e733208999c2"; // API key
      const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&url=${encodeURIComponent(
        url
      )}&full_page=true&fresh=true`;

      setScreenshot(apiUrl);
      setPreview(true);
    } catch (err) {
      setError("Failed to fetch preview");
    } finally {
      setLoading(false);
    }
  };

  const downloadScreenshot = async () => {
    if (!screenshot) return;

    try {
      const response = await fetch(screenshot);
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = "screenshot.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);
    } catch (err) {
      setError("Failed to download screenshot");
    }
  };

  return (
    <div className="app">
      <h1 className="title">Snapshot Tool</h1>

      <div className="card">
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter website URL (https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={previewScreenshot}>Preview Snapshot</button>
        </div>

        {/* Show spinner when loading */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Generating preview...</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {preview && screenshot && !loading && (
          <div className="screenshot">
            <img src={screenshot} alt="Website Preview" />
            <button onClick={downloadScreenshot}>Download Snapshot</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;