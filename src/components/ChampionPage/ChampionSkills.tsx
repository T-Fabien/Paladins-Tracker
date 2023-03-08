import { useState } from "react";


import ChampionSkillItem from "./ChampionSkillsItem";
import ChampionSkillDesc from "./ChampionSkillsItemDesc";

type Props = {
    champion : any;
  };

function ChampionSkills({
    champion,
  }: Props) {

      // State

  // State of the active spell text
  const [activeSpell, setActiveSpell] = useState<any>(champion.Ability_1);

  // State of the active spell image
  const [activeSpellImg, setActiveSpellImg] = useState<any>(
    champion.ChampionAbility1_URL
  );

    // Link the active spell to its description in order to display the spell and its description when you click on its key
  const linkAbilityToDescription = (e: any) => {
    const oldElement: any = document.getElementsByClassName("light_skills");
    oldElement[0].classList.remove("light_skills");

    const target: any = e.currentTarget;
    target.classList.add("light_skills");

    switch (target.id) {
      case "1":
        setActiveSpell(champion.Ability_1);
        setActiveSpellImg(champion.ChampionAbility1_URL);
        break;
      case "2":
        setActiveSpell(champion.Ability_2);
        setActiveSpellImg(champion.ChampionAbility2_URL);
        break;
      case "3":
        setActiveSpell(champion.Ability_3);
        setActiveSpellImg(champion.ChampionAbility3_URL);
        break;
      case "4":
        setActiveSpell(champion.Ability_4);
        setActiveSpellImg(champion.ChampionAbility4_URL);
        break;
      case "5":
        setActiveSpell(champion.Ability_5);
        setActiveSpellImg(champion.ChampionAbility5_URL);
        break;
      default:
        setActiveSpell(champion.Ability_6);
        setActiveSpellImg(champion.ChampionAbility6_URL);
    }
  };


  return (
    <section>
      <div className="champion__page__skills">
        <button
          onClick={linkAbilityToDescription}
          id="1"
          className="champion__page__skills__button light_skills"
        >
          <ChampionSkillItem
            img={champion.ChampionAbility1_URL}
            control="Clic Gauche"
          />
        </button>
        <button onClick={linkAbilityToDescription} id="2" className="champion__page__skills__button">
          <ChampionSkillItem
            img={champion.ChampionAbility2_URL}
            control="Clic Droit"
          />
        </button>
        <button onClick={linkAbilityToDescription} id="3" className="champion__page__skills__button">
          <ChampionSkillItem img={champion.ChampionAbility3_URL} control="A" />
        </button>
        <button onClick={linkAbilityToDescription} id="4" className="champion__page__skills__button">
          <ChampionSkillItem img={champion.ChampionAbility4_URL} control="F" />
        </button>
        <button onClick={linkAbilityToDescription} id="5" className="champion__page__skills__button">
          <ChampionSkillItem img={champion.ChampionAbility5_URL} control="E" />
        </button>
      </div>
      <div className="champion__page__skills__container">
        <ChampionSkillDesc ability={activeSpell} img={activeSpellImg} />
      </div>
    </section>
  );
}

export default ChampionSkills;
