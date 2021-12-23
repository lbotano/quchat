import { io } from 'socket.io-client';

const socket = io(String(process.env.REACT_APP_SOCKET_URL), { transports: ['websocket'] });

export default socket;
