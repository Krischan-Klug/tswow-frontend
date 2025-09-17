import styled, { css } from "styled-components";

export const Muted = styled.span`
  color: var(--muted);
`;

export const Pre = styled.pre`
  margin: 0;
  ${({ $wrap }) => ($wrap ? css`white-space: pre-wrap;` : null)}
`;

export const Center = styled.div`
  text-align: center;
`;

