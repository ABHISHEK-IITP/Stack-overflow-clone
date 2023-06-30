import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../assets/logo.png';
import bars from '../../assets/bars-solid.svg'
import search from '../../assets/magnifying-glass-solid.svg'
import Avatar from '../Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser';
import '../Navbar/Navbar.css';


const Navbar = ({handleSlideIn}) => {
  const dispatch = useDispatch()
  var User = useSelector((state)=> (state.currentUserReducer))
  const navigate =useNavigate()

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
  }, [User?.token, dispatch]);

  return (
    <nav className='nav-main'>
        <div className="navbar">
          <button className="slide-in-icon" onClick={() => handleSlideIn()}>
            <img src={bars} alt="bars" width="15" />
          </button>
          <div className="navbar-1">
            <Link to='/' className='Nav-item nav-logo'>
                  <img id="logobar" src={logo} alt="logo" />
              </Link>
              <Link to='/' className='Nav-item nav-btn res-nav'>About</Link>
              <Link to='/' className='Nav-item nav-btn res-nav'>Products</Link>
              <Link to='/' className='Nav-item nav-btn res-nav'>For Teams</Link>
              <form>
                <input type="text" placeholder='search..' />
                <img src={search} alt="search" className='search-icon'/>
              </form>
          </div>
          <div className="navbar-2">
            { User === null ? 
                    <Link to='/Auth' className='Nav-item nav-links'>Log In</Link>:
                  <>
                      <Avatar backgroundColor='#009dff' px="10px" py="5px" borderRadius="50%" Color="white"><Link to='/Profile' style={{color:"white",textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='Nav-item nav-links' onClick={handleLogout}>Log Out</button>
                  </>
              } 
          </div>
        </div>
    </nav>
  )
}

export default Navbar