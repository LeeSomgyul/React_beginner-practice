import styled from "styled-components";

const Father = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Box = styled.div`
  color: ${(props) => props.theme.textColor};
`;



function App() {
  return (
    <Father>
      <Box>
        <h1>안뇽가리</h1>
      </Box>
    </Father>
  );
}

export default App;