const axios =require('axios')
const checkStatus = async (website) => {
    try {
      const response = await axios.get(website.url, { timeout: 5000 });
      if (response.status >= 200 && response.status < 300) {
        return { website, status: 'up' };
      }
    } catch (error) {
      return { website, status: 'down' };
    }
    return { website, status: 'down' };
  };
  module.exports = checkStatus;