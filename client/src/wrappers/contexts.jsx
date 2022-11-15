import React from 'react'
import { ChatContextProvider } from '../context/chatContext';
import { ModalContextProvider } from '../context/modalContext';
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
              <ModalContextProvider>
                { children }
              </ModalContextProvider>
            </ThanksContextProvider>
          </ChatContextProvider>
        </UserFirebaseContextProvider>
      </ProfilePicContextProvider>
    </UserContextProvider>
  )
}

export default Contexts;