const ping = require('ping');

const checkPing = async (url) => {
  try {
    const res = await ping.promise.probe(url, { timeout: 5 });
    return res.alive;
  } catch (error) {
    console.error('Error checking ping status:', error);
    return false;
  }
};

module.exports = checkPing;
