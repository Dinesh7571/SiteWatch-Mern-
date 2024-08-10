const Website = require('../models/Website');

// Add a new website
const addWebsite = async (req, res) => {
  const {
    websiteName,
    url,
    email,
    sslExpiration,
    domainExpiration,
    monitorStatus,
    monitorSSL,
    monitorDomain,
    monitorPort,
    monitorPing,
    monitorKeyword,
    port,
    keyword,

  } = req.body;
  try {
    const newWebsite = new Website({
      userId: req.user.id,  // Accessing the authenticated user's ID from req.user
      websiteName,
      url,
      email,
      lastStatus: 'unknown', // Initialize status as unknown
      sslExpiration,
      domainExpiration,
      monitorStatus,
      monitorSSL,
      monitorDomain,
      monitorPort,
      monitorPing,
      monitorKeyword,
      port,
      keyword,
      sslNotificationSent,
      domainNotificationSent ,
      previousPortStatus
    });
    await newWebsite.save();
    res.status(201).json({ message: 'Website added successfully', website: newWebsite });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all websites for the logged-in user
const getWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user.id });  // Querying websites for the logged-in user
    res.json(websites);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a website
const updateWebsite = async (req, res) => {
  const { id } = req.params;
  const { 
    websiteName,
    url,
    email,
    monitorStatus,
    monitorSSL,
    monitorDomain,
    monitorPort,
    monitorPing,
    monitorKeyword,
    port,
    keyword,
     } = req.body;
  try {
    const website = await Website.findById(id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    if (website.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    website.websiteName = websiteName || website.websiteName;
    website.url = url || website.url;
    website.email = email || website.email;


    website.monitorStatus=monitorStatus || website.monitorStatus
    website.monitorSSL=monitorSSL || website.monitorSSL
    website.monitorDomain=monitorDomain || website.monitorDomain
    website.monitorPort=monitorPort || website.monitorPort
    website.monitorPing=monitorPing || website.monitorPing
    website.monitorKeyword=monitorKeyword || website.monitorKeyword
    website.port=port || website.port
    website.keyword=keyword || website.keyword




    await website.save();
    res.json({ message: 'Website updated successfully', website });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a website
const deleteWebsite = async (req, res) => {
  const { id } = req.params;
  try {
    const website = await Website.findById(id);
    if (!website) {
      return res.status(404).json({ message: 'Website not found' });
    }
    if (website.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await Website.findByIdAndDelete(id);
    res.json({ message: 'Website deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addWebsite, getWebsites, updateWebsite, deleteWebsite };
