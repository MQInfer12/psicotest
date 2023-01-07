import React from 'react'
import { Point, PointsContainer } from '../../styles/pages/testCreator'

const Points = ({ array, state, setState }) => {
  return (
    <PointsContainer>
      {
        array.map((v, i) => (
          <Point key={i} colorized={i === state} onClick={() => setState(i)} />
        ))
      }
      <Point colorized={state === array.length} onClick={() => setState(array.length)}>
        <i className="fa-solid fa-plus"></i>
      </Point>
    </PointsContainer>
  )
}

export default Points