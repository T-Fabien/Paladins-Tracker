import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChampions } from "../api/getChampions";
import SessionLoader from "../helper/SessionLoader";
import { setChampionList } from "../redux/champion";
import { all_champion_list } from "../data/all_champions";

function Tierlist() {
  // Load the Session
  var currentSession: any;
  try {
    currentSession = SessionLoader();
  } catch (error) {
    console.log(error);
  }

  const session = useSelector((state: any) => state.session.value);
  const champion = useSelector((state: any) => state.champion.value);
  const dispatch = useDispatch();

  // Tier List
  var tierS: any = [
    "Inara",
    "Grover",
    "Khan",
    "Cassie",
    "Lillith",
    "Evie",
    "Jenos",
    "Azaan",
  ];
  var tierA: any = [
    "VII",
    "Ash",
    "Seris",
    "Furia",
    "Bomb King",
    "Fernando",
    "Saati",
    "Androxus",
    "Makoa",
    "Torvald",
    "Mal'Damba",
    "Tiberius",
    "Koga",
    "Imani",
    "Barik",
  ];
  var tierB: any = [
    "Zhin",
    "Vatu",
    "Vora",
    "Dredge",
    "Ying",
    "Atlas",
    "Corvus",
    "Lian",
    "Maeve",
    "Tyra",
    "Buck",
    "Willo",
    "Rei",
    "Caspian",
    "Nyx",
    "Io",
    "Kinessa",
    "Strix",
  ];
  var tierC: any = [
    "Lex",
    "Betty la Bomba",
    "Ruckus",
    "Pip",
    "Talus",
    "Drogoz",
    "Sha Lin",
    "Viktor",
    "Grohk",
    "Terminus", 
  ];
  var tierD: any = [
    "Yagorath",
    "Skye", 
    "Moji", 
    "Raum",
    "Octavia",
    ];
  var tierE: any = [
    "Kasumi", 
    "Vivian"
];

  useEffect(() => {
    // If no champion data is store and there was no session error (session created) call the api to get the champions
    if (session.id !== "") {
      try {
        getChampions(session.id).then((champion) => {
          dispatch(setChampionList({ championList: champion }));
        });
      } catch (error) {
        dispatch(
          setChampionList({ championList: all_champion_list.champions_list })
        );
        console.log(error);
      }
    }
    // if there is a champion data then just reset the filter
    else {
      if (champion.championList == null || champion.championList.length == 1) {
        dispatch(
          setChampionList({ championList: all_champion_list.champions_list })
        );
      }
    }
  }, [currentSession]);

  return (
    <div>
      <table className="tierlist__page__table">
        <tbody>
          <tr>
            <td className="tierlist__page__table__tierS">S</td>
            <td className="tierlist__page__table__champtier">
              {tierS.map((name: any, key: any) => {
                return (
                  <div>
                    <img
                      key={key}
                      className="tierlist__page__table__champtier__image"
                      src={"/assets/champion/" + name.toLowerCase() + ".jpg"}
                      alt=""
                    />
                    <p className="tierlist__page__table__champtier__name">
                      {name}
                    </p>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className="tierlist__page__table__tierA">A</td>
            <td className="tierlist__page__table__champtier">
              {tierA.map((name: any, key: any) => {
                return (
                  <div>
                    <img
                      key={key}
                      className="tierlist__page__table__champtier__image"
                      src={"/assets/champion/" + name.toLowerCase() + ".jpg"}
                      alt=""
                    />
                    <p className="tierlist__page__table__champtier__name">
                      {name}
                    </p>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className="tierlist__page__table__tierB">B</td>
            <td className="tierlist__page__table__champtier">
              {tierB.map((name: any, key: any) => {
                return (
                  <div>
                    <img
                      key={key}
                      className="tierlist__page__table__champtier__image"
                      src={"/assets/champion/" + name.toLowerCase() + ".jpg"}
                      alt=""
                    />
                    <p className="tierlist__page__table__champtier__name">
                      {name}
                    </p>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className="tierlist__page__table__tierC">C</td>
            <td className="tierlist__page__table__champtier">
              {tierC.map((name: any, key: any) => {
                return (
                  <div>
                    <img
                      key={key}
                      className="tierlist__page__table__champtier__image"
                      src={"/assets/champion/" + name.toLowerCase() + ".jpg"}
                      alt=""
                    />
                    <p className="tierlist__page__table__champtier__name">
                      {name}
                    </p>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className="tierlist__page__table__tierD">D</td>
            <td className="tierlist__page__table__champtier">
              {tierD.map((name: any, key: any) => {
                return (
                  <div>
                    <img
                      key={key}
                      className="tierlist__page__table__champtier__image"
                      src={"/assets/champion/" + name.toLowerCase() + ".jpg"}
                      alt=""
                    />
                    <p className="tierlist__page__table__champtier__name">
                      {name}
                    </p>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className="tierlist__page__table__tierE">E</td>
            <td className="tierlist__page__table__champtier">
              {tierE.map((name: any, key: any) => {
                return (
                  <div>
                    <img
                      key={key}
                      className="tierlist__page__table__champtier__image"
                      src={"/assets/champion/" + name.toLowerCase() + ".jpg"}
                      alt=""
                    />
                    <p className="tierlist__page__table__champtier__name">
                      {name}
                    </p>
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tierlist;
