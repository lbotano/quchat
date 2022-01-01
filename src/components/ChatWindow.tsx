import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { Message } from '../utils/types';
import socket from '../utils/sockets';
import ChatMessages from './ChatMessages';
import RoomList from './RoomList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.window.color};
  border-radius: ${props => props.theme.window.borderRadius};
  backdrop-filter: ${props => props.theme.window.filter};
  overflow: hidden;
`;

const Header = styled.header`
  flex: 0;
  text-align: center;
  border-bottom: ${props => props.theme.border};

  h1 {
    font-size: 1rem;
  }
`;

const Main = styled.div`
  display: flex;
`;

const Chat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.window.color};
  padding: 1.5rem;
`;

const MessageForm = styled.form`
  display: flex;
`;

const ChatInput = styled.input`
  flex: 1;
  font-size: 1rem;
  color: ${props => props.theme.txtClr};
  background: ${props => props.theme.window.color};
  border: none;
  border-radius: ${props => props.theme.element.borderRadius};
  padding: .3em 1em;
  transition: outline .05s ease-in-out;
  outline: 0px solid ${props => props.theme.borderColor};

  &:focus {
    outline-width: 3px;
  }
`;

const SendButton = styled.button`
  background: ${props => props.theme.element.background.normal};
  border: none;
  border-radius: ${props => props.theme.element.borderRadius};
  padding: .5em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background .2s;

  &:hover {
    background: ${props => props.theme.element.background.hover};
  }

  &:active {
    background: ${props => props.theme.element.background.active};
  }
`;

interface ChatWindowProps {
  rooms: string[];
  room: string;
  setRoom: (room: string) => void;
}

const ChatWindow = ({ rooms, room, setRoom }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('chatMessage', message );
  };

  useEffect(() => {
    socket.on('chatMessage', (payload: Message) => {
      setMessages(m => [payload, ...m]);
      setMessage('');
    });
  }, []);

  return (
    <Container>
      <Header>
        <h1>#{room}</h1>
      </Header>
      <Main>
        <RoomList rooms={rooms} selectedRoom={room} setSelectedRoom={setRoom} />
        <Chat>
          <ChatMessages messages={messages} />
          <MessageForm onSubmit={sendMessage}>
            <ChatInput
              type="text"
              placeholder="Your message."
              autoFocus
              value={message}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setMessage(event.currentTarget.value);
              }}
            />
            <SendButton>
              <Icon
                path={mdiSend}
                title="Send message"
                size={0.6}
                color='#fff'
              />
            </SendButton>
          </MessageForm>
        </Chat>
      </Main>
    </Container>
  );
};

export default ChatWindow;
