import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import "./Auth.scss";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login")
  }, []);

  return (
    <div className='auth'>
      <Link to="/">
        <h1>ERP AUTH</h1>
      </Link>
      <div className='auth__form-wrapper'>
        <ul className='nav__list'>
          <li className='list__item'>
            <NavLink end to="/auth/login" className={({ isActive }) => isActive ? "link link--active" : "link"} >Login</NavLink>
          </li>
          <li className='list__item'>
            <NavLink to="/auth/register" className={({ isActive }) => isActive ? "link link--active" : "link"} >Register</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth