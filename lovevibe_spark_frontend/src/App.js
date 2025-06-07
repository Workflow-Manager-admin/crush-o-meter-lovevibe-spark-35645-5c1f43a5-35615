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

  // PUBLIC_INTERFACE
  /**
   * An array of playful verdict messages for the love meter.
   * Uses placeholders for name insertion if desired.
   */
  const verdictBank = [
    "🔥 The chemistry between you two could melt glaciers!",
    "⚡ Sparks detected! Someone's got butterflies!",
    "💌 If hearts had a wifi signal, you'd be on the same network.",
    "🎉 We're getting party vibes—shoot your shot!",
    "🌈 The universe ships you both. Hard.",
    "☁️ High chance of daydreaming with this crush.",
    "🍭 Sweet as candy, risky as double texting.",
    "😭 Prepare to overthink every emoji sent!",
    "😏 That look? 100% mutual interest.",
    "🦄 Unicorns are real, and so is your spark!",
    "🌶️ A little spicy, a little nicey.",
    "🤩 Even your Instagram algorithm knows you're obsessed.",
    "🎶 This vibe? It's giving rom-com soundtrack.",
    "🍀 Luck is on your side. Send that DM!",
    "🫦 Flirt level: Professional.",
    "🥺 The heart wants what it wants.",
    "💫 Shooting stars approve this crush.",
    "🔮 All signs point to... YES!",
    "✨ Cuteness overload detected.",
    "🥰 This is more than just a vibe. It's a whole mood."
  ];

  // PUBLIC_INTERFACE
  /**
   * Generate and display a random verdict message on Scan the Vibe click
   */
  const handleScanVibe = () => {
    // Choose a random verdict from the verdictBank
    const index = Math.floor(Math.random() * verdictBank.length);
    let message = verdictBank[index];

    // Optionally personalize if both names are present
    if (yourName && crushName) {
      const pair = `${yourName.trim()} & ${crushName.trim()}`;
      // Add a playful twist to some verdicts if desired
      message = message.replace(
        /^(.*?)([.!?])?$/,
        `$1 for <b>${pair}</b>$2`
      );
      // For better experience, only HTML-ize when verdict allows
      setVerdict(<span dangerouslySetInnerHTML={{ __html: message }} />);
      return;
    }
    setVerdict(message);
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
          onClick={handleScanVibe}
        >
          Scan the Vibe
        </button>
        <div className="verdict-area" tabIndex={-1}>
          {/* verdict could be JSX or a string */}
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