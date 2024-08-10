const net = require('net');

const checkPort = (url, port) => {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.setTimeout(5000);

    client.connect(port, url, () => {
      resolve(true);
      client.destroy();
 
      

    });

    client.on('error', () => {
      resolve(false);
      
    });

    client.on('timeout', () => {
      resolve(false);
      
    });

    client.on('close', () => {
      client.destroy();
     
    });
  });
};

module.exports = checkPort;
