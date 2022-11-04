import React from 'react'
import { ChatContextProvider } from '../context/chatContext';
import { ProfilePicContextProvider } from '../context/profilePicContext';
import { ThanksContextProvider } from '../context/thanksContext';
import { UserContextProvider } from '../context/userContext';
import { UserFirebaseContextProvider } from '../context/userFirebaseContext';

const Contexts = ({ children }) => {
  return (
    <UserContextProvider>
      <ProfilePicContextProvider>
        <UserFirebaseContextProvider>
          <ChatContextProvider>
            <ThanksContextProvider>
              { children }
            </ThanksContextProvider>
          </ChatContextProvider>
        </UserFirebaseContextProvider>
      </ProfilePicContextProvider>
    </UserContextProvider>
  )
}

export default Contexts;