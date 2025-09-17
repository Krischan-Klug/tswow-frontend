import styled from "styled-components";
import Link from "next/link";

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--foreground);
  font-size: 1.25rem;
  margin: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  &:hover {
    background: rgba(127, 127, 127, 0.08);
    text-decoration: none;
  }
`;

export default NavLink;

