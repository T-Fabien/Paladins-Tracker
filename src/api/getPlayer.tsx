export const getPlayer = async (player: string) => {
  // Request
  return fetch(`https://paladins-tracker-backend.netlify.app/.netlify/functions/api/getplayer/:${player}`).then((response) => {
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
