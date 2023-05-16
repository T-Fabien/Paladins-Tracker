import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

import { useTable } from "react-table";

type Props = {
  data: any;
  championList: any;
};

function ChampionDataTable({ data, championList }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  return (
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
        id="champion__dataTable"
        style={{display: "none"}}
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
            <TableCell align="center"> Champion </TableCell>
            <TableCell align="center"> Niveau </TableCell>
            <TableCell align="center"> Temps de jeu </TableCell>
            <TableCell align="center"> KDA </TableCell>
            <TableCell align="center"> Winrate </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((champion: any) => {
            var time = champion.Minutes
            var hours = Math.floor((time/60));
            var minutes = Math.round(((time/60) - hours) * 60)
            time = hours + " H " + minutes + " min"

            var championImg = championList.filter((championInfo: any) => {
              return championInfo.id == champion.champion_id;
            });

            return (
              <TableRow
                key={champion.champion_id}
                sx={{
                  backgroundColor: "#23252c",
                  borderRight: "3px solid #008ace",
                  borderLeft: "3px solid #008ace",
                  borderBottom: "3px solid #008ace",
                  "& td": {
                    fontSize: "1.25rem",
                    color: "white",
                  },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                className="tracker__info__datatable__champion"
              >
                <TableCell>
                  <div className="tracker__info__datatable__championcell">
                    <img
                      src={championImg[0].ChampionIcon_URL}
                      alt=""
                      className="tracker__info__datatable__championcell__img"
                    />
                    <div>
                      <h5 className="tracker__info__datatable__championcell__name">
                      {champion.champion}
                      </h5>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center">
                {champion.Rank}
                </TableCell>
                <TableCell align="center">
                {time}
                </TableCell>
                <TableCell align="center">
                <p>{((champion.Kills + 0.5*champion.Assists)/champion.Deaths).toFixed(2)}</p>
                </TableCell>
                <TableCell align="center">
                <p>{(champion.Wins/(champion.Wins + champion.Losses)*100).toFixed(1)} %</p>
                </TableCell>
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
  );
}

export default ChampionDataTable;
