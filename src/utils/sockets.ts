import { io } from 'socket.io-client';

// In production the socket server will run from the same location
// as the HTTP server (window.location)
const socket = process.env.REACT_APP_STAGE === 'prod'
  ? io()
  : io(String(process.env.REACT_APP_SOCKET_URL), { transports: ['websocket'] });

export default socket;
