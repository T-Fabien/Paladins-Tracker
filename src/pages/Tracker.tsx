import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import { ping } from "../api/ping";
import { createSession } from "../api/createSession";
import { testSession } from "../api/testSession";

import { getChampions } from "../api/getChampions";

import { getPlayer } from "../api/getPlayer";
import { getMatchHistory } from "../api/getMatchHistory";
import { getChampionRanks } from "../api/getChampionRanks";

// Component
import TrackerMainInfo from "../components/TrackerPage/MainInfo";
import TrackerSecondaryInfo from "../components/TrackerPage/ActualSeason";

// Redux
import { setSessionId } from "../redux/session";
import { useDispatch, useSelector } from "react-redux";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import MatchDataTable from "../components/TrackerPage/MatchDataTable";
import { setChampionList } from "../redux/champion";
import ChampionDataTable from "../components/TrackerPage/ChampionDataTable";

function Tracker() {
  const session = useSelector((state: any) => state.session.value);
  const champion = useSelector((state: any) => state.champion.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [player, setPlayer] = useState<any>("");
  const [matchList, setMatchList] = useState<any>();
  const [playerChampionRank, setPlayerChampionRank] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const [inputValue, setInputValue] = useState(location.pathname.substring(9));

  useEffect(() => {
    if (location.pathname.substring(9)) {
      testAndGetProfile(undefined);
    } else {
      setPlayer(undefined)
    }
  }, []);

  // Fonction
  const getAllData = (sessionId: any) => {

    getPlayer(sessionId, inputValue)
      .then((playerdata) => {
        if (playerdata !== undefined && playerdata.length > 0) {
          setPlayer(playerdata);
          getChampionRanks(sessionId, playerdata[0].ActivePlayerId).then(
            (championRank) => {
              setPlayerChampionRank(championRank);
            }
          );
          getMatchHistory(sessionId, playerdata[0].ActivePlayerId).then(
            (matchHistory) => {
              setMatchList(matchHistory);
            }
          );
        } else {
          setPlayer("erreur");
        }
      })
      .then(() => {
        if (champion.championList == null) {
          try {
            getChampions(sessionId).then((champion) => {
              dispatch(setChampionList({ championList: champion }));
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
      setTimeout(() => {
        setIsLoaded(true);
      }, 1900); // Mettre le temps en millisecondes
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const testAndGetProfile = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    if (
      inputValue == location.pathname.substring(9) && !event
    ){
      setIsLoaded(false)
      // Load the Session
      if (session.id == "") {
        try {
          ping().then((ping) => {
            if (ping) {
              createSession().then((session) => {
                dispatch(setSessionId({ id: session.session_id }));
                getAllData(session.session_id);
              });
            }
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        testSession(session.id).then((test) => {
          if (test !== undefined) {
            createSession().then((session) => {
              dispatch(setSessionId({ id: session.session_id }));
              getAllData(session.session_id);
            });
          } else {
            getAllData(session.id);
          }
        });
      }
      navigate(`/tracker/${inputValue}`);
    }
  };

  const profileRedirect = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    window.location.href = `/tracker/${inputValue}`;
  }

  const updateDataTable = (tableName: string, e :any) => {

    // Get the new Active DataTable 
    var showTable = document.getElementById(tableName)


    // Remove Previous Active DataTable
    document.getElementsByClassName("activeDataTable")[0].classList.remove("activeDataTable");

    
    if (showTable) {
      // Active DataTable & Button style
      showTable.style.display = "table";
      e.target.classList.toggle("activeDataTable");

      var hideTable;

      // Remove other DataTable
      switch (tableName) {
        case "match__dataTable":
            hideTable = document.getElementById("champion__dataTable")
            if(hideTable) {
              hideTable.style.display = "none"
            }
        break;
        case "champion__dataTable":
            hideTable = document.getElementById("match__dataTable");
            if(hideTable) {
              hideTable.style.display = "none"
            }
          break;
        default:
          break;
      }
      
    }
  }

  if (
    player !== undefined &&
    player.ret_msg == null &&
    matchList !== undefined &&
    matchList[0].Champion !== null &&
    champion.championList !== null &&
    playerChampionRank !== undefined &&
    playerChampionRank !== null &&
    isLoaded == true
  ) {
    return (
      <div className="tracker">
        <form className="tracker__form" action="" onSubmit={profileRedirect}>
          <label htmlFor="">
            <input
              className="tracker__form__search__input"
              type="text"
              id="input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <SearchIcon className="tracker__form__search__icon" />
          </label>
          <label htmlFor="">
            <input type="submit" id="post" value="Envoyer" />
          </label>
        </form>

        <TrackerMainInfo player={player[0]} championRank={playerChampionRank} />
        <section className="tracker__info">
          <TrackerSecondaryInfo
            player={player[0]}
            championRank={playerChampionRank}
          />
          <div>
          <div className="tracker__dataTableFilter">
        <button onClick={(e) => updateDataTable("match__dataTable", e)} className="activeDataTable">Historique</button>
        <button onClick={(e) => updateDataTable("champion__dataTable", e)}>Champion</button>

        </div>
          <MatchDataTable data={matchList} championList={champion.championList} />
          <ChampionDataTable data={playerChampionRank} championList={champion.championList} />
          </div>
        </section>
      </div>
    );
  } else if (player == "erreur") {
    return (
      <div className="tracker">
        <form className="tracker__form" action="" onSubmit={profileRedirect}>
          <label htmlFor="">
            <input
              className="tracker__form__search__input"
              type="text"
              id="input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <SearchIcon className="tracker__form__search__icon" />
          </label>
          <label htmlFor="">
            <input type="submit" id="post" value="Envoyer" />
          </label>
        </form>
        <p> Une erreur est survenu </p>
      </div>
    );
  } else if (isLoaded == false) {
    return (
      <div className="tracker">
        <form className="tracker__form" action="" onSubmit={profileRedirect}>
          <label htmlFor="">
            <input
              className="tracker__form__search__input"
              type="text"
              id="input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <SearchIcon className="tracker__form__search__icon" />
          </label>
          <label htmlFor="">
            <input type="submit" id="post" value="Envoyer" />
          </label>
        </form>
        <div className="loader">
          <div className="loader__ring"></div>
          <span className="loader__text">Chargement...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="tracker">
        <form className="tracker__form" action="" onSubmit={profileRedirect}>
          <label htmlFor="">
            <input
              className="tracker__form__search__input"
              type="text"
              id="input"
              value={inputValue}
              onChange={handleInputChange}
            />
            <SearchIcon className="tracker__form__search__icon" />
          </label>
          <label htmlFor="">
            <input type="submit" id="post" value="Envoyer" />
          </label>
        </form>
      </div>
    );
  }
}

export default Tracker;
