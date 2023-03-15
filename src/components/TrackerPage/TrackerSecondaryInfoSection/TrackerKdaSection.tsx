import React from 'react'
import HorizontalBarChart from '../../Recharts/HorizontalBarChart'

type Props = {
    accountKDA: string;
    accountKills: number;
    accountDeath: number;
    accountAssist: number;
  };

function TrackerKdaSection({ accountKDA, accountKills, accountDeath, accountAssist }: Props) {
  return (
    <section className="tracker__info__secondary__kda__section">
    <h3> KDA général</h3>
    <div className="tracker__info__secondary__kda__section__ratio">
      <p>
        Ratio : <span>{accountKDA}</span>
      </p>
      <HorizontalBarChart
        positiveValue={accountKills + 0.5 * accountAssist}
        negativeValue={accountDeath}
        width={190}
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
  )
}

export default TrackerKdaSection