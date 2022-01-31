import styled from 'styled-components';
import { Message } from '../utils/types';
import MessageText from './MessageText';

interface ContainerProps {
  message: Message;
}

const Container = styled.div<ContainerProps>`
  padding-top: .5em;
  opacity: ${props => props.message.username === '@system' ? .5 : 1};
`;

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <Container message={message}>
      <b>{message.username}: </b>
      <MessageText text={message.message} />
    </Container>
  );
};

export default ChatMessage;
