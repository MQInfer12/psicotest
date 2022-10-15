import React from "react";
import styled from "styled-components";
import DefaultPhoto from "../../images/defaultPhoto.jpg";
const Container = styled.div`
  border-bottom: 1px solid gray;
  .searchForm {
    padding: 10px;
    input {
      background-color: transparent;
      border: none;
      color: white;
      outline: none;
      &::placeholder {
        color: lightgray;
      }
    }
  }
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
const Search = () => {
  return (
    <Container>
      <div className="searchForm">
        <input type="text" placeholder="Encontrar usuario" />
      </div>
      <div className="userChat">
        <img src={DefaultPhoto} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </Container>
  );
};

export default Search;
