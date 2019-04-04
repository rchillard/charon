/* This example describes the specified instance. */
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

var params = {
    InstanceIds: [
       "i-###############"
    ]
};

ec2.describeInstances(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
     /*
     data = {
     }
     */
})