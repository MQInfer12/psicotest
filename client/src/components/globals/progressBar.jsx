import React from 'react'
import { StyledProgress } from '../../styles/global-components/progressBar'

const ProgressBar = ({ value }) => {
  return (
    <StyledProgress max="100" value={value}>
      <span></span>
    </StyledProgress>
  )
}

export default ProgressBar