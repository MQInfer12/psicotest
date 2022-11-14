import styled from "styled-components";

export const PurpleTextLoader = styled.div`
  position: relative;
  border-radius: 2px;
  height: 20px;
  width: ${props => props.width};
  background-color: #660BE1;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    width: 40px;
    height: 20px;
    background: linear-gradient(90deg, rgba(102,11,225,1) 0%, rgba(192,170,222,1) 45%, rgba(192,170,222,1) 55%, rgba(102,11,225,1) 100%);
    position: absolute;
    top: 0;
    animation: animatePTL 1.5s infinite;

    @keyframes animatePTL {
      0% {
        transform: translate(-40px);
      }
      100% {
        transform: translate(${props => props.width});
      }
    }
  }
`;

export const TextLoaderContainer = styled.div`
  width: 100%;
  align-items: center;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const GrayTextLoader = styled.div`
  position: relative;
  border-radius: 2px;
  height: ${props => props.fontSize};
  max-width: ${props => props.width};
  width: 100%;
  background-color: #e9e9e9;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    width: 40px;
    height: 20px;
    background: linear-gradient(90deg, rgba(233,233,233,1) 0%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, rgba(233,233,233,1) 100%);
    position: absolute;
    top: 0;
    animation: animateGTL 1.5s infinite;

    @keyframes animateGTL {
      0% {
        transform: translate(-40px);
      }
      100% {
        transform: translate(${props => props.width});
      }
    }
  }
`;

export const BlackTextLoader = styled.div`
  position: relative;
  border-radius: 2px;
  height: ${props => props.fontSize};
  width: ${props => props.width};
  background-color: #c4c4c4;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    width: 40px;
    height: 100%;
    background: linear-gradient(90deg, rgba(196,196,196,1) 0%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, rgba(196,196,196,1) 100%);
    position: absolute;
    top: 0;
    animation: animateBTL 1.5s infinite;

    @keyframes animateBTL {
      0% {
        transform: translate(-40px);
      }
      100% {
        transform: translate(${props => props.width});
      }
    }
  }
`;
