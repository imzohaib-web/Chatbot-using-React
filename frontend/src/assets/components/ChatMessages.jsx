import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css';
function ChatMessages({ chatMessages }) {
        const bottomRef = useRef(null);

        useEffect(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, [chatMessages]);

        return (
          <div className="chat-messages">
            {chatMessages.map((chatMessage) => (
              <ChatMessage
                key={chatMessage.id}
                message={chatMessage.message}
                sender={chatMessage.sender}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        );
      }
export default ChatMessages;