const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  websiteName: { type: String, required: true },
  url: { type: String, required: true },
  email: { type: String, required: true },
  lastStatus: { type: String, default: 'unknown' },
  sslExpiration: { type: Date, default: null },
  domainExpiration: { type: Date, default: null },
  monitorStatus: { type: Boolean, default: false },
  monitorSSL: { type: Boolean, default: false },
  monitorDomain: { type: Boolean, default: false },
  monitorPort: { type: Boolean, default: false },
  monitorPing: { type: Boolean, default: false },
  monitorKeyword: { type: Boolean, default: false },
  port: { type: Number, default: null },
  keyword: { type: String, default: null },
  sslNotificationSent: { type: Boolean, default: false },
  domainNotificationSent: { type: Boolean, default: false },

  previousPortStatus: { type: String, default: 'unknown' }, 


});

module.exports = mongoose.model('Website', websiteSchema);
