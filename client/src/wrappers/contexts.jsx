import React from 'react'
import { ChatContextProvider } from '../context/chatContext';
import { GetContextProvider } from '../context/getContext';
import { ModalContextProvider } from '../context/modalContext';
import { ThanksContextProvider } from '../context/thanksContext';
import { UserContextProvider } from '../context/userContext';
import { UserFirebaseContextProvider } from '../context/userFirebaseContext';
import { ThemeContextProvider } from '../context/themeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OAuthId } from '../env';

const Contexts = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={OAuthId}>
      <UserContextProvider>
        <UserFirebaseContextProvider>
          <ChatContextProvider>
            <ThanksContextProvider>
              <ModalContextProvider>
                <GetContextProvider>
                  <ThemeContextProvider>
                    { children }
                  </ThemeContextProvider>
                </GetContextProvider>
              </ModalContextProvider>
            </ThanksContextProvider>
          </ChatContextProvider>
        </UserFirebaseContextProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  )
}

export default Contexts;