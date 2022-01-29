import styled from 'styled-components';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0;
  padding: 0 1em;
  border-bottom: ${props => props.theme.border};
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: background .1s;

  h1 {
    font-size: 1rem;
    flex: 1;
  }

  &:hover {
    background: ${props => props.theme.borderColor};
  }

  &:active {
    background: ${props => props.theme.window.color};
  }
`;

interface ChatHeader {
  showRoomList: boolean;
  setShowRoomList: (showRoomList: boolean) => void;
  currentRoom: string;
}

const ChatHeader = ({ showRoomList, setShowRoomList, currentRoom }: ChatHeader) => {
  return (
    <Container onClick={() => setShowRoomList(!showRoomList)}>
      <Icon path={mdiMenu} size={1} />
      <h1>#{currentRoom}</h1>
    </Container>
  );
};

export default ChatHeader;
