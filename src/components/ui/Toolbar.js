import styled from "styled-components";
import Card from "./Card";

const Toolbar = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${({ $gap = "var(--space-3)" }) => $gap};
  padding: var(--space-2) var(--space-3);
`;

export default Toolbar;

