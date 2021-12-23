import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import LoginWindow from './components/LoginWindow';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  return (
    isLoggedIn
      ? <ChatWindow token={token} />
      : <LoginWindow
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
        />
  );
}

export default App;
