import React from "react";
import styled from "styled-components";
import Message from "./message";

const Container = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  height: calc(100% - 160px);
  overflow: scroll;
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
