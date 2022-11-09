import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../../context/chatContext';

const MessageNotification = ({ setShowNots, not }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ChatContext);

  const handleClick = () => {
    setShowNots(false);
    dispatch({type: "SET_USER", payload: { email: not.email }});
    navigate("/dashboard/chat");
  }

  return (
    <NotContainer>
      <LeftDiv>
        <Line />
        <i className="fa-regular fa-comment"></i>
        <Line />
      </LeftDiv>
      <RightDiv>
        <TitleNot>{not.cant} mensaje de {not.email}</TitleNot>
        <DescripNot>
          <LinkSpan onClick={handleClick}>Ver mensaje</LinkSpan>
        </DescripNot>
      </RightDiv>
    </NotContainer>
  )
}

export default MessageNotification

const NotContainer = styled.div`
  height: 72px;
  display: flex;
  gap: 20px;
  padding: 0 20px;
`;

const LeftDiv = styled.div`
  width: 32px;
  height: 100%;
  font-size: 20px;
  color: #D9D9D9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Line = styled.div`
  width: 0;
  height: 15px;
  border-left: 1px solid rgb(217, 217, 217, 0.4);
`;

const RightDiv = styled.div`
  width: calc(100% - 52px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
`;

const TitleNot = styled.h5`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #3E435D;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescripNot = styled.p`  
  font-size: 14px;
  font-weight: 400;
  color: #ADA7A7;
  user-select: none;
`;

const LinkSpan = styled.button`
  position: relative;
  color: #670ce3;
  cursor: pointer;
  text-decoration: none;
  background-color: transparent;
  border: none;

  &::after {
    content: "";
    width: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 1px solid #670ce3;
    transition: all 0.2s;
  }

  &:hover::after {
    width: 100%;
  }
`;