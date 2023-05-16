import React from "react";

import ChampionCard from "./ChampionCard";

type Props = {
  data: any;
  champions: any;
  filter: string;
};

function AllChampionsGrid({ data, champions, filter }: Props) {
  let nofilter_champion: Array<any> = [];

  if (
    filter == "Dégâts" ||
    filter == "Flanc" ||
    filter == "Tank" ||
    filter == "Soutien"
  ) {
    champions.filter((champion: any) => {
      if (!champion.Roles.includes(filter)) {
        nofilter_champion.push(champion);
      }
    });
  }
    return (
      <div className="champion__grid">
        {data && data.map((champ: any, key: number) => {
          return (
            <ChampionCard
              key={key}
              champion_image={champ.ChampionIcon_URL}
              champion={champ}
            />
          );
        })}
        {nofilter_champion.map((champ, key) => {
          return (
            <ChampionCard
              key={key}
              champion_image={champ.ChampionIcon_URL}
              champion={champ}
              filter={false}
            />
          );
        })}
      </div>
    );
  }

export default AllChampionsGrid;
