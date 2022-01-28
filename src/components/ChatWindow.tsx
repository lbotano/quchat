import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Message } from '../utils/types';
import socket from '../utils/sockets';
import ChatMessages from './ChatMessages';
import RoomList from './RoomList';
import MessageForm from './MessageForm';

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

interface ChatWindowProps {
  rooms: string[];
  room: string;
  setRoom: (room: string) => void;
}

const ChatWindow = ({ rooms, room, setRoom }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (message: string) => {
    socket.emit('chatMessage', message);
  };

  useEffect(() => {
    socket.on('chatMessage', (payload: Message) => {
      setMessages(m => [payload, ...m]);
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
          <MessageForm
            sendMessage={sendMessage}
          />
        </Chat>
      </Main>
    </Container>
  );
};

export default ChatWindow;
