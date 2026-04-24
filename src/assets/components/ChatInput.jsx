import { useState } from 'react';
import { chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');

    async function sendMessage() {
        if (!inputText.trim()) return;

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);

        const response = await chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);
        setInputText('');
    }

    function clearMessages(){
        setChatMessages([]);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') sendMessage();
        else if (event.key === 'Escape') setInputText('');
    }

    return (
        <div className="chat-input-area">
            <input
                type="text"
                placeholder="Send a message to Chatbot"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick = {clearMessages}
            className = 'clear-button'>Clear</button>
        </div>
    );
}