import React, { useState, useEffect } from 'react';
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

  // PUBLIC_INTERFACE
  /** Flirty DM lines to randomly present to the user. */
  const flirtyDMLines = [
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Do you have a name, or can I call you mine?",
    "Is it hot in here, or is it just our chemistry?",
    "Is your name Wi-Fi? Because I'm feeling a connection.",
    "If flirting was a crime, you'd definitely be serving life.",
    "Do you have a map? I just got lost in your DMs.",
    "I'm not a photographer, but I can definitely picture us together.",
    "Do you believe in love at first message, or should I DM you again?",
    "I think there's something wrong with my phone... your number isn't in it.",
    "Is your name Google? Because you have everything I’m searching for.",
    "If you were a vegetable, you’d be a cutecumber.",
    "Are you made of copper and tellurium? Because you’re Cu-Te.",
    "Excuse me, but I think you dropped something: my jaw.",
    "Is your aura pastel or am I just falling for your vibe?",
    "If you were a cat, you’d purr-fect my day.",
    "I must be a snowflake, because I’ve fallen for you.",
    "If you were a fruit, you’d be a fineapple.",
    "Can I tie your shoes? I don't want you falling for anyone else.",
    "On a scale of 1 to America, how free are you tonight?",
    "If beauty were time, you’d be eternity.",
    "Did it hurt when you fell from the explore page into my DMs?",
    "Are you my homework? Because I can’t stop procrastinating but want to work on you.",
    "You must be a keyboard, because you’re just my type.",
    "I’m not an organ donor, but I’d give you my heart.",
    "Your hand looks heavy—can I hold it for you?",
    "If looks could kill, we’d both be immortal, staring at each other in our DMs.",
    "I was blinded by your beauty... I’m going to need your name and number for insurance purposes.",
    "Our DMs are like a bakery—full of sweet rolls.",
    "Do you have a Band-Aid? Because I just scraped my knee falling for you."
  ];

  // Love Meter (fake, playful value)
  const [loveValue, setLoveValue] = useState(72 + Math.floor(Math.random() * 20)); // 72-91% initial, but on scan changes to 30-99

  // Doodle images (Expanded with more cute, playful emojis as per requirements)
  const doodleOptions = [
    { src: '💑', label: 'Cute Couple' },
    { src: '🥰', label: 'Smiling in Love' },
    { src: '💕', label: 'Hearts Together' },
    { src: '💓', label: 'Beating Heart' },
    { src: '💘', label: 'Arrow Heart' },
    { src: '🦄', label: 'Unicorn Magic' },
    { src: '🧸', label: 'Teddy Bear' },
    { src: '💐', label: 'Bouquet' },
    { src: '🌈', label: 'Rainbow' },
    { src: '🎠', label: 'Carousel' },
    { src: '☁️', label: 'Cloud' },
    { src: '🧁', label: 'Cupcake' },
    { src: '🍭', label: 'Lollipop' },
    { src: '💌', label: 'Love Letter' },
    { src: '🥺', label: 'Pleading Face' },
    { src: '😻', label: 'Loving Cat' },
    { src: '🌸', label: 'Cherry Blossom' },
    { src: '💝', label: 'Gift Heart' },
    { src: '🎀', label: 'Ribbon' },
    { src: '✨', label: 'Sparkles' },
    { src: '🫶', label: 'Hearts Hands' },
    { src: '😍', label: 'Heart Eyes' },
    { src: '🦋', label: 'Butterfly' },
    { src: '🌟', label: 'Shining Star' },
    { src: '🚀', label: 'Rocket Love' },
    { src: '🫧', label: 'Bubbles' },
    { src: '🧿', label: 'Charmed' },
    // Two image doodles from before for visual variation
    { src: 'https://cdn.pixabay.com/photo/2017/01/31/13/13/valentines-day-2028256_1280.png', label: 'Heart Balloon', isImg: true },
    { src: 'https://cdn.pixabay.com/photo/2016/11/22/07/07/balloons-1845071_1280.png', label: 'Balloon Heart', isImg: true }
  ];
  const [doodleIdx, setDoodleIdx] = useState(() => Math.floor(Math.random() * doodleOptions.length));

  // Simple journal state (persisted to localStorage as well)
  const [journalText, setJournalText] = useState('');
  const [journalSaved, setJournalSaved] = useState('');
  // Saved entries array
  const [journalEntries, setJournalEntries] = useState([]);

  // Load entries from localStorage upon mount
  useEffect(() => {
    const saved = window.localStorage.getItem('lovejournal-entries');
    if (saved) {
      try {
        setJournalEntries(JSON.parse(saved));
      } catch {
        setJournalEntries([]);
      }
    }
  }, []);

  // Save journalEntries to localStorage whenever it changes
  useEffect(() => {
    window.localStorage.setItem('lovejournal-entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Scaffold handlers
  const handleReset = () => {
    setYourName('');
    setCrushName('');
    setVerdict('');
    setDmLine('');
    setLoveValue(72 + Math.floor(Math.random() * 20));
    setDoodleIdx(0);
    setJournalText('');
    setJournalSaved('');
    setJournalEntries([]);
    window.localStorage.removeItem('lovejournal-entries');
  };

  // PUBLIC_INTERFACE
  /** Handle save of journal entry: Append to entries and clear input, persist to localStorage. */
  const handleSaveJournal = () => {
    const text = (journalText || '').trim();
    if (!text) {
      setJournalSaved('');
      return;
    }
    // Save entry as a simple text (with timestamp)
    const entry = {
      text,
      timestamp: new Date().toISOString()
    };
    setJournalEntries(prev => [...prev, entry]);
    setJournalSaved(text);
    setJournalText('');
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
  /** 
   * Generate a random verdict message on Scan the Vibe click, and a new random love meter value (30%-99%).
   * Also updates the Love Meter UI instantly.
   */
  const handleScanVibe = () => {
    // Choose a random verdict from the verdictBank
    const index = Math.floor(Math.random() * verdictBank.length);
    let message = verdictBank[index];

    // Generate random love meter between 30 and 99 (inclusive, single click)
    // Math.random() generates 0-68, +30 gives 30-98. To include 99, we use Math.floor(Math.random()*70)+30 (0-69+30 = 30-99)
    const lovePercent = 30 + Math.floor(Math.random() * 70); // 30-99%
    setLoveValue(lovePercent);

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
  /** Show a new random doodle (emoji or image) that's different from the current one. */
  const handleNextDoodle = () => {
    let newIdx;
    do {
      newIdx = Math.floor(Math.random() * doodleOptions.length);
    } while (newIdx === doodleIdx && doodleOptions.length > 1);
    setDoodleIdx(newIdx);
  };

  // PUBLIC_INTERFACE
  /** Handle and 'save' (persist) journal entry. */ // (Moved above for clarity)

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
              Saved!
              <br />
              <span className="journal-dim">{journalSaved}</span>
            </div>
          )}
          {/* Display all saved entries */}
          {journalEntries.length > 0 && (
            <div style={{
              marginTop: 18,
              width: '99%',
              maxWidth: 280,
              background: 'rgba(255,255,255,0.72)',
              borderRadius: 18,
              boxShadow: '0 1px 8px #b39ddb22',
              padding: '0.6rem 0.7rem',
              fontSize: '0.98em'
            }}>
              <div style={{
                color: '#c060a8',
                fontWeight: 600,
                fontSize: '1.03em',
                marginBottom: '0.25em',
                fontFamily: "'Quicksand', 'Poppins', cursive, sans-serif",
                letterSpacing: '0.01em'
              }}>Saved Entries</div>
              <ol style={{ paddingLeft: '1.15em', margin: 0, color: '#ae348b', textAlign: 'left' }}>
                {journalEntries.map((entry, idx) => (
                  <li key={entry.timestamp+"_"+idx} style={{
                    marginBottom: '0.55em', 
                    background: idx % 2 ? '#f8bbd01c' : '#ffd1dc11',
                    borderRadius: 7,
                    padding: '0.16em 0.09em 0.16em 0.5em'
                  }}>
                    {entry.text}
                  </li>
                ))}
              </ol>
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
            onClick={() => {
              // PUBLIC_INTERFACE
              // Select a random DM line and display it below
              const index = Math.floor(Math.random() * flirtyDMLines.length);
              setDmLine(flirtyDMLines[index]);
            }}
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
                    style={{
                      maxWidth: '74px',
                      maxHeight: '74px',
                      marginTop: '0.12em',
                      borderRadius: '18px',
                      boxShadow: '0 2px 16px #ffc2e277, 0 0.5px 2px #b39ddb22',
                      background: '#fffafdcc'
                    }}
                  />
                )
                : (
                  <span
                    className="doodle-emoji"
                    role="img"
                    aria-label={doodleOptions[doodleIdx].label}
                    style={{
                      fontSize: 76,
                      display: 'inline-block',
                      margin: '0.15em 0 0.3em',
                      filter: 'drop-shadow(0px 2px 8px #ffd1dc66) drop-shadow(0 1px 1px #b39ddb55)',
                      textShadow: '0 3px 15px #f8bbd077, 0 1.5px 5px #b39ddb44'
                    }}
                  >
                    {doodleOptions[doodleIdx].src}
                  </span>
                )}
            </div>
            <button
              className="btn doodle-change-btn"
              type="button"
              onClick={handleNextDoodle}
              aria-label="Show random doodle"
            >
              Next Doodle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
