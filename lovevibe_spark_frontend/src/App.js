import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main Crush-O-Meter / LoveVibe Spark container, now with Love Meter, Doodle Image Changer, and Love Journal integration.
 */
function App() {
  // Name input state
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');
  // Verdict and DM line result states
  const [verdict, setVerdict] = useState('');
  const [dmLine, setDmLine] = useState('');
  // Love Meter (fake, playful value)
  const [loveValue, setLoveValue] = useState(72 + Math.floor(Math.random() * 20)); // 72-91%
  // Doodle images (ASCII, emoji, SVG, or stock URLs for placeholders)
  const doodleOptions = [
    { src: '💑', label: 'Cute Couple' },
    { src: '🥰', label: 'Smiling in Love' },
    { src: 'https://cdn.pixabay.com/photo/2017/01/31/13/13/valentines-day-2028256_1280.png', label: 'Heart Balloon', isImg: true },
    { src: '💕', label: 'Hearts Together' },
    { src: 'https://cdn.pixabay.com/photo/2016/11/22/07/07/balloons-1845071_1280.png', label: 'Balloon Heart', isImg: true },
    { src: '💓', label: 'Beating Heart' },
    { src: '💘', label: 'Arrow Heart' },
    { src: '🦄', label: 'Unicorn Magic' }
  ];
  const [doodleIdx, setDoodleIdx] = useState(0);

  // Simple journal state (not persisted)
  const [journalText, setJournalText] = useState('');
  const [journalSaved, setJournalSaved] = useState('');

  // Scaffold handlers (add logic as needed)
  const handleReset = () => {
    setYourName('');
    setCrushName('');
    setVerdict('');
    setDmLine('');
    setLoveValue(72 + Math.floor(Math.random() * 20));
    setDoodleIdx(0);
    setJournalText('');
    setJournalSaved('');
  };

  // PUBLIC_INTERFACE
  /** Playful verdicts for the love meter verdict message. */
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
  /** Generate a random verdict message on Scan the Vibe click */
  const handleScanVibe = () => {
    // Choose a random verdict from the verdictBank
    const index = Math.floor(Math.random() * verdictBank.length);
    let message = verdictBank[index];

    // Optionally personalize if both names are present
    if (yourName && crushName) {
      const pair = `${yourName.trim()} & ${crushName.trim()}`;
      message = message.replace(
        /^(.*?)([.!?])?$/,
        `$1 for <b>${pair}</b>$2`
      );
      setVerdict(<span dangerouslySetInnerHTML={{ __html: message }} />);
      return;
    }
    setVerdict(message);
  };

  // PUBLIC_INTERFACE
  /** Cycle to the next doodle image or emoji. */
  const handleNextDoodle = () => {
    setDoodleIdx((prev) => (prev + 1) % doodleOptions.length);
  };

  // PUBLIC_INTERFACE
  /** Handle and 'save' (just display) journal entry. */
  const handleSaveJournal = () => {
    setJournalSaved(journalText);
  };

  return (
    <div className="lovevibe-app-bg">
      {/* Playful responsive flex box layout splitting left/journal+main/right */}
      <div className="main-flex-love">
        {/* Left: the playful, soft journal box */}
        <div className="journal-box">
          <div className="journal-title">💕 Love Journal</div>
          <textarea
            className="journal-input"
            placeholder="Write sweet thoughts, your love story, or a message to your crush here…"
            value={journalText}
            onChange={e => {
              setJournalText(e.target.value);
              setJournalSaved('');
            }}
            rows={6}
            maxLength={600}
            spellCheck="true"
            aria-label="Write about your love"
          />
          <button
            className="btn journal-save-btn"
            type="button"
            onClick={handleSaveJournal}
          >
            Save Entry
          </button>
          {journalSaved && (
            <div className="journal-saved-feedback">
              <span role="img" aria-label="saved">💖</span>
              Saved!<br /><span className="journal-dim">{journalSaved}</span>
            </div>
          )}
        </div>

        {/* Center: main Crush-O-Meter content */}
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

        {/* Right: Love Meter at top, Doodle/photo box below */}
        <div className="side-love-column">
          <div className="love-meter-box">
            <span className="love-meter-title">Love Meter</span>
            <div className="love-meter-value">
              <span className="meter-heart">❤️</span>
              {loveValue}%
            </div>
            <div className="love-meter-sub">Compatibility score (just for fun!)</div>
          </div>
          <div className="doodle-box">
            <div className="doodle-title">Random Love Doodle</div>
            <div className="doodle-image-container" title={doodleOptions[doodleIdx].label}>
              {doodleOptions[doodleIdx].isImg
                ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img
                    src={doodleOptions[doodleIdx].src}
                    alt={doodleOptions[doodleIdx].label}
                    className="doodle-img"
                    style={{ maxWidth: '64px', maxHeight: '64px' }}
                  />
                )
                : (
                  <span
                    className="doodle-emoji"
                    role="img"
                    aria-label={doodleOptions[doodleIdx].label}
                    style={{ fontSize: 54, display: 'inline-block' }}
                  >
                    {doodleOptions[doodleIdx].src}
                  </span>
                )}
            </div>
            <button
              className="btn doodle-change-btn"
              type="button"
              onClick={handleNextDoodle}
              aria-label="Show different doodle"
            >
              Change Doodle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;