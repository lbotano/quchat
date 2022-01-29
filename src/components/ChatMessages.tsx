import { Message } from '../utils/types';
import styled from 'styled-components';
import ChatMessage from './ChatMessage';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  margin-bottom: 1.5rem;
  overflow-y: scroll;
  scrollbar-color:
    ${props => props.theme.txtClr}
    #0000;

  &::-webkit-scrollbar {
    background: #0000;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.txtClr};
    border-radius: 3.5px;
  }
`;

interface ChatMessagesProps {
  messages: Message[]
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <Container>
      {
        messages.map((message: Message, i: number) => (
          <ChatMessage message={message} key={i} />
        ))
      }
    </Container>
  );
};

export default ChatMessages;
