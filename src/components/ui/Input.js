import styled from "styled-components";

export const Input = styled.input`
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  min-width: 0;
`;

export const Select = styled.select`
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
`;

export const Label = styled.label`
  font-size: var(--text-sm);
  color: var(--muted);
`;

