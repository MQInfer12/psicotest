import React from 'react';
import StatsPhone from '../../assets/landing/statsPhone.png';
import { ColumnContainer, FeatureContainer, FeatureDescription, FeatureIndex, 
  FeatureLine, FeatureTitle, IndexContainer, MakeYourTests, 
  PurpleDiv, SecondInfoContainer, SecondSectionContainer, YouDecide 
} from '../../styles/pages/landing';

const SecondSection = () => {
  return (
    <SecondSectionContainer>
      <ColumnContainer>
        <PurpleDiv>
          <YouDecide>Conócete.</YouDecide>
          <img src={StatsPhone} />
        </PurpleDiv>
      </ColumnContainer>
      <ColumnContainer>
        <SecondInfoContainer>
          <MakeYourTests>Realiza tus tests</MakeYourTests>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>01</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Mayor eficacia</FeatureTitle>
              <FeatureDescription>Es muy sencillo, solamente ingresa a tu cuenta y empieza.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>02</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Autoconócete</FeatureTitle>
              <FeatureDescription>Selecciona un test que te asignaron. ¡Te sorprenderán tus respuestas!.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
          <FeatureContainer>
            <IndexContainer>
              <FeatureIndex>03</FeatureIndex>
              <FeatureLine></FeatureLine>
            </IndexContainer>
            <IndexContainer>
              <FeatureTitle>Relaciónate</FeatureTitle>
              <FeatureDescription>Conversa y obtén citas con tus psicólogos asignados.</FeatureDescription>
            </IndexContainer>
          </FeatureContainer>
        </SecondInfoContainer>
      </ColumnContainer>
    </SecondSectionContainer>
  )
}

export default SecondSection