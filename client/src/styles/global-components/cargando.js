import styled from "styled-components";

export const CargandoContainer = styled.div`
  height: ${props => props.height};
`;

export const DivLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

export const Loader = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 10px solid;
  border-color: rgba(${props => props.theme.colorPrincipalRGB}, 0.15) rgba(${props => props.theme.colorPrincipalRGB}, 0.25) rgba(${props => props.theme.colorPrincipalRGB}, 0.35) rgba(${props => props.theme.colorPrincipalRGB}, 0.5);
  box-sizing: border-box;
  animation: rotation 1s infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;

export const SpanLoader = styled.span`
  color: ${props => props.theme.textDark};
  text-transform: uppercase;
`;