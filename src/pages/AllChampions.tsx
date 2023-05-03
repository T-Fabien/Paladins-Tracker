import { useEffect, useState } from "react";

// Component
import AllChampionsGrid from "../components/AllChampionPage/AllChampionsGrid";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setChampionList } from "../redux/champion";

// API
import { getChampions } from "../api/getChampions";

// data
import { all_champion_list } from "../data/all_champions";

// Helpers
import SessionLoader from "../helper/SessionLoader";

// Icons
import SearchIcon from "@mui/icons-material/Search";

function AllChampionsPage() {
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

  // State
  const [Filter, SetFilter] = useState("");
  const [FilterData, SetFilterData] = useState<any>(champion.value); // Filters the champions according to the user's choice

  useEffect(() => {
    // If no champion data is store and there was no session error (session created) call the api to get the champions
    if (session.id !== "") {
      try {
        getChampions(session.id).then((champion) => {
          SetFilterData(champion);
          dispatch(setChampionList({ championList: champion }));
        });
      } catch (error) {
        SetFilterData(all_champion_list.champions_list);
        dispatch(
          setChampionList({ championList: all_champion_list.champions_list })
        );
        console.log(error);
      }
    }
    // if there is a champion data then just reset the filter
    else {
      SetFilterData(champion.championList);
      if (champion.championList.length == 1) {
        dispatch(
          setChampionList({ championList: all_champion_list.champions_list })
        );
      }
    }
  }, [currentSession]);

  if (champion == undefined || champion.championList == null) {
    dispatch(
      setChampionList({ championList: all_champion_list.champions_list })
    );
    SetFilterData(all_champion_list.champions_list);
  }

  // Champion Filter
  const updateFilter = (role: string, e: any) => {
    document
      .getElementsByClassName("activeFilter")[0]
      .classList.remove("activeFilter");
    var filter_champions = champion.championList;

    if (role === "" || Filter === role) {
      SetFilter("");
      filter_champions = champion.championList;
      document
        .getElementsByClassName("btn-tout")[0]
        .classList.add("activeFilter");
    } else {
      if (Filter !== role) {
        e.target.classList.toggle("activeFilter");
        SetFilter(role);
        filter_champions = champion.championList
          .filter((champion: any) => {
            return champion.Roles.includes(role);
          })
          .sort((a: any, b: any) => {
            return a.rôle > b.rôle ? 1 : a.rôle < b.rôle ? -1 : 0;
          });
      }
    }
    SetFilterData(filter_champions);
  };

  // Search Filter
  const searchFilter = (name: string) => {
    var filter_champions = champion.championList;

    document
      .getElementsByClassName("activeFilter")[0]
      .classList.remove("activeFilter");
    document
      .getElementsByClassName("btn-tout")[0]
      .classList.add("activeFilter");

    if (name === "") {
      SetFilter("");
      filter_champions = champion.championList;
    } else {
      SetFilter(name);
      filter_champions = champion.championList
        .filter((champion: any) => {
          return champion.Name.toLowerCase().includes(name.toLowerCase());
        })
        .sort((a: any, b: any) => {
          return a.rôle > b.rôle ? 1 : a.rôle < b.rôle ? -1 : 0;
        });
    }
    SetFilterData(filter_champions);
  };

  if (champion.championList !== null && champion.championList.length > 50) {
    return (
      <div className="allchampion__page">
        <div className="allchampion__page__filter">
          <div className="allchampion__page__filter__search__container">
            <input
              type="text"
              className="allchampion__page__filter__search__input"
              placeholder="Rechercher..."
              onChange={(e) => searchFilter(e.target.value)}
            />
            <SearchIcon className="allchampion__page__filter__search__icon" />
          </div>
          <div className="allchampion__page__filter__class__container">
            <button
              onClick={(e) => updateFilter("", e)}
              className="btn-tout activeFilter"
            >
              Tout
            </button>
            <button onClick={(e) => updateFilter("Dégâts", e)}>Damage</button>
            <button onClick={(e) => updateFilter("Flanc", e)}>Flank</button>
            <button onClick={(e) => updateFilter("Tank", e)}>Tank</button>
            <button onClick={(e) => updateFilter("Soutien", e)}>Healer</button>
          </div>
        </div>
        <AllChampionsGrid
          data={FilterData}
          champions={champion.championList}
          filter={Filter}
        />
      </div>
    );
  } else {
    return (
      <div className="allchampion__page">
        <div className="allchampion__page__filter">
          <div className="allchampion__page__filter__search__container">
            <input
              type="text"
              className="allchampion__page__filter__search__input"
              placeholder="Rechercher..."
              onChange={(e) => searchFilter(e.target.value)}
            />
            <SearchIcon className="allchampion__page__filter__search__icon" />
          </div>
          <div className="allchampion__page__filter__class__container">
            <button onClick={(e) => updateFilter("", e)}>Tout</button>
            <button onClick={(e) => updateFilter("Dégâts", e)}>Damage</button>
            <button onClick={(e) => updateFilter("Flanc", e)}>Flank</button>
            <button onClick={(e) => updateFilter("Tank", e)}>Tank</button>
            <button onClick={(e) => updateFilter("Soutien", e)}>Healer</button>
          </div>
        </div>
        <div className="champion__grid">
          <div className="loader">
            <div className="loader__ring"></div>
            <span className="loader__text">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default AllChampionsPage;
