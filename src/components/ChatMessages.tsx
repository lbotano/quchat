import { Message } from '../utils/types';
import ChatMessage from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[]
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div>
      {
        messages.map((message: Message, i: number) => (
          <ChatMessage message={message} key={i} />
        ))
      }
    </div>
  );
};

export default ChatMessages;
