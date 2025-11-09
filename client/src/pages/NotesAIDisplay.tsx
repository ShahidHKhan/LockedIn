import React, { useState } from 'react';

export default function NotesAIDisplay() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'test',
          input: input,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.response || 'No response received.');
      } else {
        setResponse('Error from assistant.');
      }
    } catch (err) {
      setResponse('❌ Failed to reach server.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🤖 AI Assistant</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        cols={60}
        placeholder="Ask something..."
      />

      <div style={{ margin: '1rem 0' }}>
        <button onClick={handleAskAI} disabled={loading}>
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>

      {response && (
        <div>
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
}
