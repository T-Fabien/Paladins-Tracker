export const getChampions = async () => {  
  // Request
  return fetch(`https://paladins-tracker-backend.netlify.app/.netlify/functions/api/getchampions`).then((response) => {
    try {
      console.log(response);
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
