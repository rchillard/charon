const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

// Instantiate Express server
const app = express();

// Configure Express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Determine the EC2 InstanceID
const ec2 = new AWS.EC2({ apiVersion: "2016-11-15" });
let params = {
  InstanceIds: [
    //  "i-0e2413668a55a80ce"
    process.env.InstanceID
  ]
};

// Return state of the server
function assessServerState(params) {
  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return "error";
    } else {
      console.log("Success", JSON.stringify(data));
      const instanceState = data.Reservations[0].Instances[0].State["Name"];
      if (instanceState === "running") {
        status = data.Reservations[0].Instances[0].PublicIpAddress;
      } else if (instanceState === "stopped") {
        status = "offline";
      } else {
        status = "error";
      }
      return status;
    }
  });
}

// Handle GET route for status
app.get("/dev", res => {
  res.status(200).send(JSON.stringify(assessServerState(params)));
});

// Handle POST route for summon
app.post("/dev", (req, res) => {
  //   const { pass } = req.body.pass;
  const pass = req.body.passphrase;
  if (pass === process.env.Passphrase) {
    res.status(201).send("You have the magic word!");
    ec2.startInstances(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else if (data) {
        console.log("Success", data.StartingInstances);
      }
    });
  } else {
    res.status(403).send("That's not the magic word.  Try again...");
  }
});

// Handle in-valid route
app.all("*", function(req, res) {
  const response = { data: null, message: "Route not found!!" };
  res.status(400).send(response);
});

// wrap express app instance with serverless http function
module.exports.handler = serverless(app);
