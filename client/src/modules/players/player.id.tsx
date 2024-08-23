import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "./players.scss";
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
      <div className="player-id">
        {user?.id === data.userId && (
          <div className="player-id__utils">
            <Link to={`${Paths.playerEdit}/${data.id}`}>
              <span className="player-id__edit">Edit</span>
            </Link>
            <span
              className="player-id__delete"
              onClick={() => setIsModalVisible(true)}
            >
              Delete
            </span>
          </div>
        )}
        <div className="player-id__header">
          <div className="player-id__item">{data.firstName}</div>
          {data.lastName && (
            <div className="player-id__item">{data.lastName}</div>
          )}
        </div>
        {data.race && (
          <>
            <span className="player-id__item-desc">Belonging:</span>
            <div className="player-id__item">{data.race}</div>
          </>
        )}
        {data.class && (
          <>
            <span className="player-id__item-desc">Class:</span>
            <div className="player-id__item">{data.class}</div>
          </>
        )}
        {data.description && (
          <>
            <span className="player-id__item-desc">Description:</span>
            <div className="player-id__item">{data.description}</div>
          </>
        )}
        {data.image && (
          <img className="player-id__image" src={data.image} alt="No image" />
        )}

        <Link to={Paths.home}>
          <span className="player-id__button">Back</span>
        </Link>
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
      </div>
    </Layout>
  );
};
