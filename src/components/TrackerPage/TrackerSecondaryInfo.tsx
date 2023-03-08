import React from "react";
import HorizontalBarChart from "../Recharts/HorizontalBarChart";
import RadialChart from "../Recharts/RadialChart";

type Props = {
  player: any;
  championRank: any;
};

function TrackerSecondaryInfo({ player, championRank }: Props) {
  console.log(player);
  console.log(championRank);

  var accountKills = 0;
  var accountAssist = 0;
  var accountDeath = 0;
  var accountKDA;

  championRank.map((championInfo: any) => {
    accountKills += championInfo.Kills;
    accountAssist += championInfo.Assists;
    accountDeath += championInfo.Deaths;
  });

  accountKDA = ((accountKills + 0.5 * accountAssist) / accountDeath).toFixed(2);

  return (
    <div className="tracker__info__secondary">
      <section className="tracker__info__secondary__kda__section">
        <h3> KDA général</h3>
        <div className="tracker__info__secondary__kda__section__ratio">
          <p>
            Ratio : <span>{accountKDA}</span>
          </p>
          <HorizontalBarChart
            positiveValue={accountKills + 0.5 * accountAssist}
            negativeValue={accountDeath}
            width={150}
          />
        </div>
        <div className="tracker__info__secondary__kda__section__stats">
          <p>
            <span className="tracker__info__secondary__kda__section__stats__kill">
              {accountKills}
            </span>{" "}
            /{" "}
            <span className="tracker__info__secondary__kda__section__stats__death">
              {accountDeath}
            </span>{" "}
            /{" "}
            <span className="tracker__info__secondary__kda__section__stats__assist">
              {accountAssist}
            </span>
          </p>
        </div>
      </section>

      <section className="tracker__info__secondary__actual__season">
        <h3> Stats Saison {player.RankedKBM.Season - 1}</h3>
        <div className="tracker__info__secondary__actual__season__points">
          <p> {player.RankedKBM.Points} pts / 100</p>
          <HorizontalBarChart
            positiveValue={player.RankedKBM.Points}
            negativeValue={100 - player.RankedKBM.Points}
            width={150}
          />
        </div>
        <div className="tracker__info__secondary__actual__season__score">
          <p>Victoires / Défaites</p>
          <HorizontalBarChart
            positiveValue={accountKills + 0.5 * accountAssist}
            negativeValue={accountDeath}
            width={150}
          />
          <p className="tracker__info__secondary__actual__season__score__text">
            <span className="tracker__info__secondary__actual__season__score__text__win">
              {player.RankedKBM.Wins}
            </span>{" "}
            /{" "}
            <span className="tracker__info__secondary__actual__season__score__text__losses">
              {player.RankedKBM.Losses}
            </span>
          </p>
        </div>
        <div className="tracker__info__secondary__actual__season__percentage">
          <RadialChart
            positiveValue={player.RankedKBM.Wins}
            negativeValue={player.RankedKBM.Losses}
          />
        </div>
      </section>
    </div>
  );
}

export default TrackerSecondaryInfo;
