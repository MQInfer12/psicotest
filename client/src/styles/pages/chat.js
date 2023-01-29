import styled from "styled-components";

export const Home = styled.div`
  box-shadow: 0px 8px 34px rgba(${props => props.theme.textDarkRGB}, 0.15);
  height: ${(props) => props.height};
  z-index: 3;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  position: relative;
`;

export const SidebarContainer = styled.div`
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  border-right: 1px solid ${props => props.theme.backgroundChatDark};
  background-color: ${props => props.theme.backgroundChat};
  overflow-x: hidden;
  z-index: 1;
  display: ${props => props.showSide ? "block" : "none"};

  @media (max-width: 1080px) {
    min-width: 100%;
    max-width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.backgroundChatDark};
  height: 45px;
  padding: 10px;
  gap: 10px;
  color: ${props => props.theme.textColorPrincipal};

  @media (max-width: 1080px) {
      flex-direction: column;
      height: auto;
    }
  .logo {
    font-weight: bold;

  }

  .username{
    @media (max-width: 1564px) {
      display: none;
    }
  }
  .user {
    display: flex;
    gap: 10px;

    button {
      background-color: ${props => props.theme.backgroundChatDark};
      color: ${props => props.theme.backgroundTable};
      font-size: 10px;
      border: none;
      cursor: pointer;
      @media (max-width: 768px) {
        position: absolute;
        bottom: 10px;
      }
    }
  }
`;

export const ChatsContainer = styled.div`
  height: calc(100% - 50px);
  .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${props => props.theme.textColorPrincipal};
    cursor: pointer;
    width: 100%;

    &>div:first-child{
      min-width: 50px;
    }
    &:hover {
      background-color: ${props => props.theme.backgroundChatDark};
    }

    .userChatInfo {
      span {
        font-size: 18px;
        font-weight: 500;
      }
      p {
        font-size: 14px;
        color: ${props => props.theme.textColorPrincipal};
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const ChatComContainer = styled.div`
  width: ${(props) => (props.showSide ? "calc(100% - 350px)" : "100%")};

  .chatInfo {
    background-color: ${props => props.theme.backgroundChatDark};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: ${props => props.theme.textColorPrincipal};
    height: 45px;
  }

  .chatIcons {
    display: flex;
    gap: 10px;

    img {
      height: 24px;
      cursor: pointer;
      z-index: 2;
    }
  }

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

export const MessagesContainer = styled.div`
  background-color: ${props => props.theme.backgroundTable};
  padding: 10px;
  height: calc(100% - 95px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.principal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colorPrincipal};
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  .messageInfo {
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.textPrincipal};
    align-items: center;
    font-weight: 300;
  }
  
  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;

    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: ${props => props.theme.principal};
      color: ${props => props.theme.textDark};
      padding: 10px 20px;
      border-radius: 0px 10px 10px 10px;
    }

    img {
      width: 50%;
    }
  }

  &.owner {
    flex-direction: row-reverse;

    .messageContent {
      align-items: flex-end;

      p {
        background-color: ${props => props.theme.colorPrincipalLighter};
        color: ${props => props.theme.textColorPrincipal};
        border-radius: 10px 0px 10px 10px;
      }
    }
  }
`;

export const InputComp = styled.div`
  height: 50px;
  background-color: ${props => props.theme.principal};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    border: none;
    outline: none;
    color: ${props => props.theme.textPrincipal};
    font-size: 18px;
    background-color: ${props => props.theme.principal};

    &::placeholder {
      color: ${props => props.theme.textPrincipal};
    }
  }
  
  .send {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      height: 24px;
      cursor: pointer;
    }

    button {
      border: none;
      padding: 10px 15px;
      color: ${props => props.theme.textColorPrincipal};
      background-color: ${props => props.theme.colorPrincipalLighter};
      cursor: pointer;
      border-radius: 10px;
    }
  }
`;