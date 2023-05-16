import HorizontalBarChart from '../Recharts/HorizontalBarChart';
import RadialChart from '../Recharts/RadialChart';

type Props = {
  player: any;
  championRank: any;
};

function TrackerSecondaryInfo({ player, championRank }: Props) {
  var accountKills = 0;
  var accountAssist = 0;
  var accountDeath = 0;
  var accountKDA: any;

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

  championRank.map((championInfo: any) => {
    accountKills += championInfo.Kills;
    accountAssist += championInfo.Assists;
    accountDeath += championInfo.Deaths;
  });

  accountKDA = ((accountKills + 0.5 * accountAssist) / accountDeath).toFixed(2);

  if(player.RankedKBM.Season !== 0)
      {
        return (
          <section className="tracker__actual__season">
          <h3> Stats Saison {player.RankedKBM.Season - 1}</h3>
          <div className="tracker__actual__season__rank">
            {
              player.RankedKBM.Tier !== 0 &&
              <img
              src={"/assets/paladins_rank/" + player.RankedKBM.Tier + ".png"}
              alt=""
            />
            }
            <p>{tierRank[player.RankedKBM.Tier]}</p>
          </div>
          <div className="tracker__actual__season__points">
            <p> {player.RankedKBM.Points} pts / 100</p>
            <HorizontalBarChart
              positiveValue={player.RankedKBM.Points}
              negativeValue={100 - player.RankedKBM.Points}
              width={150}
            />
          </div>
          <div className="tracker__actual__season__percentage">
            <RadialChart
              positiveValue={player.RankedKBM.Wins}
              negativeValue={player.RankedKBM.Losses}
            />
          </div>
        </section>
        )
      } else {
        return(
          <section className="tracker__actual__season">
          <h3> Stats Saison </h3>
          <div className="tracker__actual__season__rank">
            <p>Pas d'information cette saison</p>
          </div>
        </section>
        )
      }
}

export default TrackerSecondaryInfo;
