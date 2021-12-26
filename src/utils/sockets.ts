import { io } from 'socket.io-client';

const socket = process.env.REACT_APP_STAGE === 'prod'
  ? io()
  : io(String(process.env.REACT_APP_SOCKET_URL), { transports: ['websocket'] });

export default socket;
