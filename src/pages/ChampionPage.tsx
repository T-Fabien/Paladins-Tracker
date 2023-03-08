import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// API
import { getChampionCards } from "../api/getChampionCards";

// Component
import HeroBanner from "../components/ChampionPage/HeroBanner";
import ChampionSkills from "../components/ChampionPage/ChampionSkills";

// Class Icon
import damageIcon from "../assets/images/paladins_roles_icon/Class_Damage_Icon.png";
import flankIcon from "../assets/images/paladins_roles_icon/Class_Flank_Icon.png";
import frontlineIcon from "../assets/images/paladins_roles_icon/Class_Front_Line_Icon.png";
import supportIcon from "../assets/images/paladins_roles_icon/Class_Support_Icon.png";

// Time logo
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// File
import { champions_data } from "../data/champions_data.js";

// Helper
import SessionLoader from "../helper/SessionLoader";

function ChampionPage() {
  // Load the Session
  var currentSession = SessionLoader();
  const location = useLocation();
  const champion: any = location.state;

  // All the cards and legendary of the champion
  const [championCards, setChampionCards] = useState<any>();

  // Get the information (Difficulties) from the champion
  const data: any = champions_data.champions.filter((champions: any) => {
    return champions.name === champion.paladins_champion.Name;
  });

  useEffect(() => {
    // Get the information of the champion with its id
      getChampionCards(champion.paladins_champion.id).then((championscards) => {
        if(championscards.data.length > 1)
        {
          setChampionCards(championscards);
        }   
      });
  }, []);

  // Link the class of the champion to its icon
  var icon;
  var role;
  switch (champion.paladins_champion.Roles) {
    case "Paladins Dégâts":
      icon = damageIcon;
      role = "Dégâts";
      break;
    case "Paladins Flanc":
      icon = flankIcon;
      role = "Flanc";
      break;
    case "Paladins Tank":
      icon = frontlineIcon;
      role = "Tank";
      break;
    case "Paladins Soutien":
      icon = supportIcon;
      role = "Soutien";
      break;
  }

  // Difficulty rating system
  const maxRating = 5;

  let stars = new Array(maxRating);

  if (data.length > 0) {
    stars.fill("Star", 0, parseInt(data[0].difficulty));
    stars.fill("StarOutlineIcon", parseInt(data[0].difficulty));
  }

  // Description Legendary Cards
  var categorie = "";
  var description = "";

  // Sort Common Cards
  var commonCards: Array<any> = [];
  if(championCards && championCards.data.length > 1){
    
    championCards.data.map((championcard: any) => {
      if (championcard.rarity.includes("Common")) {
        commonCards.push(championcard);
      }
    });
  
    commonCards.sort((a: any, b: any) =>
      a.card_description.localeCompare(b.card_description)
    );
  }
  

  if (championCards !== undefined && championCards.data.length > 1) {    
    return (
      <section className="champion__page">
        <HeroBanner
          champion_name={champion.paladins_champion.Name}
          champion_lore={champion.paladins_champion.Lore}
          champion_health={champion.paladins_champion.Health}
          stars={stars}
          icon={icon}
          role={role}
        />
        <h2 className="champion__page__skills__title"> Capacités </h2>
        <ChampionSkills champion={champion.paladins_champion} />

        <div className="champion__page__cards__legendary">
          {championCards &&
            championCards.data.map((championcard: any) => {
              if (championcard.rarity.includes("Legendary")) {
                try {
                  categorie = championcard.card_description
                    .split("]")[0]
                    .substring(1);
                  description = championcard.card_description
                    .split("]")[1]
                    .substring(1);
                } catch (error) {
                  console.log(error);
                }

                return (
                  <div
                    key={championcard.card_id1}
                    className="champion__page__cards__legendary__container"
                  >
                    <img
                      src={championcard.championTalent_URL}
                      alt=""
                      className="champion__page__cards__legendary__container__img"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://placehold.co/192x192";
                      }}
                    />
                    <h3 className="champion__page__cards__legendary__container__title">
                      {championcard.card_name}
                    </h3>
                    <p
                      className={
                        "champion__page__cards__legendary__container__text"
                      }
                    >
                      <span>{categorie} </span>: {description}
                    </p>
                  </div>
                );
              }
            })}
        </div>
        <table className="champion__page__cards__common__table">
          <thead>
            <tr>
              <th> Nom </th>
              <th> Image </th>
              <th> Catégorie </th>
              <th> Description </th>
              <th> Coolodwn </th>
            </tr>
          </thead>
          <tbody>
            {championCards &&
              championCards.data.length > 0 &&
              commonCards.map((championcard: any) => {
                try {
                  categorie = championcard.card_description
                    .split("]")[0]
                    .substring(1);
                  description = championcard.card_description
                    .split("]")[1]
                    .substring(1);
                } catch (error) {
                  console.log(error);
                }

                return (
                  <tr key={championcard.card_id1}>
                    <td className="champion__page__cards__common__table__name">
                      {championcard.card_name}
                    </td>
                    <td>
                      <img src={championcard.championCard_URL} alt="" />
                    </td>
                    <td>{categorie}</td>
                    <td>{description}</td>
                    {championcard.recharge_seconds > 0 ? (
                      <td className="champion__page__cards__common__table__cooldown">
                        <span>{championcard.recharge_seconds} </span>{" "}
                        <AccessTimeIcon />
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default ChampionPage;
