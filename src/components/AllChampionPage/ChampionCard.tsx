import React from 'react';
import { Link } from 'react-router-dom';

import damageIcon from '../../assets/images/paladins_roles_icon/Class_Damage_Icon.png';
import flankIcon from '../../assets/images/paladins_roles_icon/Class_Flank_Icon.png';
import frontlineIcon from '../../assets/images/paladins_roles_icon/Class_Front_Line_Icon.png';
import supportIcon from '../../assets/images/paladins_roles_icon/Class_Support_Icon.png';

type Props = {
  key: number;
  champion_image: string;
  champion: any;
  filter?: boolean;
};

function Champion_Card({ champion_image, champion, filter }: Props) {
  
  let icon;
  switch (champion.Roles) {
    case 'Paladins Dégâts':
      icon = damageIcon;
      break;
    case 'Paladins Flanc':
      icon = flankIcon;
      break;
    case 'Paladins Tank':
      icon = frontlineIcon;
      break;
    case 'Paladins Soutien':
      icon = supportIcon;
      break;
  }
  if (filter === false) {
    return (
      <div className="champion__grid__card card__nofiltered">
        <Link to={`/${champion.Name}`} state={{ paladins_champion: champion}}>
          <img src={champion_image} alt="" className="champion__grid__card__championimage" />
          <div>
            <img src={icon} alt="" className="champion__grid__card__classicon" />
            <p>{champion.Name}</p>
          </div>
        </Link>
      </div>
    );
  } else {
    return (
        <div className="champion__grid__card">
        <Link to={'/champions/'+ champion.Name} state={{ paladins_champion: champion }}>
          <img src={champion_image} alt="" className="champion__grid__card__championimage" />
          <div>
            <img src={icon} alt="" className="champion__grid__card__classicon" />
            <p>{champion.Name}</p>
          </div>
        </Link>
      </div>
      );
  }
}

export default Champion_Card;
