import "./header.scss";
import dnd from "../../assets/images/DnD.svg";
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

  return (
    <div className="header">
      <div className="header__brand">
        <img className="header__brand-logo" src={dnd} />
        <Link to={Paths.home}>
          <p className="header__brand-text">DnD manager</p>
        </Link>
      </div>
      <div className="header__menu">
        {user ? (
          <p className="header__menu-link" onClick={logoutTrigger}>
            logout
          </p>
        ) : (
          <>
            <Link to={Paths.login}>
              <p className="header__menu-link">login</p>
            </Link>
            <Link to={Paths.register}>
              <p className="header__menu-link">register</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
