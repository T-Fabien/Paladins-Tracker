import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {

  const [showMenu, SetShowMenu] = useState(false);

  const handleShowMenu = () => {
    SetShowMenu(!showMenu)
  }

  return (
    <header>
      <p>Paladins-Tracker</p>
      <nav className={`navbar ${showMenu ? "showmenu" : "hidemenu"}`}>
        <ul className="navbar__content">
          <li>
            <NavLink to="/" end className="link" onClick={handleShowMenu}>
              Acceuil
            </NavLink>
          </li>
          <li>
            <NavLink to="/champions" className="link" onClick={handleShowMenu}>
              Champions
            </NavLink>
          </li>
          <li>
            <NavLink to="/paladins" end className="link" onClick={handleShowMenu}>
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/tierlist" end className="link" onClick={handleShowMenu}>
              TierList
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracker" end className="link" onClick={handleShowMenu}>
              Tracker
            </NavLink>
          </li>
        </ul>
        <button className="navbar__burger" onClick={handleShowMenu}>
          <span className="navbar-bar"></span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
