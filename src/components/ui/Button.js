import styled from "styled-components";

const Button = styled.button`
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
  &:hover:not(:disabled) {
    background: rgba(127, 127, 127, 0.08);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;

