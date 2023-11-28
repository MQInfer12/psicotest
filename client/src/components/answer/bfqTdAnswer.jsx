import React from 'react'
import { BFQTd } from '../../styles/pages/answer'

const BfqTdAnswer = ({ mid, selected }) => {
  const values = [mid - 4, mid - 3, mid - 2, mid - 1, mid, mid + 1, mid + 2, mid + 3, mid + 4];

  return (
    <BFQTd>
      <div>
        {values.map((value, i) => <div key={i} className={value === selected ? "active" : ""} />)}
      </div>
    </BFQTd>
  )
}

export default BfqTdAnswer