import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${({ $align = "center" }) => $align};
  gap: ${({ $gap = "var(--space-3)" }) => $gap};
`;

export default Row;
