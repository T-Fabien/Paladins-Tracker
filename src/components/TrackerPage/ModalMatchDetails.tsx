import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type Props = {
  data: any;
  matchScore: any;
  setModalIsOpen: any;
};

function ModalMatchDetails({ data, matchScore, setModalIsOpen }: Props) {
  const handleRedirectToPlayerProfile = (playerName: any, event:any) => {
    if (event) {
        event.preventDefault();
      }
    window.location.href = `/tracker/${playerName}`;
  };

  return (
    <div className="tracker__modal">
      <div className="tracker__modal__header">
        <p> Match n° {data[0].Match}</p>
        <span
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          X
        </span>
      </div>
      <div className="tracker__modal__presentation">
        <p>
          Durée : {Math.floor(data[0].Time_In_Match_Seconds / 60)}:
          {`${(data[0].Time_In_Match_Seconds % 60)
            .toString()
            .padStart(2, "0")} Min`}
        </p>
        <p className="tracker__modal__presentation__score">{matchScore}</p>
        <p> Région : {data[0].Region}</p>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#23252c",
          color: "white",
        }}
        className="tracker__modal__table"
      >
        <Table aria-label="simple table" id="matchDetails__dataTable">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#23252c",
                "& th": {
                  fontSize: "1.3rem",
                  color: "white",
                },
              }}
            >
              <TableCell align="center">Champion</TableCell>
              <TableCell>Platforme</TableCell>
              <TableCell>Nom du joueur</TableCell>
              <TableCell align="center">KDA</TableCell>
              <TableCell align="center">Dégâts</TableCell>
              <TableCell align="center">Protection</TableCell>
              <TableCell align="center">Soin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((player: any) => {
              return (
                <TableRow
                  key={player.ActivePlayerId}
                  onClick={(e) =>
                    handleRedirectToPlayerProfile(player.playerName,e)
                  }
                  sx={{
                    backgroundColor: "#23252c",
                    borderBottom: "1px solid #fff",
                    cursor: "pointer",
                    "& td": {
                      color: "white",
                      fontSize: "1.15rem",
                      padding: "4px 0",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(5) td": { borderBottom: "5px solid white" },
                  }}
                >
                  <TableCell align="center" className="tracker__modal__table__champion">
                    <div>
                      <img
                        src={
                          "/assets/champion/" +
                          player.Reference_Name.toLowerCase() +
                          ".jpg"
                        }
                        alt=""
                      />
                      <p>{player.Reference_Name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <img
                      src={
                        "/assets/plateforme/" +
                        player.Platform.toLowerCase() +
                        ".png"
                      }
                      alt=""
                      className="tracker__modal__table__platformImg"
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="tracker__modal__table__name"
                  >
                    <div>
                      <img
                        src={
                          "/assets/paladins_rank/" + player.League_Tier + ".png"
                        }
                        alt=""
                        className="tracker__modal__table__name__rankImg"
                      />
                      <div className="tracker__modal__table__name__info">
                        <p className="tracker__modal__table__name__info__player">
                          {player.playerName}
                        </p>
                        <p className="tracker__modal__table__name__info__level">
                          {" "}
                          Niveau {player.Account_Level}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="tracker__modal__table__kda"
                  >
                    <span className="tracker__modal__table__kda__kills">
                      {player.Kills_Player}
                    </span>{" "}
                    /
                    <span className="tracker__modal__table__kda__deaths">
                      {" "}
                      {player.Deaths}
                    </span>{" "}
                    /
                    <span className="tracker__modal__table__kda__assists">
                      {" "}
                      {player.Assists}
                    </span>
                  </TableCell>
                  <TableCell align="center">{player.Damage_Player}</TableCell>
                  <TableCell align="center">
                    {player.Damage_Mitigated}
                  </TableCell>
                  <TableCell align="center">{player.Healing}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ModalMatchDetails;
