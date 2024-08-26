import "./players.scss";
import sands from "../../assets/images/sands.jpeg";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetPlayerQuery, useRemovePlayerMutation } from "../../share/player";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth.slice";
import { Paths } from "../../path";
import { ErrorMessage } from "../error/error";
import { Modal } from "antd";
import { isErrorWithMessage } from "../../utils/isError";
import Layout from "../layout/layout";

export const PlayerId = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isLoading } = useGetPlayerQuery(params.id || "");
  const [removePlayer] = useRemovePlayerMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Navigate to={Paths.player} />;
  }

  const handleDeletePlayer = async () => {
    setIsModalVisible(false);
    try {
      await removePlayer(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <img className="background-image" src={sands} />
      <div className="player-id">

        <div className="player-id__wrapper">
          <div className="player-id__name-field">
            <p className="player-id__name">{data.firstName}</p>
            {data.lastName && (
              <p className="player-id__name">{data.lastName}</p>
            )}
          </div>
          <div className="player-id__race-field">
            <p className="player-id__race">
              race: {data.race ? data.race : "Unknown"}
            </p>
          </div>
          <div className="player-id__class-field">
            <p className="player-id__class">
              class: {data.class ? data.class : "Unknown"}
            </p>
          </div>
          <div className="player-id__image-field">
            <img
              className="player-id__image"
              src={
                data.image ??
                "https://avatars.mds.yandex.net/i?id=7dfcc2bc726f9c3bdc2d5478d47294e9_l-5315199-images-thumbs&n=13"
              }
              alt="player"
            />
          </div>
          <div className="player-id__desc-field">
            <p className="player-id__desc">
              description: {data.description ? data.description : "Unknown"}
            </p>
          </div>

          <ErrorMessage message={error} />
          <Modal
            title="Delete player"
            open={isModalVisible}
            onOk={handleDeletePlayer}
            onCancel={() => setIsModalVisible(false)}
            okText="Confirm"
            cancelText="Cancel"
          >
            Do you really want to remove the player?
          </Modal>

          {user?.id === data.userId && (
            <div className="player-id__utils">
              <Link to={`${Paths.playerEdit}/${data.id}`}>
                <p className="player-id__edit">Edit</p>
              </Link>
              <p
                className="player-id__delete"
                onClick={() => setIsModalVisible(true)}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
