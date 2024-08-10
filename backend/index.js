require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const {
  monitorStatus,
  monitorDomain,
  monitorPings,
  monitorSSL,
  monitorPorts,
  monitorKeywords}=require('./monitor')

const cors=  require('cors')
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/websites', websiteRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);


    startMonitoring()




    });
  })
  .catch(err => console.log(err));


  const startMonitoring = () => {
    // Schedule tasks here
    cron.schedule('*/1 * * * *', async () => {
      await monitorStatus();
    });
  
    cron.schedule('0 0 * * *', async () => {
      await monitorSSL();
    });

    // cron.schedule('0 0 * * *', async () => {
    //   await monitorDomain();
    // });
  
    cron.schedule('*/1 * * * *', async () => {
      await monitorPorts();
    });
  
    // cron.schedule('* * * * *', async () => {
    //   await monitorPings();
    // });
  
    // cron.schedule('*/5 * * * *', async () => {
    //   await monitorKeywords();
    // });
  
    console.log('Monitoring tasks scheduled');
  };