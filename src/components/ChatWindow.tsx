import { useState } from 'react';
import { Message } from '../utils/types';
import socket from '../utils/sockets';
import ChatMessages from './ChatMessages';

interface ChatWindowProps {
  token : string
};

const ChatWindow = ({ token } : ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('chat message', { message, token });
  };

  const addMessage = (message: Message) => {
    if (message) {
      setMessage('');
      setMessages(messages.concat(message));
    }
  };

  socket.on('chat message', (payload: Message) => addMessage(payload));

  return (
    <div>
      <div>
        <ChatMessages messages={messages} />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Your message."
            value={message}
            onChange={(event : React.FormEvent<HTMLInputElement>) => {
              setMessage(event.currentTarget.value);
            }}
          />
          <button>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
