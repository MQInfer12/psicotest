import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from './answerPage'

const PdfTable = ({ test }) => {
  return (
    <View style={s.container}>
      <View style={s.tableContainer}>
        <View style={s.row}>
          <Text 
            style={[
              styles.text, 
              styles.textLittlePrimary, 
              s.bigColumn
            ]}
          >Dimensión</Text>
          <Text
            style={[
              styles.text,
              styles.textLittlePrimary,
              styles.textCenter, {
                width: "25%"
              }
            ]}
          >Natural</Text>
          {
            test.escalas.map((v, i) => (
              <Text
                key={i}
                style={[
                  styles.text,
                  styles.textLittlePrimary,
                  styles.textCenter, {
                    width: "25%"
                  }
                ]}
              >{v.descripcion}</Text>
            ))
          }
        </View>
        {
          test.dimensiones.map((v, i) => (
            <View style={s.row}>
              <Text 
                key={i}
                style={[
                  styles.text, 
                  styles.textLittle, 
                  s.bigColumn
                ]}
              >{v.descripcion}</Text>
              {
                v.puntuaciones.map((punt, j) => (
                  <Text
                    key={j}
                    style={[
                      styles.text,
                      styles.textLittle,
                      styles.textCenter, {
                        width: "25%"
                      }
                    ]}
                  >{punt}</Text>
                ))
              }
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default PdfTable

const s = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  tableContainer: {
    width: "80%",
  },
  row: {
    width: "100%",
    flexDirection: "row"
  },
  bigColumn: {
    width: "50%"
  },
  textCenter: {
    textAlign: "center"
  }
})