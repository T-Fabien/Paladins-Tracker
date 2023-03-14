import moment from "moment";
import md5 from "md5";

export const getPlayer = async (sessionId: any, player: string) => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

  // Request
  return fetch(
    "/api" +
    "/getplayerjson/" +
    import.meta.env.VITE_DEV_ID +
      "/" +
      md5(
        import.meta.env.VITE_DEV_ID +
          "getplayer" +
          import.meta.env.VITE_DEV_KEY +
          timestamp
      ) +
      "/" +
      sessionId +
      "/" +
      timestamp +
      "/" +
      player
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
