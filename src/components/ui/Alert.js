import styled, { css } from "styled-components";

const variants = {
  error: css`
    background: #ffe6e6;
    border-color: #ffb3b3;
    color: #b30000;
  `,
  success: css`
    background: #e6ffed;
    border-color: #8ce1a5;
    color: #166534;
  `,
  warning: css`
    background: #fff7e6;
    border-color: #ffd699;
    color: #92400e;
  `,
};

const Alert = styled.div`
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  ${({ $variant }) => ($variant && variants[$variant]) || null}
`;

export default Alert;

