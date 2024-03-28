import styled from 'styled-components';

const HomePageWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5em;
`;

const Description = styled.p`
  color: #666;
  font-size: 1.2em;
`;

const Home = () => {
  return (
    <HomePageWrapper>
      <Title>Welcome !</Title>
      <Description>This is a place where you can ask anything.</Description>
    </HomePageWrapper>
  );
}

export default Home;