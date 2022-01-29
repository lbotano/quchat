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
  width: 600px;
  max-width: 100vw;
  height: 600px;
  max-height: 100vh;
  overflow: hidden;
  background: ${props => props.theme.window.color};
  border-radius: ${props => props.theme.window.borderRadius};
  backdrop-filter: ${props => props.theme.window.filter};
`;

const Header = styled.header`
  flex: 0;
  border-bottom: ${props => props.theme.border};
  text-align: center;
  user-select: none;
  cursor: pointer;

  h1 {
    font-size: 1rem;
  }
`;

const Main = styled.div`
  height: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Chat = styled.div`
  height: 0;
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
  const [showRoomList, setShowRoomList] = useState<boolean>(false);

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
      <Header onClick={() => setShowRoomList(!showRoomList)}>
        <h1>#{room}</h1>
      </Header>
      <Main>
        {
          showRoomList
            ? <RoomList rooms={rooms} selectedRoom={room} setSelectedRoom={setRoom} />
            : null
        }
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
