import { useState } from 'react';
import styled from 'styled-components';
import socket from '../utils/sockets';

interface LoginWindowProps {
  setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>,
  setToken: React.Dispatch<React.SetStateAction<string>>
};

const Container = styled.div`
  background: ${props => props.theme.window.color};
  border-radius: ${props => props.theme.window.borderRadius};
  backdrop-filter: ${props => props.theme.window.filter};
  padding: 2.5rem;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 900;
  margin: 0;
  padding-bottom: 2.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  background: ${props => props.theme.window.color};
  border-radius: ${props => props.theme.element.borderRadius};
  border: none;
  color: ${props => props.theme.txtClr};
  font-size: 1rem;
  padding: .5em 1em;
  margin-bottom: 1rem;

  &:focus {
    outline: solid 3px ${props => props.theme.borderColor};
  }
`;

const Button = styled.button`
  background: ${props => props.theme.accentClr};
  color: ${props => props.theme.txtClr};
  font-weight: 700;
  font-size: 1rem;
  border-radius: ${props => props.theme.element.borderRadius};
  border: none;
  padding: .5em 1em;
  cursor: pointer;
  transition: background .2s;

  &:hover {
    background: ${props => props.theme.element.background.hover};
  }
`;

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
    <Container>
      <Title>Quchat</Title>
      <Form onSubmit={login}>
        <TextInput
          type="text"
          placeholder="Username"
          autoFocus
          value={username}
          onChange={(event : React.FormEvent<HTMLInputElement>) => {
            setUsername(event.currentTarget.value);
          }}
        />
        <Button>
          Log in
        </Button>
      </Form>
    </Container>
  );
};

export default LoginWindow;
