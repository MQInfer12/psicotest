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
  color: #3E435D;
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
  background-color: #fff;
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid #670ce3;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ArticleCardH2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  color: #000000;
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
  color: #000000;
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