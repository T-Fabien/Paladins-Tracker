import moment from "moment";
import md5 from "md5";

export const getMatchDetails = async (sessionId : any, matchid: number) => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

    // Request
    return fetch(
      "/api/getmatchdetailsjson/" +
      import.meta.env.VITE_DEV_ID +
      "/" +
      md5(
        import.meta.env.VITE_DEV_ID +
          "getmatchdetails" +
          import.meta.env.VITE_DEV_KEY +
          timestamp
      ) +
      "/" +
      sessionId +
      "/" +
      timestamp +
      "/" +
      matchid
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
  