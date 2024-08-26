type PlayerItemProps = {
  firstName: string;
  lastName?: string | null;
  race?: string | null;
  classes?: string | null;
  image?: string;
};

export const PlayerItem = ({
  firstName,
  lastName,
  race,
  classes,
  image,
}: PlayerItemProps) => {
  return (
    <>
      <img className="player-item__image" src={image} alt="Image not found" />
      <div className="player-item__info">
        <div className="player-item__name-field">
          <p className="player-item__name">{firstName}</p>
          {lastName && <p className="player-item__name">{lastName}</p>}
        </div>
        <div className="player-item__race-field">
          <p className="player-item__race">race: {race ? race : "Unknown"}</p>
        </div>
        <div className="player-item__classes">
          <p className="player-item__class">
            class: {classes ? classes : "Unknown"}
          </p>
        </div>
      </div>
    </>
  );
};
