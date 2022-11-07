import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { UserFirebaseContext } from '../../../context/userFirebaseContext';
import { db } from '../../../firebase';
import MessageNotification from './messageNotification';
import ReportNotification from './reportNotification';

const Notifications = () => {
  const [showNots, setShowNots] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useContext(UserFirebaseContext);

  useEffect(() => {
    if(currentUser?.uid) {
      const unSub = onSnapshot(doc(db, "notifications", currentUser.uid), (doc) => {
        if(doc.exists()) {
          const notificationArray = doc.data().notification;
          notificationArray.sort((a, b) => b.date - a.date)
          setNotifications(notificationArray);
        } 
      });
      return () => {
        unSub();
      };
    }
  }, [currentUser]);

  return (
    <Nots>
      <UpbarNot showNots={showNots} onClick={() => setShowNots(!showNots)}>
        <i className="fa-solid fa-bell"></i>
        {
          !!notifications.length && <NotNumber>{notifications.length}</NotNumber>
        }
      </UpbarNot>
      <NotificationsContainer showNots={showNots}>
        {
          notifications.map((v, i) => (
            <MessageNotification key={i} setShowNots={setShowNots} not={v} />
          ))
        }
        <ReportNotification setShowNots={setShowNots} />
      </NotificationsContainer>
    </Nots>
  )
}

export default Notifications;

const Nots = styled.div`
  position: relative;
`;

const UpbarNot = styled.div`
  min-width: 52px;
  height: 52px;
  border-radius: ${props => props.showNots ? "10px 10px 0 0" : "10px"};
  background-color: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #D9D9D9;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${props => props.showNots && "4px 1px 10px -7px rgba(0,0,0,0.6)"};
  transform: ${props => props.showNots && "translateY(5px)"};
`;

const NotNumber = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #660BE1;
  font-size: 10px;
  color: #FFFFFF;
  display: grid;
  place-content: center;
`;

const NotificationsContainer = styled.div`
  overflow: auto;
  overflow-x: hidden;
  width: 350px;
  min-height: 60px;
  max-height: 300px;
  background-color: #FAFAFA;
  position: absolute;
  top: 52px;
  right: -82px;
  border-radius: 10px;
  box-shadow: 4px 1px 10px -7px rgba(0,0,0,0.6);
  opacity: 1;
  display: ${props => props.showNots ? "block" : "none"};
  transform: translateY(5px);
  animation: appear 0.2s;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #ADA7A7;
  }
  &::-webkit-scrollbar-thumb {
    background: #660BE1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #660BE1;
  }

  @keyframes appear {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateY(5px);
      opacity: 1;
    }
  }
`;