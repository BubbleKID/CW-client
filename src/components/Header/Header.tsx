import React from 'react';
import './Header.sass';
import  Logo1 from '../../images/CWH_logo_1.png';
import  Logo2 from '../../images/CWH_logo_2.png';

export default function Header() {
    return (
        <div className="header">
            <div className="header__container">
                <a className="header__logo"><img src={Logo1} alt="logo1" /></a>
                <a className="header__logo"><img src={Logo2} alt="logo2" /></a>
            </div>
        </div>
    )
}