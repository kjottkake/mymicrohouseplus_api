const express = require('express');
const app = express();
const port = 3001; // You can use any available port
const fs = require('fs'); //read files


const cors = require('cors'); //for cross origin access.

app.use(cors());

let startTime = Date.now();

// Static JSON data for testing
// const sensorData = {
//     timestamp: new Date().toISOString(),
//     humidity: 50.3,
//     pressure: 1012.1,
//     interior_temperature: 21.5,
//     altitude: 300
// };

// GET route to send sensor data
app.get('/weather', (req, res) => {
    fs.readFile('../mymicrohouseplus_sensor/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading sensor data");
        }
        try {
            const sensorData = JSON.parse(data);
            res.json(sensorData);
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            return res.status(500).send("Error parsing sensor data");
        }
    });
    // res.json(sensorData);
});

app.get('/altitude', (req, res) =>{
    fs.readFile('../mymicrohouseplus_sensor/altData.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading altitude data");
        }
        try {
            const altData = JSON.parse(data);
            res.json(altData);
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            return res.status(500).send("Error parsing altitude data");
        }
    });
    // res.json(sensorData);
});

// Define a route to get the battery percentage based on the elapsed time
app.get('/battery', (req, res) => {
    const currentTime = Date.now();
    const elapsedTimeInSeconds = (currentTime - startTime) / 1000; // Convert to seconds
    // const elapsedTimeInSeconds = 60 * 60 * 12
    // Calculate the battery percentage based on the elapsed time
    const remainingPercentage = calculateBatteryPercentage(elapsedTimeInSeconds);
  
    // Respond with the remaining percentage
    res.json({ remainingPercentage });
  });
  
  // Function to calculate battery percentage
  function calculateBatteryPercentage(elapsedTimeInSeconds) {
    const fullChargeTime = 48 * 60 * 60; // 48 hours in seconds
  
    // Ensure that the percentage doesn't go below 0 or above 100
    const remainingPercentage = Math.max(
      0,
      Math.min(100, ((fullChargeTime - elapsedTimeInSeconds) / fullChargeTime) * 100)
    );
  
    return remainingPercentage.toFixed(2);
  }
  


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
