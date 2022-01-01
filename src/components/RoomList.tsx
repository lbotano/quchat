import styled from 'styled-components';
import socket from '../utils/sockets';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
`;

interface RoomButtonProps {
  room: string;
  selectedRoom: string;
};

const RoomButton = styled.button<RoomButtonProps>`
  background: ${props => (props.selectedRoom === props.room ? props.theme.accentClr : 'none')};
  transition: background .1s;
  border: none;
  color: ${props => props.theme.txtClr};
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  padding: .8rem;
  min-width: 10rem;
  cursor: pointer;

  :hover {
    background: ${props => (props.selectedRoom === props.room ? props.theme.accentClr : props.theme.borderColor)};
  }
`;

interface RoomListProps {
  rooms: string[];
  selectedRoom: string;
  setSelectedRoom: (room: string) => void;
};

const RoomList = ({ rooms, selectedRoom, setSelectedRoom }: RoomListProps) => {
  return (
    <Container>
      {
        rooms.map((room) => (
          <RoomButton
            key={room}
            room={room}
            selectedRoom={selectedRoom}
            onClick={() => {
              socket.emit('joinRoom', room);
              setSelectedRoom(room);
            }}
          >
            #{room}
          </RoomButton>
        ))
      }
    </Container>
  );
};

export default RoomList;
