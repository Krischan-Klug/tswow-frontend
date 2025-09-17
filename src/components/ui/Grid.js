import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols = 2 }) => `repeat(${$cols}, 1fr)`};
  gap: ${({ $gap = "var(--space-4)" }) => $gap};
`;

export default Grid;

