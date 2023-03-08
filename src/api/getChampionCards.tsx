export const getChampionCards = async (champions: number) => {
  // Request
  return fetch(`https://hirez-backend.netlify.app/.netlify/functions/api/getchampioncards/:${champions}`).then((response) => {
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
