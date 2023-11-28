import React from 'react'
import { PageTitle } from '../../styles/pages/landing'
import Logo from '../../assets/logo/logo.png'
import '../../styles/pages/psicotestLogo.css'

const PsicotestLogo = () => {
  return (
    <PageTitle className='psicotest-logo-123'>
      <img alt="psicotest-logo" src={Logo}/>
      <div>
        <div><span>Psico</span>test</div>
        <small>v2.0</small>
      </div>
    </PageTitle>
  )
}

export default PsicotestLogo