export const createSession = async () => {
  // Request
  return fetch(`/api/createsession`).then((response) => {
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