import { useState, useEffect } from 'react';
import socket from './utils/sockets';
import Loading from './components/Loading';
import ChatWindow from './components/ChatWindow';
import LoginWindow from './components/LoginWindow';

const App = () => {
  const [isConnected, setIsConnected] = useState(() => socket.connected);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]);
  const [room, setRoom] = useState('general');

  // Get the list of available chat rooms
  useEffect(() => {
    socket.on('getRooms', (rooms: string[]) => {
      setRooms(rooms);
    });
    socket.emit('getRooms');
  }, []);

  // Update the state when connecting or disconnecting from the server
  socket.on('connect', () => {
    console.log('Connected!');
    setIsConnected(true);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected!');
    setIsConnected(false);
  });

  // Show loading screen while connecting to the server
  if (!isConnected) {
    return <Loading />;
  }

  // Show the login screen if the user is not logged in.
  // Otherwise, display the chat window.
  return isLoggedIn
    ? <ChatWindow rooms={rooms} room={room} setRoom={setRoom} />
    : <LoginWindow
      setIsLoggedIn={setIsLoggedIn} />;
};

export default App;
