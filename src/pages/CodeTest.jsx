import React from 'react';

// // Load the AWS SDK for Node.js
// const AWS = require('aws-sdk');
// // Set region
// AWS.config.update({
//   region: 'us-east-1',
//   accessKeyId: 'key goes here',
//   secretAccessKey: 'secret goes here'
// });

// // Create publish parameters
// const params = {
//   Message: 'message text', /* required */
//   TopicArn: 'arn goes here'
// };

// const handleButtonClick = () => {
//   // Create promise and SNS service object
//   const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

//   // Handle promise's fulfilled/rejected states
//   publishTextPromise.then(
//     (data) => {
//       console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
//       console.log(`MessageID is ${data.MessageId}`);
//     }
//   ).catch(
//     (err) => {
//       console.error(err, err.stack);
//     }
//   );
// };

const App = () => (
  <>
    Code Test
  </>
);

export default App;
