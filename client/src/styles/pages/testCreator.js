import styled from "styled-components";

export const TestCreatorContainer = styled.div`
  height: ${props => props.height};
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  overflow: hidden;
`;

// SECCION CREATOR

export const SeccionContainer = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
`;

export const CreatorsContainer = styled.div`
  min-width: calc(100% - 263px);
  display: flex;
  flex-direction: column;
`;

export const FullScreen = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${props => props.translate * -100}%);
  transition: all 0.7s;
  overflow: hidden;
`;

export const EmptySeccion = styled.p`
  width: 400px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.6;
  text-align: center;
`;

// SECCION SIDEBAR

export const SeccionCreatorDash = styled.div`
  min-width: 263px;
  height: 100%;
  border-left: 1px solid #D9D9D9;
  border-right: 1px solid #D9D9D9;
  display: flex;
  flex-direction: column;
`;

export const DashPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #D9D9D9;
  padding: 12px;
`;

export const DashTitle = styled.h3`
  color: #3E435D;
  font-size: 18px;
  font-weight: 600;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

export const CheckboxDiv = styled.div`
  display: flex;
  gap: 16px;
`;

export const CheckboxInput = styled.input`
  accent-color: #660BE1;
`;

export const PCheckbox = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #ADA7A7;
`;

// PREGUNTA CREATOR

export const PreguntaCreatorContainer = styled.div`
  height: calc(100% - 40px);
  width: 622px;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const DeleteContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const PSelected = styled.p`
  height: max-content;
  font-size: 12px;
  color: #464F60;
`;

  //TABLA

export const TrCargando = styled.tr`
  display: flex;
  width: 622px;
  height: calc(100vh - 400px);
`;

export const TdCargando = styled.td`
  background-color: #FFFFFF;
  display: flex;
  width: 622px;
`;

// PREGUNTA CARD

export const DivButtonsTd = styled.div`
  height: 100%;
  padding-right: 10px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100px);
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
`;

// REACTIVO CREATOR

export const ReactivoCreatorContainer = styled.div`
  height: calc(100% - 40px);
  width: 737px;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const HeadContainer = styled.div`
  width: max-content;
  display: flex;
  gap: 10px;
  align-items: center;
`;

  //TABLA

export const InputNumber = styled.input`
  border: none;
  background-color: ${props => props.blink ? "#660be1" : "transparent"};
  color: ${props => props.blink ? "#FFFFFF" : "auto"};
  text-align: center;
  width: 40%;
  outline: none;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.5s;
`;

// REACTIVO CARD

export const ThReactivo = styled.th`
  position: relative;
  font-weight: 400;
  transition: all 0.2s;

  &:hover {
    & > p {
      background-color: #FFFFFF;
    }

    & > div {
      opacity: 1;
      z-index: 1;
      transform: translateY(-40px);
    }
  }
`;

export const PText = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #EBF0FA;
  z-index: 1;
  transition: all 0.3s;
`;

export const DivReactivoButtonsTd = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  z-index: -1;
  opacity: 0;
`;

// PAGINATION

export const PaginationContainer = styled.div`
  padding: 35px 20px 0px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationCounter = styled.p`
  font-size: 12px;
  letter-spacing: 0.03em;
  color: #687182;
`;

export const ChangePageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const RowsPage = styled.p`
  font-size: 12px;
  color: #687182;
`;

export const ButtonPagContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonChange = styled.button`
  box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.24);
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: #868FA0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

// SECCION INDEX

export const DashIndex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #ADA7A7;
  }

  &::-webkit-scrollbar-thumb {
    background: #660BE1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #660BE1;
  }
`;

export const Details = styled.details`
  font-size: 14px;
  width: 100%;
  text-align: start;
  user-select: none;
  color: #ADA7A7;

  &:hover summary {
    background-color: #EBF0FA;
  }

  & summary {
    padding: 10px 15px;
    cursor: pointer;
    border-bottom: 1px solid #EBF0FA;
    transition: all 0.2s;
  }
`;

export const PreguntasList = styled.ul`
  list-style: none;
  font-size: 12px;

  & li {
    padding: 4px 40px;
    border-bottom: 1px solid #EBF0FA;
    transition: all 0.2s;

    &:hover {
      background-color: #EBF0FA;
    }
  }
`;