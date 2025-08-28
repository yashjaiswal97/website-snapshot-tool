import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const captureScreenshot = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }
    setError("");
    setLoading(true);
    setScreenshot("");

    try {
      // Replace DEMO_KEY with your Apiflash API key
      const apiKey = "cb1d26e2e9df4f16bc77e733208999c2"; 
      const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&url=${encodeURIComponent(
        url
      )}&full_page=true&fresh=true`;

      setScreenshot(apiUrl); // Direct image link
    } catch (err) {
      setError("Failed to capture screenshot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Website Screenshot Tool</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter website URL (https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={captureScreenshot}>Capture Screenshot</button>
      </div>

      {loading && <p className="loading">Capturing screenshot...</p>}
      {error && <p className="error">{error}</p>}

      {screenshot && (
        <div className="screenshot">
          <img src={screenshot} alt="Website Screenshot" />
          <a href={screenshot} download="screenshot.png">
            Download Screenshot
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
