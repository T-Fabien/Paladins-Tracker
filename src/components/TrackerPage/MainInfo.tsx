import moment from "moment";

import RadialChart from "../Recharts/RadialChart";
import TrackerKdaSection from "./KdaSection";
import TrackerRoleSection from "./RoleSection";
import Profile from "./Account";
import HorizontalBarChart from "../Recharts/HorizontalBarChart";

type Props = {
  player: any;
  championRank: any;
};

function TrackerMainInfo({ player, championRank }: Props) {

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
    <section className="tracker__main__info">
      <Profile player={player}/>
      <TrackerKdaSection
        accountKDA={accountKDA}
        accountKills={accountKills}
        accountAssist={accountAssist}
        accountDeath={accountDeath}
      />
      <TrackerRoleSection championRank={championRank}/>
      <div className="tracker__main__info__winlose__ratio tracker__main__info__kda__stats">
        <h3>Pourcentages de victoires</h3>
        <p className="tracker__main__info__kda__ratio" >Pourcentage : <span>{((player.Wins / (player.Wins + player.Losses))*100).toFixed(2)} %</span></p>
        <HorizontalBarChart positiveValue={player.Wins} negativeValue={player.Losses} width={180}/>
        <p><span className="tracker__main__info__kda__stats__kill">{player.Wins}</span> / <span className="tracker__main__info__kda__stats__death">{player.Losses}</span></p>
      </div>
    </section>
  );
}

export default TrackerMainInfo;
