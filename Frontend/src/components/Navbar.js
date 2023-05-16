import React, { useContext, useState} from "react";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import {Link,useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../App";

function Navbar({setAuth}) {
  const [click, setClick] = useState(false);
  const {state, dispatch} = useContext(UserContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const navigate = useNavigate();
  const logout = (e) => {
    dispatch({type:"USER",payload:false})
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      navigate("/");
      toast.success("Logout successfull");
    } catch (err) {
      console.error(err.message);
    }
  }

  const InOut = () =>{
    if(state)
    {
      return(
        <>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/PlaceOrders" className="nav-links" onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Services" className="nav-links" onClick={closeMobileMenu}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-links" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item"
                >
              <Link to="/" className="nav-links" onClick={logout}>
                Logout
              </Link>
            </li>
        </>
      )
    }
    else{
      return(
        <>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Services" className="nav-links" onClick={closeMobileMenu}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-links" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/User" className="nav-links" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
        </>
      )
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img className="logo" src="/images/logo.png" alt="Logo"/>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <InOut/>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
