import moment from "moment";

import RadialChart from "../Recharts/RadialChart";
import TrackerKdaSection from "./TrackerKdaSection";

type Props = {
  player: any;
  championRank: any;
};

function TrackerMainInfo({ player, championRank }: Props) {
  const tierRank = [
    "Unranked",
    "Bronze V",
    "Bronze IV",
    "Bronze III",
    "Bronze II",
    "Bronze I",
    "Silver V",
    "Silver IV",
    "Silver III",
    "Silver II",
    "Silver I",
    "Gold V",
    "Gold IV",
    "Gold III",
    "Gold II",
    "Gold I",
    "Platine V",
    "Platine IV",
    "Platine III",
    "Platine II",
    "Platine I",
    "Diamant V",
    "Diamant IV",
    "Diamant III",
    "Diamant II",
    "Diamant I",
    "Master",
    "Grandmaster",
  ];

  moment.locale("fr", {
    months:
      "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
        "_"
      ),
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans",
    },
  });

  var accountKills = 0;
  var accountAssist = 0;
  var accountDeath = 0;
  var accountKDA: any;

  championRank.map((championInfo: any) => {
    accountKills += championInfo.Kills;
    accountAssist += championInfo.Assists;
    accountDeath += championInfo.Deaths;
  });

  accountKDA = ((accountKills + 0.5 * accountAssist) / accountDeath).toFixed(2);

  return (
    <section className="tracker__info__main">
      <div>
        <div className="tracker__info__main__avatar">
          <img src={player.AvatarURL} alt="Profile Image" />
        </div>
        <div className="tracker__info__main__account">
          <h2>
            {player.hz_player_name}
            <span>{" ( " + player.Region + " ) "}</span>
          </h2>
          <p> Niveau {player.Level} </p>
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
      <TrackerKdaSection
        accountKDA={accountKDA}
        accountKills={accountKills}
        accountAssist={accountAssist}
        accountDeath={accountDeath}
      />

      <div className="tracker__info__main__winlose__ratio">
        <RadialChart
          positiveValue={player.Wins}
          negativeValue={player.Losses}
        />
      </div>
      <div className="tracker__info__main__rank">
        {player.RankedKBM.Tier > 0 && (
          <img
            src={"/assets/paladins_rank/" + player.RankedKBM.Tier + ".png"}
            alt=""
          />
        )}
        <p>{tierRank[player.RankedKBM.Tier]}</p>
      </div>
    </section>
  );
}

export default TrackerMainInfo;
