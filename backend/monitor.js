
const Website = require('./models/Website');
const sendEmail = require('./utils/email');
const checkSSL = require('./utils/sslCheck');
const checkDomainExpiration = require('./utils/domainCheck');
const checkPort = require('./utils/portCheck');
const checkPing = require('./utils/pingCheck');
const checkKeyword = require('./utils/keywordCheck');
const checkStatus =require('./utils/statusCheck')




const monitorStatus = async () => {
  console.log('Checking websites status');
  const websites = await Website.find({ monitorStatus: true });



  const checkPromises = websites.map(website => checkStatus(website));
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





const monitorSSL = async () => {
  console.log('Checking SSL expiration');
  const websites = await Website.find({ monitorSSL: true });
  const currentDate = new Date();

  for (const website of websites) {
    const expirationDate = await checkSSL(website.url);
    if (expirationDate) {
      website.sslExpiration = expirationDate;
      await website.save();

      const daysUntilExpiration = Math.floor((expirationDate - currentDate) / (1000 * 60 * 60 * 24));

  

      if (daysUntilExpiration <= 5 && !website.sslNotificationSent) {
        await sendEmail(website.email, 'SSL Certificate Expiring Soon', `Your SSL certificate for ${website.websiteName} (${website.url}) will expire in ${daysUntilExpiration} days.`);
        website.sslNotificationSent = true;
        await website.save();
      } else if (daysUntilExpiration > 5) {
        website.sslNotificationSent = false;
        await website.save();
      }
    }
  }
};






const monitorDomain = async () => {
  console.log('Checking domain expiration');
  const websites = await Website.find({ monitorDomain: true });
  const currentDate = new Date();

  for (const website of websites) {
    const expirationDate = await checkDomainExpiration(website.url);
    if (expirationDate) {
      website.domainExpiration = expirationDate;
      await website.save();

      const daysUntilExpiration = Math.floor((expirationDate - currentDate) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiration <= 5 && !website.domainNotificationSent) {
        await sendEmail(website.email, 'Domain Expiring Soon', `Your domain for ${website.websiteName} (${website.url}) will expire in ${daysUntilExpiration} days.`);
        website.domainNotificationSent = true;
        await website.save();
      } else if (daysUntilExpiration > 5) {
        website.domainNotificationSent = false;
        await website.save();
      }
    }
  }
};







const monitorPorts = async () => {
  console.log('Checking port status');
  const websites = await Website.find({ monitorPort: true });

  const checkPromises = websites.map(async (website) => {
    const currentPortStatus = await checkPort(website.url, website.port);

   console.log(currentPortStatus)

    const previousPortStatus = website.previousPortStatus;

    // Update the previous port status in the database
    website.previousPortStatus = currentPortStatus;
    await website.save();

    // Send email notification if the status has changed
    if (currentPortStatus !== previousPortStatus) {
      if (currentPortStatus === 'closed') {
        await sendEmail(website.email, 'Port Down', `The port ${website.port} for your website ${website.websiteName} (${website.url}) is down.`);
      } 
    }
  });

  await Promise.all(checkPromises);
};




const monitorPings = async () => {
  console.log('Checking ping status');
  const websites = await Website.find({ monitorPing: true });
  const checkPromises = websites.map(async (website) => {
    const pingStatus = await checkPing(website.url);
    if (!pingStatus) {
      await sendEmail(website.email, 'Ping Failed', `The ping to your website ${website.websiteName} (${website.url}) has failed.`);
    }
  });
  await Promise.all(checkPromises);
};





const monitorKeywords = async () => {
  console.log('Checking keyword status');
  const websites = await Website.find({ monitorKeyword: true });
  const checkPromises = websites.map(async (website) => {
    const keywordStatus = await checkKeyword(website.url, website.keyword);
    if (!keywordStatus) {
      await sendEmail(website.email, 'Keyword Not Found', `The keyword "${website.keyword}" was not found on your website ${website.websiteName} (${website.url}).`);
    }
  });
  await Promise.all(checkPromises);
};

module.exports = {
  monitorStatus,
  monitorSSL,
  monitorDomain,
  monitorPorts,
  monitorPings,
  monitorKeywords
};
