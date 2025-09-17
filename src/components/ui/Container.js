import styled from "styled-components";

const toPx = (v) => (typeof v === "number" ? `${v}px` : v);

const Container = styled.div`
  max-width: ${({ $max = 720 }) => toPx($max)};
  margin: ${({ $mt = "40px" }) => `${toPx($mt)} auto`};
  padding: 0 var(--space-3);
`;

export default Container;

