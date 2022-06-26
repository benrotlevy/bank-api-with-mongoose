import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="nav-cell">HOME</div>
      </Link>
      <Link to="/all-users">
        <div className="nav-cell">USERS</div>
      </Link>
    </div>
  );
};
