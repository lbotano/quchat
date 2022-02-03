import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  background: ${props => props.theme.txtClr};
  transform: scale(.5);
  width: 3em;
  height: 3em;
  border-radius: 50%;
  animation: 1s infinite glow ease-in-out;
  margin-bottom: 1.5em;

  @keyframes glow {
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const LoadingText = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

const Loading = () => {
  return (
    <Container>
      <Circle />
      <LoadingText>
        Connecting
      </LoadingText>
    </Container>
  );
};

export default Loading;
