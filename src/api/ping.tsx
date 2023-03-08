export const ping = async () => {
  // Request
  try {
    return fetch(`https://hirez-backend.netlify.app/.netlify/functions/api/ping`).then((response) => {
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
