import { Link } from "react-router-dom";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";

function Header({ isDark, dispatch }) {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <h1
            className="header__name"
            onClick={() => dispatch({ type: "reset" })}
          >
            <Link to="/">Where in the world?</Link>
          </h1>
          <div
            className="menu"
            onClick={() => dispatch({ type: "isDarkMode", payload: !isDark })}
          >
            <img src={isDark ? sun : moon} alt="icon" />
            <span>{`${isDark ? "Light" : "Dark"} Mode`}</span>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
