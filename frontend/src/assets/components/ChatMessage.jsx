import  RobotProfileImage from '../robot.png'
import  UserProfileImage from '../user.png';
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css';

function ChatMessage({ message, sender }) {
  return (
    <div className={`chat-message ${sender}`}>
      {sender === 'robot' && <img src={RobotProfileImage} alt="robot" />}
      <div className="bubble">
        {sender === 'robot' ? (
          <ReactMarkdown>{message}</ReactMarkdown>
        ) : (
          message
        )}
      </div>
      {sender === 'user' && <img src={UserProfileImage} alt="user" />}
    </div>
  );
}

export default ChatMessage;