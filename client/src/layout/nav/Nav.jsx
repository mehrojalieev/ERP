import { useSelector } from "react-redux"
import "./Nav.scss"
import { NavLink, Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
const Nav = () => {

  const userData = useSelector(state => state.auth)
  console.log(userData.user);

  const { pathname } = useLocation()

  return pathname.includes("/admin") || pathname.includes("/auth") ? null : (
    <nav>
      <div className="nav__logo">
        <h1>ERP</h1>
      </div>
      <div className="nav__menu">
        <ul>
          <li>
            <NavLink className={({ isActive }) => isActive ? "link link--active" : "link"} to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "link link--active" : "link"} to={"contact"}>Contact</NavLink>

          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "link link--active" : "link"} to={"about"}>About</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "link link--active" : "link"} to={"students"}>Students</NavLink>

          </li>
        </ul>
      </div>
      <div className="nav-action">
        {
          userData.user ? <Link to={"/admin"}>Kabinetga Kirish</Link> : <Link to={"/auth"}>Sign in</Link>
        }
      </div>
    </nav>
  )
}

export default Nav