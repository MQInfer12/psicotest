import React from 'react'
import { Image, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer'
import Logo from '../../../assets/logo/logo.png'
import Poppins400 from "../../../assets/fonts/Poppins-Regular.ttf"
import Poppins600 from "../../../assets/fonts/Poppins-SemiBold.ttf"
import Poppins700 from "../../../assets/fonts/Poppins-Bold.ttf"
import PdfSection from './pdfSection'
import PdfUserData from './pdfUserData'
import PdfTable from './pdfTable'

Font.register({
  family: "Poppins", 
  src: Poppins400,
  fontWeight: 400
});
Font.register({
  family: "Poppins", 
  src: Poppins600,
  fontWeight: 600
})
Font.register({
  family: "Poppins", 
  src: Poppins700,
  fontWeight: 700
})

const AnswerPage = ({ respuesta }) => {
  const now = new Date();
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Logo} />
          <View>
            <Text style={[styles.text, styles.textBig]}>{respuesta.nombre_user}</Text>
            <Text style={[styles.text, styles.textLittle]}>Respuesta a {respuesta.nombre_test}</Text>
          </View>
        </View>
        <Text style={[styles.text, styles.textLittle]}>{`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}</Text>
      </View>
      <PdfSection text="Datos del usuario">
        <PdfUserData respuesta={respuesta} />
      </PdfSection>
      {
        respuesta.estado === 0 ?
        <Text style={[styles.text, styles.textLittle]}>Aún no se resolvió el test</Text> :
        <>
        <PdfSection text="Puntuaciones">
          <PdfTable test={respuesta.test} />
        </PdfSection>
        <PdfSection text="Interpretación">
          <Text style={[styles.text, styles.textLittle, styles.textJustify]}>
          {respuesta.interpretation || "Aún no se realizó una interpretación para esta respuesta"}
          </Text>
        </PdfSection>
        </>
      }
    </Page>
  )
}

export default AnswerPage

export const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingLeft: 56,
    paddingVertical: 8,
    gap: 20
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },
  text: {
    fontSize: 10,
    fontFamily: "Poppins",
    fontWeight: 400
  },
  logoContainer: {
    flexDirection: "row",
    gap: 8
  },
  logo: {
    width: 40
  },
  textBig: {
    fontWeight: 600,
    color: "#660BE1"
  },
  textLittle: {
    opacity: 0.8,
    fontSize: 8,
    lineHeight: 1.6
  },
  textLittlePrimary: {
    fontWeight: 600,
    color: "#660BE1",
    opacity: 0.8,
    fontSize: 8,
    lineHeight: 1.8
  },
  textJustify: {
    textAlign: "justify"
  }
});