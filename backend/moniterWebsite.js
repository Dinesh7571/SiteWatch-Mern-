const cron = require('node-cron');
const axios = require('axios');
const Website = require('./models/Website');
const sendEmail = require('./utils/email');
//const pLimit = require('p-limit');

//const limit = pLimit(10);  // Limit concurrency to 10 requests at a time

const checkWebsiteStatus = async (website) => {
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

const monitorWebsites = async() => {
 
    console.log('Checking websites status');
    const websites = await Website.find({});
    const checkPromises = websites.map(website => checkWebsiteStatus(website));
    const results = await Promise.all(checkPromises);

    for (const result of results) {
      const { website, status } = result;
      if (status === 'down' && website.lastStatus !== 'down') {
        website.lastStatus = 'down';
        await website.save();
        await sendEmail(website.email, 'Website Down', `Your website ${website.websiteName} (${website.url}) is down.`);
      } else if (status === 'up' && website.lastStatus !== 'up') {
        website.lastStatus = 'up';
        await website.save();
      }
    }
  
};

module.exports = monitorWebsites;
