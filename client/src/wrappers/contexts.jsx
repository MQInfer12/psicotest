import React from 'react'
import { ChatContextProvider } from '../context/chatContext';
import { ProfilePicContextProvider } from '../context/profilePicContext';
import { UserContextProvider } from '../context/userContext';
import { UserFirebaseContextProvider } from '../context/userFirebaseContext';

const Contexts = ({ children }) => {
  return (
    <UserContextProvider>
      <ProfilePicContextProvider>
        <UserFirebaseContextProvider>
          <ChatContextProvider>
            { children }
          </ChatContextProvider>
        </UserFirebaseContextProvider>
      </ProfilePicContextProvider>
    </UserContextProvider>
  )
}

export default Contexts;