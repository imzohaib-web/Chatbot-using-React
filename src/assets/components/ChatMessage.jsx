import  RobotProfileImage from '../robot.png'
import  UserProfileImage from '../user.png';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
        return (
          <div className={`chat-message ${sender}`}>
            {sender === 'robot' && <img src={RobotProfileImage} alt="robot" />}
            <div className="bubble">{message}</div>
            {sender === 'user' && <img src= {UserProfileImage} alt="user" />}
          </div>
        );
      }