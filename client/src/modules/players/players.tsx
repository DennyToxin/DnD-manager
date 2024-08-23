import { useNavigate } from "react-router-dom";
import { useGetAllPlayersQuery } from "../../share/player";
import "./players.scss";
import { Paths } from "../../path";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth.slice";
import { useEffect } from "react";
import Layout from "../layout/layout";

export default function Players() {
  const { data } = useGetAllPlayersQuery();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const toAddUser = () => {
    navigate(Paths.playerAdd);
  };

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);
  return (
    <>
      <Layout>
        <div className="players">
          <div className="players__list-wrapper">
            <button className="players__add-button" onClick={toAddUser}>
              Add player
            </button>
            <ul className="players__list">
              {data
                ? data?.map((player) => (
                    <li
                      key={player.id}
                      className="players__list-item"
                      onClick={() => navigate(`${Paths.player}/${player.id}`)}
                    >
                      <p className="players__list-item-name">
                        {player.firstName}
                      </p>
                      <p className="players__list-item-race">{player.race}</p>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
