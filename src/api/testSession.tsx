import moment from "moment";
import md5 from "md5";

export const testSession = async (sessionId: any) => {
  const timestamp = moment.utc(Date.now()).format("YYYYMMDDHHmmss");

  // Request
  try {
    return fetch(
      "/api/testsessionjson/" +
        import.meta.env.VITE_DEV_ID +
        "/" +
        md5(
          import.meta.env.VITE_DEV_ID +
            "testsession" +
            import.meta.env.VITE_DEV_KEY +
            timestamp
        ) +
        "/" +
        sessionId + 
        "/" +
        timestamp
    ).then((response) => {
      try {
        // If Server Error
        if (response.status >= 500) {
          return response.text().then(() => {
            throw new Error("Server is Offline!");
          });
        }
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
  } catch (err) {
    console.log(err);
  }
};
