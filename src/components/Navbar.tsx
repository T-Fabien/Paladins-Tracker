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
            <NavLink to="/" end className="link">
              Acceuil
            </NavLink>
          </li>
          {/*
                      <div className="navbar__dropdown">
            <NavLink to="/paladins" className="link">
              Paladins
            </NavLink>
            
                        <ul className="navbar__dropdown__items">
              <li>
                <NavLink to="/paladins/champions" end className="link">
                  Champion
                </NavLink>
              </li>
              <li>
                <NavLink to="/paladins" end className="link">
                  Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/paladins" end className="link">
                  Cartes
                </NavLink>
              </li>
            </ul>
            </div>
            */}

          <li>
            <NavLink to="/champions" className="link">
              Champions
            </NavLink>
          </li>

          {/* PAGE NEWS 


          */}

          <li>
            <NavLink to="/paladins" end className="link">
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/paladins" end className="link">
              TierList
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracker" end className="link">
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
