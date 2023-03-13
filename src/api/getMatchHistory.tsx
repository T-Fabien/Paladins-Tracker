import moment from "moment";
import md5 from "md5";

export const getMatchHistory = async (sessionId : any, playerid: number) => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

    // Request
    return fetch(
      "/api/getmatchhistoryjson/" +
      import.meta.env.VITE_DEV_ID +
      "/" +
      md5(
        import.meta.env.VITE_DEV_ID +
          "getmatchhistory" +
          import.meta.env.VITE_DEV_KEY +
          timestamp
      ) +
      "/" +
      sessionId +
      "/" +
      timestamp +
      "/" +
      playerid
      ).then((response) => {
      try {
        // If Server Error
        if (response.status >= 400) {
          return response.text().then(() => {
            throw new Error("Server responds with error!");
          });
        }
        // Return data
        return response.json();
      } catch (err) {
        console.log(err);
      }
    });
  };
  