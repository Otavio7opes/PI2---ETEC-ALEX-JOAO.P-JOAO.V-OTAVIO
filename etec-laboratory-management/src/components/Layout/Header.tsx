import React from 'react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logos">
        <div className="logo-left">
          <img src="/logo-etec.svg" alt="ETEC Júlio de Mesquita Santo André" className="logo-etec-image" />
        </div>
        <div className="logo-right">
          <div className="logo-cps-graphic">
            <div className="cps-monogram">CPS</div>
          </div>
          <div className="logo-cps-text">
            <div className="logo-cps-sub">Centro</div>
            <div className="logo-cps-sub">Paula Souza</div>
          </div>
        </div>
      </div>
      <div className="header-bar"></div>
    </header>
  )
}

export default Header

