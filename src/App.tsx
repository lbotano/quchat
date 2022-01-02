import { useState, useEffect } from 'react';
import socket from './utils/sockets';
import ChatWindow from './components/ChatWindow';
import LoginWindow from './components/LoginWindow';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]);
  const [room, setRoom] = useState('general');

  useEffect(() => {
    socket.on('getRooms', (rooms: string[]) => {
      setRooms(rooms);
    });
    socket.emit('getRooms');
  }, []);
  
  return (
    isLoggedIn
      ? <ChatWindow rooms={rooms} room={room} setRoom={setRoom} />
      : <LoginWindow
        setIsLoggedIn={setIsLoggedIn}
      />
  );
};

export default App;
