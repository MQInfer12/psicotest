import styled from "styled-components";
import { theme } from "./themes";

export const AnswersContainer = styled.div`
  height: ${props => props.height ? props.height : "100%"};
  max-width: ${props => props.maxw};
  box-shadow: 0px 8px 34px rgba(${theme.textDarkRGB}, 0.1);
  background-color: ${theme.backgroundTable};
  border-radius: ${props => !props.noRadius && "10px"};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.spaceBetween && "space-between"};
  min-height: 68px;
  padding: 0px 20px;
  gap: 16px;
  overflow: auto;

  & > .buttons {
    display: flex;
    gap: 5px;
  }

  &::-webkit-scrollbar {
    height: 2px;
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.textPrincipal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colorPrincipal};
  }
`;

export const TwoRows = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

export const TableContainer = styled.div`
  height: 100%;
  overflow-x: ${props => props.hideX && "hidden"};
  overflow-y: ${props => props.scrollable && "scroll"};
  overflow-x: ${props => props.scrollableX && "auto"};
  position: relative;

  &::-webkit-scrollbar {
    height: 2px;
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.textPrincipal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colorPrincipal};
  }
`;

export const TBodyScrollable = styled.tbody`
  display: block;
  overflow-y: scroll;
  height: ${props => props.alto};
  width: 622px;

  & > tr {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.textPrincipal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colorPrincipal};
  }
`;

export const TableAnswers = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  overflow: scroll;

  & > thead {
    height: 40px;
    background-color: ${theme.backgroundTable};
    box-shadow: ${props => props.sticky && "0px 4px 4px rgba(" + theme.textDarkRGB + ", 0.1)"};
    position: ${props => props.sticky && "sticky"};
    top: ${props => props.sticky && "0"};
    z-index: ${props => props.sticky && "1"};
  }

  & > thead > tr > th {
    height: ${props => props.inReactivoCreator && "40px"};
  }
`;

export const ThNumberal = styled.th`
  font-size: 11px;
  color: ${theme.textDark};
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
`;

export const ThAnswer = styled.th`
  width: ${(props) => props.w};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: ${props => props.center ? "center" : "start"};
  border-left: ${props => props.border && "1px solid " + theme.textPrincipal};
  border-right: ${props => props.border && "1px solid " + theme.textPrincipal};
  color: ${theme.textDark};
  overflow: hidden;
`;

export const ThNumber = styled.th`
  border: ${props => props.mini && "1px solid " + theme.backgroundTable};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.textDark};
  padding-left: 11px;
  width: 47px;
  text-align: start;
  position: relative;
`;

export const DivDouble = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  text-align: start;
`;

export const DivCenter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PNombre = styled.p`
  font-size: 14px;
  color: ${theme.textDark};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PLight = styled.p`
  color: ${theme.textPrincipal};
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PLightDouble = styled.p`
  text-align: ${props => props.center ? "center" : "start"};
  padding-right: 10px;
  color: ${theme.textPrincipal};
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const PPuntaje = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${theme.textDark};
  width: 100%;
  text-align: end;
`;

export const PSobre = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${theme.textPrincipal};
  width: 100%;
  text-align: end;
`;

export const ResponsiveTr = styled.tr.attrs(props => ({
    style: {
      height: props.rowHeight
    }
  }))`
  height: 56px;
  max-width: 622px;
  background-color: ${theme.principal};
  position: relative;
  text-align: center;

  &:nth-child(2n) {
    background-color: ${theme.backgroundTable};
  }

  filter: ${props => props.selectedPregunta && "opacity(0.5)"};
  &:hover > td {
    transition: ${props => props.inTestCreator && "padding-right 0.3s"};
    padding-right: ${props => props.inTestCreator && "90px"};

    & > div {
      transform: ${props => props.inTestCreator && "translateX(0)"};
    }
  }

  &:hover .buttons {
    transform: translateX(-56px);
  }
`;

export const ButtonReactivosTr = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: -1;
  transition: all 0.2s;
`