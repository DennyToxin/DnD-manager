import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth.slice";

export default function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutTrigger = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate(Paths.login);
  };

  const toPlayers = () => {
    navigate(Paths.player);
  };

  return (
    <div className="header">
      <div className="header__brand">
        <Link to={Paths.home}>
          <span className="header__brand-text">DnD manager</span>
        </Link>
      </div>
      <div className="header__menu">
        {user ? (
          <span className="header__menu-link" onClick={logoutTrigger}>
            logout
          </span>
        ) : (
          <>
            <Link to={Paths.login}>
              <span className="header__menu-link">login</span>
            </Link>
            <Link to={Paths.register}>
              <span className="header__menu-link">register</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
