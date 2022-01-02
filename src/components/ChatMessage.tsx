import styled from 'styled-components';
import { Message } from '../utils/types';

const Container = styled.div`
  padding-top: .5em;
`;

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <Container>
      <b>{message.username}: </b>
      <span>{message.message}</span>
    </Container>
  );
};

export default ChatMessage;
