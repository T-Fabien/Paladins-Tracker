import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  championRank: any;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = outerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN) *0.8;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "middle" : "middle"}
      dominantBaseline="central"
      className="test"
    >
      {`${name} : ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function TrackerRoleSection({ championRank }: Props) {
  const champion = useSelector((state: any) => state.champion.value);

  var championRole;

  var countDamageTime: number = 0;
  var countFlankTime: number = 0;
  var countTankTime: number = 0;
  var countSupportTime: number = 0;

  championRank.map((championStats: any) => {
    championRole = champion.championList
      .filter((championInfo: any) =>
        championStats.champion_id.includes(championInfo.id)
      )
      .map((championInfo: any) => championInfo.Roles);

    switch (championRole[0]) {
      case "Paladins Dégâts":
        countDamageTime += championStats.Wins + championStats.Losses;
        break;
      case "Paladins Flanc":
        countFlankTime += championStats.Wins + championStats.Losses;
        break;
      case "Paladins Tank":
        countTankTime += championStats.Wins + championStats.Losses;
        break;
      case "Paladins Soutien":
        countSupportTime += championStats.Wins + championStats.Losses;
        break;
      default:
        break;
    }
  });

  const data = [
    { name: "Heal", value: countSupportTime, fill: "#E86100" },
    { name: "Tank", value: countTankTime, fill: "#800020" },
    { name: "Flank", value: countFlankTime, fill: "#007B00" },
    { name: "Dps", value: countDamageTime, fill: "#0088FE" },
  ];

  return (
    <section className="tracker__info__secondary__roles">
      <h3> Rôles jouée</h3>
      <PieChart width={360} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          startAngle={90}
          endAngle={450}
          labelLine={false}
          label={renderCustomizedLabel}
        />
      </PieChart>
    </section>
  );
}

export default TrackerRoleSection;
