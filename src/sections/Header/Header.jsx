
import { auth, provider } from '../../Firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import './Header.css';
import { useState } from 'react';
import { useEffect } from 'react';
import logo from '../../assets/logo.png';

import { FaArrowRightFromBracket } from "react-icons/fa6";

import { NavLink, useLocation } from 'react-router-dom';


function Header({handleBarClicked, user, setUser, handleSearch}) {
  const [showSearch,setShowSearch] = useState(true);
  const {pathname} = useLocation();



  const signIn = () => {
    signInWithPopup(auth,provider)
    .then(result => {
      localStorage.setItem('user', JSON.stringify(result.user.auth.currentUser.providerData[0]));
      setUser(result.user.auth.currentUser.providerData[0]);
    })
    .catch(err => console.log(err.message))

    localStorage.setItem('user', user);
  }

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  useEffect(() => {
      setShowSearch(pathname === '/');
  },[pathname]);

  useEffect(() => {
    setUser(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null);
  }, []);


  return (
    <header className='header'>
      <nav className="header-container navbar navbar-expand-lg w-100 d-flex justify-content-between align-items-center px-2 px-sm-4">

          <img width='40px' height='40px' src={logo} alt='logo' className='d-none d-md-block' />
          <FaBars className='d-md-none' onClick={handleBarClicked} />
            <form 
            className="d-flex" 
            role="search" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(e.target.children[0].value,'search');
              e.target.children[0].value = "";
            }}>
              {showSearch && <input className={'form-control me-2'} type='search' placeholder='Search for movie' aria-label='Search' />}
            </form>
            <div className="action profile d-flex">
              <button 
                className={user? 'd-none' : 'login btn'} 
                onClick={signIn}>
                <span className='user-icon'>
                  <FaUser />
                </span>
              LOGIN</button>
              <NavLink to={'/profile'} className={user? 'profile-info d-flex align-items-center gap-2' : 'd-none'}>
                <img className='avatar-img' src={user?.photoURL} alt='avatar' />
                <span className='avatar-name'>{user?.displayName}</span>
              </NavLink>

              <button 
                className={!user? 'd-none' : 'login btn ms-3'} 
                onClick={signOut}>
                <span className='user-icon'>
                  <FaArrowRightFromBracket />
                </span>
              Logout</button>
            </div>

      </nav>
    </header>
  )
}
export default Header;
