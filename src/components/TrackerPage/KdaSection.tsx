import React from 'react'
import HorizontalBarChart from '../Recharts/HorizontalBarChart'
import KdaHorizontalBar from '../Recharts/KdaHorizontalBar';

type Props = {
    accountKDA: string;
    accountKills: number;
    accountDeath: number;
    accountAssist: number;
  };

function TrackerKdaSection({ accountKDA, accountKills, accountDeath, accountAssist }: Props) {
  return (
    <div className="tracker__main__info__kda">
    <h3> Stats du joueur</h3>
    <div className="tracker__main__info__kda__ratio">
      <p>
        Ratio : <span>{accountKDA}</span>
      </p>
      <KdaHorizontalBar
        kill={accountKills}
        assist={accountAssist}
        death={accountDeath}
        width={190}
      />
    </div>
    <div className="tracker__main__info__kda__stats">
      <p>
        <span className="tracker__main__info__kda__stats__kill">
          {accountKills}
        </span>{" "}
        /{" "}
        <span className="tracker__main__info__kda__stats__death">
          {accountDeath}
        </span>{" "}
        /{" "}
        <span className="tracker__main__info__kda__stats__assist">
          {accountAssist}
        </span>
      </p>
    </div>
  </div>
  )
}

export default TrackerKdaSection