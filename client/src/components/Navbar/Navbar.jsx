import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import decode from 'jwt-decode'


import { Hamburger } from './Hamburger';
import { useLogo } from "../../hook/useLogo";
import search from '../../assets/magnifying-glass-solid.svg'
import Avatar from '../Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser';
import '../Navbar/Navbar.css';


const Navbar = () => {
  const dispatch = useDispatch()
  var User = useSelector((state)=> (state.currentUserReducer))
  const navigate =useNavigate()

  const [showSearch, setShowSearch] = useState(false);
  const { logo, isMoblie } = useLogo();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ User?.token, dispatch]);

  

  

  return (
    <nav className='nav-main'>
        <div className="navbar">
          
          <div className='navbar-1'>
            {isMoblie && <Hamburger/>}
            <Link to='/' className='Nav-item nav-logo'>
                  <img id="logobar" src={logo} alt="logo" />
              </Link>
          </div>
          <div className="navbar-1">

              <Link to='/' className='Nav-item nav-btn res-nav'>About</Link>
              <Link to='/' className='Nav-item nav-btn res-nav'>Products</Link>
              <Link to='/' className='Nav-item nav-btn res-nav'>For Teams</Link>
              <form className='Nav-item nav-btn res-nav'>
                {showSearch && <input type="text" placeholder="Search..." />}
                  <img
                        src={search}
                        alt="search"
                        className={`search-icon ${
                            showSearch ? "search-icon-active" : ""
                        }`}
                        onClick={() => setShowSearch(!showSearch)}
                        style={{marginTop:"-15px" , width:"20px"}}
                        />
              </form>
          </div>
          <div className="navbar-2">
            { User === null ? 
                    <Link to='/Auth' className='Nav-item nav-links'>Log In</Link>:
                  <>
                      <Avatar backgroundColor='#009dff' px="10px" py="5px" borderRadius="50%" Color="white"><Link to={`/Users/${User?.result?._id}`} style={{color:"white",textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='Nav-item nav-links' onClick={handleLogout}>Log Out</button>
                  </>
              } 
          </div>
        </div>
    </nav>
  )
}

export default Navbar