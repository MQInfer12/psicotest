import styled from "styled-components";

export const ProfileContainer = styled.div`
  min-height: ${props => props.height};
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
`;

export const UpContainer = styled.div`
  height: 200px;
  border-bottom: 0.5px solid #ada7a7;
  padding: 31px 0px 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PDetalles = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: rgba(62, 67, 93, 0.5);
`;

export const DownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 26px 40px 26px;
  gap: 24px;
`;

export const InputsContainer = styled.div`
  display: flex;
  gap: 44px;
  justify-content: space-around;

  @media (max-width: 1050px) {
    gap: 16px;
    flex-direction: column;
  }
`;

export const DivButtonsDown = styled.div`
  display: flex;
  gap: 12px;
`;

// PHOTO

export const DivPhoto = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const DivPhotoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DivPhotoButtons = styled.div`
  display: flex;
  gap: 20px;
`;

export const DivFile = styled.div`
  position: relative;
`;

export const InputFile = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

export const InfoPhotoExtensions = styled.p`
  font-size: 15px;
  color: #ada7a7;
`;