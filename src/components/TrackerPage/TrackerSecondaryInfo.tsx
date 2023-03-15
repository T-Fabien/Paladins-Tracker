import React from "react";
import HorizontalBarChart from "../Recharts/HorizontalBarChart";
import RadialChart from "../Recharts/RadialChart";
import TrackerActualSeason from "./TrackerSecondaryInfoSection/TrackerActualSeason";
import TrackerKdaSection from "./TrackerSecondaryInfoSection/TrackerKdaSection";
import TrackerRoleSection from "./TrackerSecondaryInfoSection/TrackerRoleSection";

type Props = {
  player: any;
  championRank: any;
};

function TrackerSecondaryInfo({ player, championRank }: Props) {
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
    <div className="tracker__info__secondary">
      <TrackerKdaSection accountKDA={accountKDA} accountKills={accountKills} accountAssist={accountAssist} accountDeath={accountDeath}/>
      <TrackerActualSeason rankedInfo={player.RankedKBM} accountKills={accountKills} accountAssist={accountAssist} accountDeath={accountDeath}/>
      <TrackerRoleSection championRank={championRank}/>

    </div>
  );
}

export default TrackerSecondaryInfo;
