export const getChampionRanks = async (playerId: number) => {
  // Request
  return fetch(`/api/getchampionranks/:${playerId}`).then((response) => {
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
