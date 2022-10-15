import React from "react";
import styled from "styled-components";
import PhotoDefault from "../../images/defaultPhoto.jpg";
const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      background-color: white;
      padding: 10px 20px;
      border-radius: 0px 10px 10px 10px;
      max-width: max-content;
    }

    img {
      width: 50%;
    }
  }
  &.owner {
    flex-direction: row-reverse;

    .messageContent {
      align-items: flex-end;
      p {
        background-color: #8da4f1;
        color: white;
        border-radius: 10px 0px 10px 10px;
      }
    }
  }
`;

const Message = () => {
  return (
    <Container className="owner">
      <div className="messageInfo">
        <img src={PhotoDefault} alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src={PhotoDefault} alt="" />
      </div>
    </Container>
  );
};

export default Message;
