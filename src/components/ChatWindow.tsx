import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Message } from '../utils/types';
import socket from '../utils/sockets';
import ChatMessages from './ChatMessages';

interface ChatWindowProps {
  token : string
};

const Window = styled.div`
  background: #10101073;
  height: min(600px, 100vh);
  width: min(600px, 100vw);
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageForm = styled.form`
`;

const ChatWindow = ({ token } : ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('chat message', { message, token });
  };


  useEffect(() => {
    socket.on('chat message', (payload: Message) => {
      setMessages(m => [...m, payload]);
      setMessage('');
    });
  }, []);

  return (
    <Window>
      <Chat>
        <ChatMessages messages={messages} />
        <MessageForm onSubmit={sendMessage}>
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
        </MessageForm>
      </Chat>
    </Window>
  );
};

export default ChatWindow;
