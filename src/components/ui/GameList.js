import styled from "styled-components";

const GameList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin: var(--space-3);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
`;

export default GameList;

