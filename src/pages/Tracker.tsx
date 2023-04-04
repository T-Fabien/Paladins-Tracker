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
import TrackerMainInfo from "../components/TrackerPage/TrackerMainInfo";
import TrackerSecondaryInfo from "../components/TrackerPage/TrackerSecondaryInfo";

// Redux
import { setSessionId } from "../redux/session";
import { useDispatch, useSelector } from "react-redux";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../components/TrackerPage/DataTable";
import { setChampionList } from "../redux/champion";

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
      handleSubmit(undefined);
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
              console.log(championRank);
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

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    if (
      inputValue == location.pathname.substring(9) && !event ||
      inputValue !== location.pathname.substring(9) && event
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
        <form className="tracker__form" action="" onSubmit={handleSubmit}>
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

        <TrackerMainInfo player={player[0]} />
        <section className="tracker__info">
          <TrackerSecondaryInfo
            player={player[0]}
            championRank={playerChampionRank}
          />
          <DataTable data={matchList} championList={champion.championList} />
        </section>
      </div>
    );
  } else if (player == "erreur") {
    return (
      <div className="tracker">
        <form className="tracker__form" action="" onSubmit={handleSubmit}>
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
        <form className="tracker__form" action="" onSubmit={handleSubmit}>
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
        <form className="tracker__form" action="" onSubmit={handleSubmit}>
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
