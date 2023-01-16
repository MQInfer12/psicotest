import styled from "styled-components";
import { theme } from "../globals/themes";

export const DivEntero = styled.div`
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  color: ${theme.textPrincipal};
  font-size: 16px;
  font-weight: 300;
`;