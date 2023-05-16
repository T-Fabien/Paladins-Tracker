import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

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

  var countDmgWins: number = 0;
  var countFlankWins: number = 0;
  var countTankWins: number = 0;
  var countSupportWins: number = 0;

  championRank.map((championStats: any) => {
    championRole = champion.championList
      .filter((championInfo: any) =>
        championStats.champion_id.includes(championInfo.id)
      )
      .map((championInfo: any) => championInfo.Roles);

    switch (championRole[0]) {
      case "Paladins Dégâts":
        countDamageTime += championStats.Wins + championStats.Losses;
        countDmgWins += championStats.Wins
        break;
      case "Paladins Flanc":
        countFlankTime += championStats.Wins + championStats.Losses;
        countFlankWins += championStats.Wins
        break;
      case "Paladins Tank":
        countTankTime += championStats.Wins + championStats.Losses;
        countTankWins +=championStats.Wins
        break;
      case "Paladins Soutien":
        countSupportTime += championStats.Wins + championStats.Losses;
        countSupportWins += championStats.Wins
        break;
      default:
        break;
    }
  });

  const data = [
    { name: "Dps", value: countDamageTime ,winrate: countDmgWins/countDamageTime},
    { name: "Flank", value: countFlankTime ,winrate: countFlankWins/countFlankTime},
    { name: "Tank", value: countTankTime ,winrate: countTankWins/countTankTime},
    { name: "Heal", value: countSupportTime ,winrate: countSupportWins/countSupportTime},
  ];

  const total = countDamageTime + countFlankTime + countTankTime + countSupportTime

  return (
    <div className="tracker__main__info__roles">
      <table>
        <thead>
          <tr>
            <th>Rôles</th>
            <th>Nb de Games</th>
            <th>% de pick</th>
            <th>Winrate</th>
          </tr>
        </thead>
        <tbody>

          {
          data.sort(function (a, b) {
            return b.value - a.value;
          }).map((role, key) => {
            return (
              <tr key={key}>
              <td>{role.name}</td>
              <td>{role.value}</td>
              <td>{((role.value / total) *100).toFixed(1) + " %"}</td>
              <td>{(role.winrate*100).toFixed(1)+ " %"}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>

    </div>
  );
}

export default TrackerRoleSection;
