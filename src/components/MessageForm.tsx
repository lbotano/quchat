import { useState } from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';

const Container = styled.form`
  display: flex;
  flex: 0;
`;

const ChatInput = styled.input`
  width: auto;
  display: block;
  flex: 1;
  font-size: 1rem;
  color: ${props => props.theme.txtClr};
  background: ${props => props.theme.window.color};
  border: none;
  border-radius: ${props => props.theme.element.borderRadius};
  padding: .3em 1em;
  margin-right: 1em;
  transition: outline .05s ease-in-out;
  outline: 0px solid ${props => props.theme.borderColor};

  &:focus {
    outline-width: 3px;
  }
`;

const SendButton = styled.button`
  background: ${props => props.theme.element.background.normal};
  border: none;
  border-radius: ${props => props.theme.element.borderRadius};
  padding: .5em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background .2s;

  &:hover {
    background: ${props => props.theme.element.background.hover};
  }

  &:active {
    background: ${props => props.theme.element.background.active};
  }
`;

interface MessageFormProps {
  sendMessage: (message: string) => void;
}

const MessageForm = ({ sendMessage }: MessageFormProps) => {
  const [message, setMessage] = useState('');

  return (
    <Container onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      sendMessage(message);
      setMessage('');
    }}>
      <ChatInput
        type="text"
        placeholder="Your message."
        autoFocus
        value={message}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setMessage(event.currentTarget.value);
        }}
      />
      <SendButton>
        <Icon
          path={mdiSend}
          title="Send message"
          size={0.6}
          color='#fff'
        />
      </SendButton>
    </Container>
  );
};

export default MessageForm;
