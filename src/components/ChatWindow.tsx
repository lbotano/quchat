import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Message } from '../utils/types';
import socket from '../utils/sockets';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import RoomList from './RoomList';
import MessageForm from './MessageForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 100vw;
  height: min(600px, 100%);
  overflow: hidden;
  background: ${props => props.theme.window.color};
  border-radius: ${props => props.theme.window.borderRadius};
  backdrop-filter: ${props => props.theme.window.filter};
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

  const setSelectedRoom = (newRoom: string) => {
    setRoom(newRoom);
    setMessages(
      [
        {
          username: '@system',
          message: `You are now in room #${newRoom}`
        }, ...messages
      ]
    );
  };

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
      <ChatHeader
        showRoomList={showRoomList}
        setShowRoomList={setShowRoomList}
        currentRoom={room}
      />
      <Main>
        {
          showRoomList
            ? <RoomList rooms={rooms} selectedRoom={room} setSelectedRoom={setSelectedRoom} />
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
