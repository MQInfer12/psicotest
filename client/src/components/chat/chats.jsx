import React from "react";
import styled from "styled-components";
import DefaultPhoto from "../../images/defaultPhoto.jpg";

const Container = styled.div`
  .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #2f2d52;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    .userChatInfo {
      span {
        font-size: 18px;
        font-weight: 500;
      }
      p {
        font-size: 14px;
        color: lightgray;
      }
    }
  }
`;
const Chats = () => {
  return (
    <Container>
      <div className="userChat">
        <img src={DefaultPhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>HELLO</p>
        </div>
      </div>

      <div className="userChat">
        <img src={DefaultPhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>HELLO</p>
        </div>
      </div>

      <div className="userChat">
        <img src={DefaultPhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>HELLO</p>
        </div>
      </div>

      <div className="userChat">
        <img src={DefaultPhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>HELLO</p>
        </div>
      </div>

      <div className="userChat">
        <img src={DefaultPhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>HELLO</p>
        </div>
      </div>
    </Container>
  );
};

export default Chats;
