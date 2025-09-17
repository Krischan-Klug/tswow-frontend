import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align = "stretch" }) => $align};
  gap: ${({ $gap = "var(--space-3)" }) => $gap};
`;

export default Column;

