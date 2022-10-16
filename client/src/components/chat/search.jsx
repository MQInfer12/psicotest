import React, { useState } from "react";
import styled from "styled-components";
import DefaultPhoto from "../../images/defaultPhoto.jpg";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";
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
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <Container>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Encontrar usuario"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {user && (
        <div className="userChat">
          <img src={DefaultPhoto} alt="" />
          <div className="userChatInfo">
            <span>{user.name}</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Search;
