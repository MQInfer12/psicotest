import styled from "styled-components";

export const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: ${props => props.height};
`;

export const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.textDark};
  padding-left: 10px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// ARTICLE RESPONSE

export const ArticleContainer = styled.div`
  display: flex;
  flex-wrap: ${props => !props.inLanding ? "wrap" : "nowrap"};
  gap: 20px;

  @media (max-width: 1020px) {
    justify-content: ${props => !props.inLanding && "space-around"};
  }
`;

export const DivNothing = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: ${props => props.theme.textPrincipal};
  font-size: 16px;
  font-weight: 300;
  width: 100%;
  text-align: center;
`;

export const SearchSelect = styled.select`
  width: 150px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px;
  border-radius: 6px;
  outline: none;
  border: 1px solid ${props => props.theme.borders};
  color: ${props => props.theme.textPrincipal};
  background-color: ${props => props.theme.principal};
`;

// ARTICLE CARD

export const ArticleCardContainer = styled.div`
  min-width: 322px;
  max-width: 322px;
  min-height: ${props => !props.inLanding ? "378.33px" : "334.33px"};
  max-height: ${props => !props.viewMore && (!props.inLanding ? "378.33px" : "334.33px")};
  background-color: ${props => props.theme.principal};
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid ${props => props.theme.colorPrincipal};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0px 4px 16px rgba(${props => props.theme.textDarkRGB}, 0.05);

  & > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const ArticleCardH2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  color: ${props => props.theme.textDark};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 60px;
`;

export const ArticleCardP = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  min-height: 48px;
  color: ${props => props.theme.textDark};
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${props => !props.viewMore && "-webkit-box"};
  -webkit-line-clamp: ${props => !props.viewMore && "2"};
  -webkit-box-orient: ${props => !props.viewMore && "vertical"};
`;

export const VerMasButton = styled.button`
  background: linear-gradient(0deg, rgba(${props => props.theme.colorPrincipalRGB}, 0.2) 0%, rgba(${props => props.theme.principalRGB},1) 90%);
  border-radius: 8px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.textPrincipal};
  cursor: pointer;
  transition: color 0.4s;
  user-select: none;
  padding: 2px;

  & > i {
    transform: translateY(0x);
    animation: updown 2s ease-in-out infinite;
  }

  &:hover {
    color: ${props => props.theme.textDark};
  }

  @keyframes updown {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-2px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export const CardButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  & > div {
    display: flex;
    gap: 10px;
  }
`;

// MODAL BLOG

export const DivFile = styled.div`
  position: relative;
`;

export const InputFile = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;