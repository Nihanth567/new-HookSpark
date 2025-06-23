import React, { useState } from 'react';

const App = () => {
  const [topic, setTopic] = useState('');
  const [hook, setHook] = useState('');
  const [loading, setLoading] = useState(false);

  const generateHook = async () => {
    if (!topic) return;

    setLoading(true);
    setHook('');

    const response = await fetch('/api/generate-hook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();
    setHook(data.hook || 'Failed to generate hook.');
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>HookSpark 🔥</h1>
      <p>Generate powerful short-form content hooks using AI.</p>
      <input
        type="text"
        placeholder="Enter a topic (e.g., AI productivity tools)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: '80%', padding: 10, fontSize: 16 }}
      />
      <button
        onClick={generateHook}
        style={{ marginLeft: 10, padding: 10, fontSize: 16 }}
      >
        Generate
      </button>
      <div style={{ marginTop: 20 }}>
        {loading ? <p>Generating...</p> : hook && <p><strong>Hook:</strong> {hook}</p>}
      </div>
    </div>
  );
};

export default App;
