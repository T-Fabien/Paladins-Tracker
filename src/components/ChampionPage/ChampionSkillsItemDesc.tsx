import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Props = {
  ability: any;
  img: string;
};

function ChampionSkillsItemDesc({ ability, img }: Props) {
  const description = ability.Description.split("<br>").join("");

  return (
    <>
      <div className="champion__page__skills__container__description">
        <img src={img} alt="" className="champion__page__skills__container__description__img"/>
        <div className="champion__page__skills__container__description__content">
          <h3 className="champion__page__skills__container__description__content__title">{ability.Summary}</h3>
          {ability.damageType === "AoE" && (
            <h4 className="champion__page__skills__container__description__content__dmgtype"> Zone</h4>
          )}
          {ability.damageType !== true &&
            (ability.damageType !== false && ability.damageType !== "AoE" && (
              <h4 className="champion__page__skills__container__description__content__dmgtype">{ability.damageType}</h4>
            ))}
          <p className="champion__page__skills__container__description__content__text">{description}</p>
        </div>
      </div>
      {ability.rechargeSeconds !== 0 && (
        <div className="champion__page__skills__container__cooldown">
          <AccessTimeIcon />
          <p>{ability.rechargeSeconds} s</p>
        </div>
      )}
    </>
  );
}

export default ChampionSkillsItemDesc;
