import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../../context/chatContext';
import { DescripNot, LinkSpan, NotContainer, LeftDiv, Line, RightDiv, TitleNot } from '../../../styles/pages/dashboard';

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
        <Line/>
        <i className="fa-regular fa-comment"></i>
        <Line/>
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