import React from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart } from "recharts";

type Props = {
  championRank: any;
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
    .filter((championInfo: any) => championStats.champion_id.includes(championInfo.id))
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
    { name: "Damage", value: countDamageTime },
    { name: "Flank", value: countFlankTime },
    { name: "Tank", value: countTankTime },
    { name: "Heal", value: countSupportTime },
  ];

  const COLORS = ["#0088FE", "#228b22", "#800020 ", "#e86100"];

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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "middle" : "middle"}
        dominantBaseline="central"
        width="10px"
      >
        {name}
        <tspan x={x} dy="18px">
          {" "}
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
      </text>
    );
  };

  return (
    <section className="tracker__info__secondary__actual__season">
      <h3> Rôles jouée</h3>
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx="100px"
          cy="10px"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </section>
  );
}

export default TrackerRoleSection;
