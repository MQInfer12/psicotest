import styled from "styled-components";

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: ${props => props.height};
`;

export const TestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1020px) {
    justify-content: space-around;
  }
`;

export const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.textDark};
  padding-left: 10px;
`;

export const DivNothing = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: ${props => props.theme.textPrincipal};
  font-size: 16px;
  font-weight: 300;
`;

// TEST CARD

export const Container = styled.div`
  width: 322px;
  background-color: ${props => props.theme.principal};
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid ${props => props.theme.colorPrincipal};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const H2 = styled.h2`
  height: 60px;
  font-weight: 400;
  font-size: 20px;
  color: ${props => props.theme.textDark};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const P = styled.p`
  height: 72px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${props => props.theme.textDark};
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Span = styled.span`
  font-size: 14px;
  color: rgba(${props => props.theme.textDarkRGB}, 0.4);
  margin-left: 3px;
`;

export const ContainerIcon = styled.div`
  color: ${props => props.theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 8px;

  & > div {
    width: 25px;
    text-align: center;
  }
`;

export const ContainerImg = styled.div`
  height: 43px;
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const CardButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  & > div {
    display: flex;
    gap: 10px;
  }
`;

// MODALS

export const DivChecks = styled.div`
  background-color: ${props => props.theme.backgroundPrincipal};
  max-width: 400px;
  height: 250px;
  max-height: 250px;
  padding: 10px;
  border-radius: 10px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.textPrincipal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colorPrincipal};
  }
`;

export const DivPersonas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow: hidden;
`;

export const DivPersona = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.textPrincipal};
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 1px 5px;
  background-color: ${props => props.theme.principal};
`;

export const CheckboxInput = styled.input`
  accent-color: ${props => props.theme.colorPrincipal};
`;

export const ModalDivButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const DivCenter = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;