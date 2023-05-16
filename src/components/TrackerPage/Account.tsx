import moment from "moment";


type Props = {
    player: any;
  };

function Profile({ player }: Props) {
  return (
    <div className="tracker__main__info__account">
        <div className="tracker__main__info__account__avatar">
          <img src={player.AvatarURL} alt="Profile Image" />
        </div>
        <div className="tracker__main__info__account__info">
          <h2>
            {player.hz_player_name}
            <span>{" ( " + player.Region + " ) "}</span>
          </h2>
          <h3> Niveau {player.Level} </h3>
          <p>
            Compte crée le{" "}
            {moment(player.Created_Datetime)
              .locale("fr")
              .format(`Do MMMM YYYY`)}
          </p>
          <p>Temps de jeu total : {player.HoursPlayed} heures</p>
          <p>
            Connecté {moment(player.Last_Login_Datetime).locale("fr").fromNow()}
          </p>
        </div>
      </div>
  )
}

export default Profile