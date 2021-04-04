'use strict';
const utils = require("utils");

module.exports ={
  testFunction: async (event) => {
    console.log('inside testFunction -- services/inwardApi,..');

    const SECONDS_IN_AN_HOUR = 60 * 60;
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    const expirationTime = secondsSinceEpoch + 7 * SECONDS_IN_AN_HOUR;

    await utils.dynamoResolver.insertIntoDynamo('TestResolver', {id: '234', name: 'deepak', expiresAt: expirationTime});
    await utils.snsResolver.publish(`arn:aws:sns:us-east-1:836509539324:TestingSNSTopic`, 'Hi from test function');
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Your function executed successfully! at ${utils.currentTime()}`,
          input: event,
        },
        null,
        2
      ),
    };
  },
  testingFunction: async (event) => {
    console.log("inside testingFunction");
    const message = event.Records[0].Sns.Message;
    console.log('message', message);
    return {
      statusCode: 200,
    }
  }
} 
