import React from 'react'
import HorizontalBarChart from '../../Recharts/HorizontalBarChart';
import RadialChart from '../../Recharts/RadialChart';

type Props = {
    rankedInfo: any;
    accountKills: number;
    accountDeath: number;
    accountAssist: number;
  };

function TrackerActualSeason({ rankedInfo, accountKills, accountDeath, accountAssist }: Props) {
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

      if(rankedInfo.Season !== 0)
      {
        return (
          <section className="tracker__info__secondary__actual__season">
          <h3> Stats Saison {rankedInfo.Season - 1}</h3>
          <div className="tracker__info__secondary__actual__season__rank">
            {
              rankedInfo.Tier !== 0 &&
              <img
              src={"/assets/paladins_rank/" + rankedInfo.Tier + ".png"}
              alt=""
            />
            }
            <p>{tierRank[rankedInfo.Tier]}</p>
          </div>
          <div className="tracker__info__secondary__actual__season__points">
            <p> {rankedInfo.Points} pts / 100</p>
            <HorizontalBarChart
              positiveValue={rankedInfo.Points}
              negativeValue={100 - rankedInfo.Points}
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
                {rankedInfo.Wins}
              </span>{" "}
              /{" "}
              <span className="tracker__info__secondary__actual__season__score__text__losses">
                {rankedInfo.Losses}
              </span>
            </p>
          </div>
          <div className="tracker__info__secondary__actual__season__percentage">
            <RadialChart
              positiveValue={rankedInfo.Wins}
              negativeValue={rankedInfo.Losses}
            />
          </div>
        </section>
        )
      } else {
        return(
          <section className="tracker__info__secondary__actual__season">
          <h3> Stats Saison </h3>
          <div className="tracker__info__secondary__actual__season__rank">
            <p>Pas d'information cette saison</p>
          </div>
        </section>
        )
      }
}

export default TrackerActualSeason