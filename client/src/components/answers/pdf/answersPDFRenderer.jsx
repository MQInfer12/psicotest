import React from 'react'
import { PDFViewer, Document } from '@react-pdf/renderer'
import AnswerPage from './answerPage'
import styled from 'styled-components'

const AnswersPDFRenderer = ({ data }) => {
  return (
    <Container>
      <PDFViewer>
        <Document>
          {
            data.map(respuesta => (
              <AnswerPage key={respuesta.id} respuesta={respuesta} />
            ))
          }
        </Document>
      </PDFViewer>
    </Container>
  )
}

export default AnswersPDFRenderer

const Container = styled.div`
  height: 100%;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;