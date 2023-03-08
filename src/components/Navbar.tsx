import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <p>Paladins.gg</p>
      <nav className="navbar">
        <ul className="navbar__content">
          <li>
            <NavLink to="/" end className="link">
              Acceuil
            </NavLink>
          </li>
          <div className='navbar__dropdown'>
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

          <li>
            <NavLink to="/paladins" end className="link">
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/paladins" end className="link">
              Guides
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
      </nav>
    </header>
  );
}

export default Navbar;
