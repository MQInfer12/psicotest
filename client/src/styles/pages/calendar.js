import styled from "styled-components";

// CALENDAR MINI

export const CalendarMiniContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const MonthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 353px;
`;

export const CalendarMonth = styled.h2`
  color: ${props => props.theme.textDark};
  font-size: 36px;
  font-weight: 600;
`;

export const CalendarTable = styled.table`
  text-align: center;
  width: 353px;
  transform: scale(1);
`;

export const DaysThMini = styled.th`
  color: ${props => props.theme.colorPrincipal};
  height: 45px;
  min-width: 45px;
`;

export const DaysTd = styled.td`
  border-radius: 50%;
  position: relative;
  font-size: 13px;
  height: 50px;
  min-width: 50px;
  z-index: 1;
  color: ${(props) => props.theme.textDark};
  color: ${(props) => props.month && "rgba(" + props.theme.textDarkRGB + ", 0.3)"};
  color: ${(props) => props.today && props.theme.textColorPrincipal};
  cursor: pointer;

  &::before {
    content: "";
    opacity: ${props => props.today ? "1" : "0"};
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colorPrincipal};
    border-radius: 50%;
    transform: scale(0.8);
  }

  &::after {
    content: "";
    opacity: ${props => props.hayEventos ? "1" : "0"};
    background-color: ${(props) => props.today ? props.theme.textColorPrincipal : props.theme.colorPrincipal};
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 9px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const MonthButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1.5px solid ${props => props.theme.borders};
  background-color: transparent;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textPrincipal};

  &:hover {
    background-color: ${props => props.theme.colorPrincipal};
  }
`;

export const EventsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  gap: 16px;
  max-width: 500px;
`;

export const EventsTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  color: ${props => props.theme.textDark};
`;

export const DivNothing = styled.div`
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: ${props => props.theme.textPrincipal};
  font-size: 16px;
  font-weight: 300;
`;

// EVENT CARD

export const EventCardContainer = styled.div`
  height: 70px;
  border-radius: 14px;
  background-color: ${props => props.theme.principal};
  color: ${props => props.theme.textDark};
  display: flex;
  align-items: center;
  padding: 8px 30px;
  gap: 30px;
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const EventPoint = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.bgcolor};
`;

export const EventText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

export const EventH4 = styled.h4`
  font-weight: 500;
  font-size: 16px;
`;

export const EventDesc = styled.p`
  font-weight: 400;
  font-size: 12px;
  opacity: 0.4;
`;

// CALENDAR BIG

export const DivCalendarBig = styled.div`
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DivControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TableCalendar = styled.table`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.principal};
  border-radius: 10px;
  table-layout: fixed;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid ${props => props.theme.textSecondary};
  box-shadow: 0px 8px 34px rgba(${props => props.theme.textDarkRGB}, 0.15);
`;

export const DaysThBig = styled.th`
  height: 40px;
  font-size: 18px;
  color: ${props => props.theme.colorPrincipal};
  border: 1px solid ${props => props.theme.borders};
`;

// DAY CARD

export const TdDay = styled.td`
  opacity: ${props => props.month? 0.5 : 1};
  border: 1px solid ${props => props.theme.borders};
`;

export const DivTd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: auto;
  overflow-x: hidden;

  position: relative;
  width: 100%;
  height: 100%;
  font-size: 14px;

  &:hover > div > button {
    display: block;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.textSecondary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colorPrincipal};
  }
`;

export const DivDay = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  min-height: 32px;

  & > button {
    display: none;
    transform: scale(0.8);
  }
`;

export const PDay = styled.p`
  color: ${props => props.today && props.theme.colorPrincipal};
  padding: 1px 10px;
  color: ${props => props.theme.textDark};
`;

// TASK CARD

export const DivTask = styled.div`
  width: 100%;
  background-color: ${props => props.background};
  color: ${props => props.textcolor};
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

// MODAL ACEPTAR CITA

export const DivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 200px;
  max-height: 200px;
  overflow: auto;
`;

export const DivUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.textPrincipal};
`;

// MODAL HORARIO

export const DoubleButton = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  & > button {
    width: 100%;
  }
`;