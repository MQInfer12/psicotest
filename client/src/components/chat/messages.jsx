import React from "react";
import styled from "styled-components";
import Message from "./message";

const Container = styled.div`
  flex: 1;
  border-right: 1px solid #3d3c61;
  background-color: #3e3c61;
  .messages {
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 160px);
    overflow: scroll;
  }
`;

const Messages = () => {
  return (
    <Container>
      <div className="messages">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </Container>
  );
};

export default Messages;
