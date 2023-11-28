import React from 'react'
import { Th, Tr } from '../../styles/globals/table'
import BfqTdAnswer from './bfqTdAnswer'

const BfqRows = ({ dimensiones }) => {
  return (
    dimensiones.map(dimension => (
      <Tr key={dimension.id}>
        <Th>{dimension.descripcion}</Th>
        <Th center>{dimension.puntuaciones[0]}</Th>
        {/*TODO: HARDCODED*/}
        <Th center>{dimension.puntuaciones[1]}</Th>
        <BfqTdAnswer mid={30} selected={dimension.puntuaciones[1]} />
        <BfqTdAnswer mid={40} selected={dimension.puntuaciones[1]} />
        <BfqTdAnswer mid={50} selected={dimension.puntuaciones[1]} />
        <BfqTdAnswer mid={60} selected={dimension.puntuaciones[1]} />
        <BfqTdAnswer mid={70} selected={dimension.puntuaciones[1]} />
      </Tr>
    ))
  )
}

export default BfqRows