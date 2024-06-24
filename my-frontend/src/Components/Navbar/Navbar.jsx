import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';

export const Navbar = () => {

    const [menu,setMenu]=useState("home")
  return (
    <div className='nav-bar'>
        <div className='nav-logo'>
            <img src={logo} />
            <p>TrendyCart</p>

        </div>
        <ul className="navmenu">
                <li onClick={()=>{setMenu("home")}}><Link style={{textdecoration: 'none'}} to='/'>Home</Link>{menu=='home'?<hr/>:<></>}</li>   
                <li onClick={()=>{setMenu("men")}}><Link style={{textdecoration: 'none'}} to='/men'>Men</Link>{menu=='men'?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("women")}}><Link style={{textdecoration: 'none'}} to='/women'>Women</Link>{menu=='women'?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textdecoration: 'none'}} to='/kids'>Kids</Link>{menu=='kids'?<hr/>:<></>}</li>
                
        </ul>
        <div className='nav-cart'>
          {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Login</button>:<Link to='/login'><button>Login</button></Link>}
            {/* <Link to='/login'><button>Login</button></Link>x    */}
            <Link to='cart'><img src={cart_icon} /></Link>
            <div className="nav-login-count">0</div>
        </div>
        


    </div>
  )
}
