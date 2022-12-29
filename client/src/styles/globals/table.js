import styled from "styled-components";

export const AnswersContainer = styled.div`
  height: ${props => props.height ? props.height : "100%"};
  max-width: ${props => props.maxw};
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #ebf0fa;
  border-radius: 10px;
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
`;

export const TableContainer = styled.div`
  height: 100%;
  overflow-y: hidden;
  overflow-x: ${props => props.hideX ? "hidden" : "auto"};
  overflow: ${props => props.noHide && "visible"};
  overflow-y: ${props => props.resizing && "hidden"};
  overflow-x: ${props => props.resizing && "hidden"};
`;

export const TableAnswers = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;

  & > thead {
    height: 40px;
  }

  & > thead > tr > th {
    height: ${props => props.inReactivoCreator && "40px"};
  }
`;

export const ThNumberal = styled.th`
  font-size: 11px;
  color: #171c26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
`;

export const ThAnswer = styled.th`
  width: ${(props) => props.width};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: ${props => props.center ? "center" : "start"};
  color: #464f60;
  overflow: hidden;
`;

export const ThNumber = styled.th`
  border: ${props => props.mini && "1px solid #ebf0fa"};
  font-size: 14px;
  font-weight: 500;
  color: #171c26;
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
  color: #171c26;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PLight = styled.p`
  color: #687182;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PLightDouble = styled.p`
  text-align: ${props => props.center ? "center" : "start"};
  padding-right: 10px;
  color: #687182;
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
  color: #464f60;
  width: 100%;
  text-align: end;
`;

export const PSobre = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #687182;
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
  background-color: #ffffff;
  position: relative;
  text-align: center;

  &:nth-child(2n) {
    background-color: #ebf0fa;
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