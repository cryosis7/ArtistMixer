import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
};
