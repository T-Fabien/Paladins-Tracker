import React from "react";

// Material UI icons
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

type Props = {
  champion_name: string;
  champion_health: string;
  champion_lore: string;
  stars: any[];
  icon: any;
  role: any;
};

function HeroBanner({
  champion_name,
  champion_health,
  champion_lore,
  stars,
  icon,
  role,
}: Props) {
    return (
        <div className="champion__page__presentation">
          <img
            className="champion__page__presentation__background"
            src={"/assets/paladins_champ_background/" + champion_name + ".jpg"}
            alt=""
          />
          <div className="champion__page__presentation__description">
            <h1 className="champion__page__presentation__description__name"> {champion_name.toUpperCase()} </h1>
            <p className="champion__page__presentation__description__lore champion__page__presentation__text">{champion_lore}</p>
            <div className="champion__page__presentation__description__class">
              <img
                className="champion__page__presentation__description__class__icon"
                src={icon}
                alt=""
              />
              <p className="champion__page__presentation__description__class__icon__role champion__page__presentation__text">{role}</p>
            </div>
            <p className="champion__page__presentation__health champion__page__presentation__text">
              Point de Vie : {champion_health} HP
            </p>
            <p className="champion__page__presentation__difficulty champion__page__presentation__text">
              Difficulté : 
              {stars.map((starType: string, key) =>
                starType === "Star" ? (
                  <StarIcon key={key} style={{ color: "gold" }} />
                ) : (
                  <StarBorderIcon key={key} />
                )
              )}
            </p>
          </div>
        </div>
      );
}

export default HeroBanner