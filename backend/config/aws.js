const { EC2Client } = require('@aws-sdk/client-ec2');
require('dotenv').config();

const ec2Client = new EC2Client({
  region: process.env.AWS_REGION || 'us-east-1',
  // If using access keys
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // },
});

module.exports = ec2Client;


