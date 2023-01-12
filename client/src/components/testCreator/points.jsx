import React from 'react'
import { Point, PointsContainer } from '../../styles/pages/testCreator'

const Points = ({ array, state, setState, disabled }) => {
  return (
    <PointsContainer>
      {
        array.map((v, i) => (
          <Point key={i} 
            colorized={i === state} 
            onClick={() => setState(i)} 
            disabled={disabled}
            selected={state === i}
          />
        ))
      }
      <Point 
        colorized={state === array.length} 
        onClick={() => setState(array.length)}
        disabled={disabled}
      >
        <i className="fa-solid fa-plus"></i>
      </Point>
    </PointsContainer>
  )
}

export default Points