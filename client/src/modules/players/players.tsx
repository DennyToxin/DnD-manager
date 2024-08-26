import { useNavigate } from "react-router-dom";
import { useGetAllPlayersQuery } from "../../share/player";
import "./players.scss";
import { Paths } from "../../path";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth.slice";
import { useEffect } from "react";
import Layout from "../layout/layout";
import { PlayerItem } from "./player.item";

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

  console.log(data);

  return (
    <Layout>
      <img className="background-image" src="src\assets\images\fields2.jpeg" alt="" />
      <div className="players">
        <h1 className="players__title">Players</h1>
        <div className="players__list-wrapper">
          {Array.isArray(data) && data.length > 2 && <button className="players__add-button" onClick={toAddUser}>Add player</button>}
          {data?.map((player) => (
            <div className="player-item" key={player.id} onClick={() => navigate(`${Paths.player}/${player.id}`)}>
              <PlayerItem
                firstName={player.firstName}
                lastName={player.lastName}
                race={player.race}
                classes={player.class}
                image={player.image ?? "https://avatars.mds.yandex.net/i?id=7dfcc2bc726f9c3bdc2d5478d47294e9_l-5315199-images-thumbs&n=13"}
              />
            </div>
          ))}
          {!data?.length && <p className="player-item__text">No players found</p>}
          {Array.isArray(data) && data.length <= 2 && <button className="players__add-button" onClick={toAddUser}>Add player</button>}
        </div>
      </div>
    </Layout>
  );
}
