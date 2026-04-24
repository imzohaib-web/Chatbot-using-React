import { useEffect, useState } from 'react';
import { ChatInput } from './assets/components/ChatInput';
import  ChatMessages  from './assets/components/ChatMessages';
import './App.css'

  
   function App() {
    
        const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [
          { message: 'hello chatbot', sender: 'user', id: 'id1' },
          { message: 'how can i help you', sender: 'robot', id: 'id2' },
          { message: "can you get me today's date", sender: 'user', id: 'id3' },
          { message: 'Today is February 22', sender: 'robot', id: 'id4' }
        ]);

        useEffect(()=>{
          localStorage.setItem('messages', JSON.stringify(chatMessages));
        }, [chatMessages]);

        return (
          <>
            <div className="chat-header">💬 Chatbot</div>
            <ChatMessages chatMessages={chatMessages} />
            <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
          </>
        );
      }


export default App;
