const axios = require('axios');


const checkSSL = async (url) => {
  try {
    const hostname = new URL(url).hostname;
    const response = await axios.get(`https://ssl-checker.io/api/v1/check/${hostname}`);
    
    

    const expirationDate = new Date(response.data.result.valid_till);
   

    


    return expirationDate;
  } catch (error) {
    console.error('Error checking SSL:', error);
    return null;
  }
};

module.exports = checkSSL;
