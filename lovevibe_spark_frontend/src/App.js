import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main Crush-O-Meter / LoveVibe Spark container
 */
function App() {
  // Controlled input state (for now, purely structural use)
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');
  // Placeholders for results
  const [verdict, setVerdict] = useState('');
  const [dmLine, setDmLine] = useState('');

  // Scaffold handlers (no logic yet, only resets fields)
  const handleReset = () => {
    setYourName('');
    setCrushName('');
    setVerdict('');
    setDmLine('');
  };

  return (
    <div className="lovevibe-app-bg">
      <div className="crush-o-meter-container">
        <h1 className="crush-title" style={{ fontFamily: "'Pacifico', cursive" }}>
          Crush-O-Meter <span role="img" aria-label="spark-heart">💘</span>
        </h1>
        <div className="crush-subtitle">
          See if those sparks will fly!
        </div>
        <form
          className="name-inputs"
          onSubmit={e => e.preventDefault()}
          autoComplete="off"
        >
          <input
            className="crush-input"
            type="text"
            name="yourName"
            placeholder="Your Name"
            value={yourName}
            onChange={e => setYourName(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <input
            className="crush-input"
            type="text"
            name="crushName"
            placeholder="Crush's Name"
            value={crushName}
            onChange={e => setCrushName(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <button
          className="btn btn-large scan-vibe-btn"
          type="button"
          // No logic yet, placeholder
          onClick={() => {}}
        >
          Scan the Vibe
        </button>
        <div className="verdict-area" tabIndex={-1}>
          {verdict || <span className="verdict-placeholder">Your sassy love verdict will appear here.</span>}
        </div>
        <button
          className="btn flirty-dm-btn"
          type="button"
          // No logic yet, placeholder
          onClick={() => {}}
        >
          Generate Flirty DM Line
        </button>
        <div className="dm-line-area" tabIndex={-1}>
          {dmLine || <span className="dm-placeholder">A cute DM pick-up line will appear here.</span>}
        </div>
        <button
          className="btn reset-btn"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;