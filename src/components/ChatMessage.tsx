import { Message } from '../utils/types';

interface ChatMessageProps {
  message: Message
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div>
      <b>{message.username}:</b>
      <span>{message.message}</span>
    </div>
  );
};

export default ChatMessage;
