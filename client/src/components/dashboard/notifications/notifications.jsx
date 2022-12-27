import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserFirebaseContext } from '../../../context/userFirebaseContext';
import { db } from '../../../firebase';
import { NotificationsContainer, NotNumber, Nots, UpbarNot } from '../../../styles/pages/dashboard';
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