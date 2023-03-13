import moment from "moment";
import md5 from "md5";

export const createSession = async () => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

  // Request
  return fetch(
    "/api/createsessionjson/" +
      import.meta.env.VITE_DEV_ID +
      "/" +
      md5(
        import.meta.env.VITE_DEV_ID +
          "createsession" +
          import.meta.env.VITE_DEV_KEY +
          timestamp
      ) +
      "/" +
      timestamp
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
