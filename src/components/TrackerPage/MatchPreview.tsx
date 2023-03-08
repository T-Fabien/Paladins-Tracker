import React, { useEffect, useState } from "react";
import { getChampionCards } from "../../api/getChampionCards";

type Props = {
  match: any;
  championId: number;
  championImg: any;
};

function MatchPreview({ match, championImg }: Props) {

  // Diff time between match and current time
  var matchTime = new Date(match.Match_Time);
  var diffInMilliseconds = new Date().getTime() - matchTime.getTime();
  var diffTime;

  // Diff In Month
  var diffInMonth = (new Date().getFullYear() - matchTime.getFullYear()) * 12;
  diffInMonth -= matchTime.getMonth() + 1;
  diffInMonth += new Date().getMonth();
  diffInMonth = diffInMonth <= 0 ? 0 : diffInMonth;

  // Set the time diff
  if (diffInMonth > 0) {
    diffTime = diffInMonth + " Mois";
  } else if (Math.floor(diffInMilliseconds / (1000 * 60 * 60)) >= 24) {
    diffTime =
      Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + " Jours";
  } else if (Math.floor(diffInMilliseconds / (1000 * 60 * 60)) >= 1) {
    diffTime = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) + " Heures";
  } else {
    diffTime =
      Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + " Minutes";
  }

  return (
    <>
      <div
        className={`tracker__info__match__preview__header match__preview__${match.Win_Status}`}
      >
        <p>
          {match.Queue} - Il y a {diffTime}
        </p>
        {match.Win_Status === "Win" ? (
          <p>
            Score : {Math.max(match.Team1Score, match.Team2Score)} -
            {" " + Math.min(match.Team1Score, match.Team2Score)}
          </p>
        ) : (
          <p>
            Score : {Math.min(match.Team1Score, match.Team2Score)} -
            {" " + Math.max(match.Team1Score, match.Team2Score)}
          </p>
        )}
        <p>
          Durée : {" " + Math.floor(match.Time_In_Match_Seconds / 60)}:
          {match.Time_In_Match_Seconds % 60} Min
        </p>
        <p> Gold : {match.Gold}</p>
        <a href={`/tracker/${match.Match}`}> Détails du Match</a>
      </div>
      <div className="tracker__info__match__preview__body">
        <div className="tracker__info__match__preview__body__champion">
          <img src={championImg} alt="" />
          <p>{match.Champion}</p>
        </div>
        <div className="tracker__info__match__preview__body__stats">
          <p className="tracker__info__match__preview__body__ratio">
            {match.Kills} / {match.Deaths} / {match.Assists}
          </p>
          <p className="tracker__info__match__preview__body__kda">
            {((match.Kills + 0.5 * match.Assists) / match.Deaths).toFixed(2)}{" "}
            KDA
          </p>
        </div>
      </div>
    </>
  );
}

export default MatchPreview;
