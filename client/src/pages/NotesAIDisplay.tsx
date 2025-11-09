import React, { useState } from 'react';

const NotesAIDisplay: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAgent = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '123', // or dynamic ID if you want
          input: input,
        }),
      });

      const data = await res.json();
      setResponse(data.response || 'No response received.');
    } catch (err) {
      console.error('API error:', err);
      setResponse('Error reaching the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🤖 AI Assistant</h2>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        rows={4}
        style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
      />

      <button onClick={handleAskAgent} style={{ marginTop: '1rem' }}>
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default NotesAIDisplay;
