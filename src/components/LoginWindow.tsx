import { useState } from 'react';
import socket from '../utils/sockets';

interface LoginWindowProps {
  setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>,
  setToken: React.Dispatch<React.SetStateAction<string>>
};

const LoginWindow = ({ setIsLoggedIn, setToken } : LoginWindowProps) => {
  const [username, setUsername] = useState('');

  const login = (event : React.FormEvent) => {
    event.preventDefault();
    socket.on('authenticate', (arg:any) => {
      setToken(arg);
    });
    socket.emit('authenticate', username);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>Quchat</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event : React.FormEvent<HTMLInputElement>) => {
            setUsername(event.currentTarget.value);
          }}
        />
        <button>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginWindow;
