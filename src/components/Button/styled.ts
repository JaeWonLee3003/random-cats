import styled from "styled-components";
import { ButtonProps } from "./index";

export const StyledButton = styled.button<ButtonProps>`
display: flex;
align-items: center;
padding: 8px 12px;
border: none;
border-radius: 50vh;

${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
color: ${({ color }) => color || '#333'};
${({ pointer }) => pointer && `cursor: pointer;`}
> a {
  display:block;
  text-decoration: none;
  color: inherit;
}
`;