import React from 'react';
import './Header.css';
import  Logo from '../../images/CWH_logo_2.png';

export default function Header() {
    return (
        <div className="menu-container">
            <div className="menu">
                <div className="menu-items">
                    <a className="menu-logo"><img src={Logo} /></a>
                </div>
            </div>
        </div>
    )
}