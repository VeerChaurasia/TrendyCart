import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import{FaBars, FaTimes, FaInstagram,FaDiscord,FaFacebook,FaHeart} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';
export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>TrendyCart</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Abour</li>
            <li>Contact</li>

        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icons-container'>
                <FaInstagram />
                <FaXTwitter />
                <FaDiscord />
            </div>
        </div>
        <div className='footer-copyright'>
            <hr />
            <p>Copyright @ 2024 ALL-Right-Reserved</p>
        </div>

    </div>
  )
}
