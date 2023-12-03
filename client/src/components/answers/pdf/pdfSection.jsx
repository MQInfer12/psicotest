import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from './answerPage'

const PdfSection = ({ children, text }) => {
  return (
    <View style={s.container}>
      <Text style={[styles.text, styles.textBig]}>{text}</Text>
      { children }
    </View>
  )
}

export default PdfSection

const s = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12
  }
});