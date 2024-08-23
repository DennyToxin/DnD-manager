import "./player.scss";
import Layout from "../layout/layout";
import PlayerForm from "../player-form/form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddPlayerMutation } from "../../share/player";
import { selectUser } from "../../features/auth.slice";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import { Player } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isError";

export default function PlayerAdd() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addPlayer] = useAddPlayerMutation();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);

  const handleAddPlayer = async (data: Player) => {
    try {
      await addPlayer(data).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (err) {
      const isError = isErrorWithMessage(err);

      if (isError) {
        setError(err.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Layout>
      <div className="player-add">
        <PlayerForm
          title="Add Player"
          btnText="Add Player"
          onFinish={handleAddPlayer}
          error={error}
        />
      </div>
    </Layout>
  );
}
