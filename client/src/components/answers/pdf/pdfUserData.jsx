import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from './answerPage'

const PdfUserData = ({ respuesta }) => {
  return (
    <View style={s.container}>
      <View style={s.largeColumn}>
        <View style={s.dataContainer}>
          <Text style={[styles.text, styles.textLittlePrimary]}>Nombre: </Text>
          <Text style={[styles.text, styles.textLittle]}>{respuesta.nombre_user}</Text>
        </View>
        <View style={s.dataContainer}>
          <Text style={[styles.text, styles.textLittlePrimary]}>Correo: </Text>
          <Text style={[styles.text, styles.textLittle]}>{respuesta.email_user}</Text>
        </View>
      </View>
      <View style={s.column}>
        <View style={s.dataContainer}>
          <Text style={[styles.text, styles.textLittlePrimary]}>Edad: </Text>
          <Text style={[styles.text, styles.textLittle]}>{respuesta.edad}</Text>
        </View>
        <View style={s.dataContainer}>
          <Text style={[styles.text, styles.textLittlePrimary]}>Género: </Text>
          <Text style={[styles.text, styles.textLittle]}>{respuesta.genero?.charAt(0).toUpperCase() + respuesta.genero?.slice(1)}</Text>
        </View>
      </View>
    </View>
  )
}

export default PdfUserData

const s = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row"
  },
  largeColumn: {
    width: "65%",
    gap: 4
  },
  column: {
    width: "35%",
    gap: 4
  },
  dataContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  }
});