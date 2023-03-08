type Props = {
  img: string;
  control: string;
};

function ChampionSkillsItem({ img, control }: Props) {

  return (
    <div className="champion__page__skills__button__container" >
      <img src={img} alt="" className="champion__page__skills__button__container__image"/>
      <p className="champion__page__skills__button__container__text">{control}</p>
    </div>
  );
}

export default ChampionSkillsItem;
