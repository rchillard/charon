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
  InstanceIds: [process.env.InstanceID]
};

// Handle GET route for checking on server status
app.get("/dev", (req, res) => {
  let status = "";
  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return "error";
    } else {
      console.log(
        `Success found instance ${
          data.Reservations[0].Instances[0].State["Name"]
        } at ${data.Reservations[0].Instances[0].PublicIpAddress}`
      );
      const instanceState = data.Reservations[0].Instances[0].State["Name"];
      if (instanceState === "running") {
        status = data.Reservations[0].Instances[0].PublicIpAddress;
      } else if (instanceState === "stopped") {
        status = "offline";
      } else {
        status = "error";
      }
    }
    res.status(200).send(JSON.stringify(status));
  });
});

// Handle POST route for activating the server
app.post("/dev", (req, res) => {
  let status = "";
  const pass = req.body.passphrase;
  if (pass === process.env.Passphrase) {
    ec2.startInstances(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else if (data) {
        console.log("Success", data.StartingInstances);
        status = "Charon hears your call through the darkness...";
        res.status(201).send(JSON.stringify(status));
      }
    });
  } else {
    status = "Charon only appears with the right word.";
    res.status(403).send(JSON.stringify(status));
  }
});

// Handle in-valid route
app.all("*", function(req, res) {
  const response = { data: null, message: "Route not found!!" };
  res.status(400).send(response);
});

// wrap express app instance with serverless http function
module.exports.handler = serverless(app);
