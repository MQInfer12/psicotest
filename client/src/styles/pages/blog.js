import styled from "styled-components";
import { theme } from "../globals/themes";

export const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: ${props => props.height};
`;

export const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.textDark};
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
  flex-wrap: ${props => props.fwrap ? "wrap" : "nowrap"};
  gap: 20px;

  @media (max-width: 1020px) {
    justify-content: space-around;
  }
`;

// ARTICLE CARD

export const ArticleCardContainer = styled.div`
  min-width: 322px;
  max-width: 322px;
  background-color: ${theme.principal};
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid ${theme.colorPrincipal};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ArticleCardH2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  color: ${theme.textDark};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ArticleCardP = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${theme.textDark};
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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