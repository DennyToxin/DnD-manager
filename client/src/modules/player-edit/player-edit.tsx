import "./player.scss";
import rocks2 from "../../assets/images/rocks2.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEditPlayerMutation, useGetPlayerQuery } from "../../share/player";
import Layout from "../layout/layout";
import PlayerForm from "../player-form/form";
import { Player } from "@prisma/client";
import { Paths } from "../../path";
import { isErrorWithMessage } from "../../utils/isError";

export default function PlayerEdit() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetPlayerQuery(params.id || "");
  const [editPlayer] = useEditPlayerMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEditUser = async (player: Player) => {
    try {
      const editedPlayer = {
        ...data,
        ...player,
      };

      await editPlayer(editedPlayer).unwrap();
      navigate(`${Paths.status}/updated`);
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
      <img className="background-image" src={rocks2}/>
      <div className="player-edit">
        <PlayerForm
          btnText="Edit"
          error={error}
          player={data}
          onFinish={handleEditUser}
        />
      </div>
    </Layout>
  );
}
