import React from 'react';
import './ChatInput.css';

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [provider, setProvider] = React.useState('gemini');

  async function sendMessage() {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText; // Save message before clearing
    const newChatMessages = [
      ...chatMessages,
      { message: userMessage, sender: 'user', id: crypto.randomUUID() }
    ];
    setChatMessages(newChatMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, provider: provider })
      });

      const data = await response.json();

      setChatMessages([
        ...newChatMessages,
        { message: data.reply, sender: 'robot', id: crypto.randomUUID() }
      ]);
    } catch (error) {
      setChatMessages([
        ...newChatMessages,
        { message: 'Something went wrong. Please try again.', sender: 'robot', id: crypto.randomUUID() }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') sendMessage();
    else if (event.key === 'Escape') setInputText('');
  }

  function clearChat() {
    setChatMessages([]);
    setInputText('');
  }

  return (
    <div className="chat-input-area">
      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        disabled={isLoading}
      >
        <option value="gemini">Gemini</option>
        <option value="openrouter">OpenRouter</option>
      </select>

      <input
        type="text"
        placeholder="Send a message to Chatbot"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />

      <button className="clear-button" onClick={clearChat}>
        Clear
      </button>

      <button onClick={sendMessage} disabled={isLoading}>
        {isLoading ? '...' : 'Send'}
      </button>
    </div>
  );
}

export default ChatInput;