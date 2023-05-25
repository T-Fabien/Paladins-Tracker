// DataTables
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import TableFooter from "@mui/material/TableFooter";
import { TablePagination } from "@mui/material";
import KdaHorizontalBar from "../Recharts/KdaHorizontalBar";
import SessionLoader from "../../helper/SessionLoader";
import { getMatchDetails } from "../../api/getMatchDetails";
import { useDispatch, useSelector } from "react-redux";
import { ping } from "../../api/ping";
import { createSession } from "../../api/createSession";
import { setSessionId } from "../../redux/session";
import { testSession } from "../../api/testSession";
import ModalMatchDetails from "./ModalMatchDetails";

type Props = {
  data: any;
  championList: any;
};

function MatchDataTable({ data, championList }: Props) {
  const session = useSelector((state: any) => state.session.value);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [matchInfo, setMatchInfo] = useState<any>();
  const [matchScore, setMatchScore] = useState<any>();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getMatchData = (sessionId: any, match: any) => {
    getMatchDetails(sessionId, match.Match).then((matchid) => {
      setMatchInfo(matchid);
    });
  };

  // Detail Match Modal

  const handleClickOpen = (match: any) => {
    if (session.id == "") {
      try {
        ping().then((ping) => {
          if (ping) {
            createSession().then((session) => {
              dispatch(setSessionId({ id: session.session_id }));
              getMatchData(session.session_id, match);
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
            getMatchData(session.session_id, match);
          });
        } else {
          getMatchData(session.id, match);
        }
      });
    }
    console.log(matchInfo);
    if(match.Win_Status === "Win"){
      setMatchScore(
        Math.max(match.Team1Score, match.Team2Score) +
      " - " + Math.min(match.Team1Score, match.Team2Score))
    } else {
      setMatchScore(
        Math.min(match.Team1Score, match.Team2Score) +
      " - " + Math.max(match.Team1Score, match.Team2Score))
    }
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#23252c",
          color: "white",
        }}
        className="tracker__info__datatable"
      >
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
          id="match__dataTable"
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#23252c",
                border: "3px solid #008ace",
                "& th": {
                  fontSize: "1.25rem",
                  color: "white",
                },
              }}
            >
              <TableCell align="center" width={150}>
                Résultat
              </TableCell>
              <TableCell align="center">Champion</TableCell>
              <TableCell align="center">Mode de jeu</TableCell>
              <TableCell align="center" width={150}>
                K / D / A
              </TableCell>
              <TableCell align="center">Dégâts</TableCell>
              <TableCell align="center">Protection</TableCell>
              <TableCell align="center">Soin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((match: any) => {
              var championImg = championList.filter((champion: any) => {
                return champion.id == match.ChampionId;
              });
              // Diff time between match and current time
              var matchTime = new Date(match.Match_Time);
              var diffInMilliseconds =
                new Date().getTime() - matchTime.getTime();
              var diffTime;

              // Diff In Month
              var diffInMonth =
                (new Date().getFullYear() - matchTime.getFullYear()) * 12;
              diffInMonth -= matchTime.getMonth() + 1;
              diffInMonth += new Date().getMonth();
              diffInMonth = diffInMonth <= 0 ? 0 : diffInMonth;

              // Set the time diff
              if (diffInMonth > 0) {
                diffTime = diffInMonth + " Mois";
              } else if (
                Math.floor(diffInMilliseconds / (1000 * 60 * 60)) >= 24
              ) {
                diffTime =
                  Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) +
                  " Jours";
              } else if (
                Math.floor(diffInMilliseconds / (1000 * 60 * 60)) >= 1
              ) {
                diffTime =
                  Math.floor(diffInMilliseconds / (1000 * 60 * 60)) + " heures";
              } else {
                diffTime =
                  Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) +
                  " Minutes";
              }

              return (
                <TableRow
                  key={match.Match}
                  sx={{
                    backgroundColor: "#23252c",
                    borderRight: "3px solid #008ace",
                    borderLeft: "3px solid #008ace",
                    borderBottom: "3px solid #008ace",
                    cursor: "pointer",
                    "& td": {
                      fontSize: "1.25rem",
                      color: "white",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  className="tracker__info__datatable__match"
                  onClick={() => handleClickOpen(match)}
                >
                  {match.Win_Status === "Win" ? (
                    <TableCell>
                      <div className="tracker__info__datatable__result">
                        <p className="tracker__info__datatable__result__win">
                          Victoire{" "}
                          {Math.max(match.Team1Score, match.Team2Score)} -
                          {" " + Math.min(match.Team1Score, match.Team2Score)}
                        </p>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <div className="tracker__info__datatable__result">
                        <p className="tracker__info__datatable__result__losses">
                          Défaite {Math.min(match.Team1Score, match.Team2Score)}{" "}
                          -{" " + Math.max(match.Team1Score, match.Team2Score)}
                        </p>
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="tracker__info__datatable__championcell">
                      <img
                        src={championImg[0].ChampionIcon_URL}
                        alt=""
                        className="tracker__info__datatable__championcell__img"
                      />
                      <div>
                        <h5 className="tracker__info__datatable__championcell__name">
                          {match.Champion}
                        </h5>
                        <p> Il y a {diffTime}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <p>{match.Queue}</p>
                    <p>
                      {Math.floor(match.Time_In_Match_Seconds / 60)}:
                      {`${(match.Time_In_Match_Seconds % 60)
                        .toString()
                        .padStart(2, "0")} Min`}
                    </p>
                  </TableCell>

                  <TableCell align="center">
                    <div className="tracker__info__datatable__kdacell">
                      <p>
                        <span className="tracker__info__datatable__kdacell__kill">
                          {match.Kills}
                        </span>{" "}
                        /{" "}
                        <span className="tracker__info__datatable__kdacell__death">
                          {match.Deaths}
                        </span>{" "}
                        /{" "}
                        <span className="tracker__info__datatable__kdacell__assist">
                          {match.Assists}
                        </span>
                      </p>
                      <KdaHorizontalBar
                        kill={match.Kills}
                        assist={match.Assists}
                        death={match.Deaths}
                        width={140}
                      />
                      <p>
                        {(
                          (match.Kills + 0.5 * match.Assists) /
                          match.Deaths
                        ).toFixed(2)}{" "}
                        KDA
                      </p>
                    </div>
                  </TableCell>
                  <TableCell align="center">{match.Damage}</TableCell>
                  <TableCell align="center">{match.Damage_Mitigated}</TableCell>
                  <TableCell align="center">{match.Healing}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow
              sx={{
                border: "3px solid #008ace",
                color: "white",
                "& td": {
                  fontSize: "1.25rem",
                  color: "white",
                },
                "& svg": {
                  fill: "white",
                },
              }}
            >
              <TablePagination
                rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {modalIsOpen && matchInfo && (
        <ModalMatchDetails
        data={matchInfo}
        matchScore={matchScore}
        setModalIsOpen={handleCloseModal}
        />
      )}
    </div>
  );
}

export default MatchDataTable;
function getAllData(session_id: any) {
  throw new Error("Function not implemented.");
}
