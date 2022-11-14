import React, { useContext, useState } from "react";
import styled from "styled-components";
import DefaultPhoto from "../../assets/profilePic/defaultPhoto.jpg";
import { db } from "../../firebase";
import { UserFirebaseContext } from "../../context/userFirebaseContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
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
const   Search = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(UserFirebaseContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      where("rol", "==", "2")
    );
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

  const handleSelect = async () => {
    //check wheter the group(chat in firestore) exits
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        //create user chats
        if (user.img) {
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              email: user.email,
              img: user.img,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              email: user.email,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }

        if (currentUser.img) {
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              email: currentUser.email,
              img: currentUser.img,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              email: currentUser.email,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setEmail("");
  };

  return (
    <Container>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Encontrar usuario"
          onKeyDown={handleKey}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.img ? user.img : DefaultPhoto} alt="" />
          <div className="userChatInfo">
            <span>{user.email}</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Search;
