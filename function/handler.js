// AWS Lambda function to check instance state and start if stopped
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

exports.handler = (event, context, callback) => {
    var params = {
        InstanceIds: [
           "i-###############"
        ]
    };
       
    ec2.describeInstances(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            //  console.log(data.Reservations[0].Instances[0].PublicIpAddress);
            console.log("Success", JSON.stringify(data));
            const instanceState = data.Reservations[0].Instances[0].State["Name"]
            if (instanceState === "stopped") {
                ec2.startInstances(params, function(err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else if (data) {
                        console.log("Success", data.StartingInstances)
                    }
                })
            }
         }
    });
};
