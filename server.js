const express = require('express');
const app = express();
const port = 3001; // You can use any available port


const cors = require('cors'); //for cross origin access.

app.use(cors());

// Static JSON data for testing
const sensorData = {
    timestamp: new Date().toISOString(),
    humidity: 50.3,
    pressure: 1012.1,
    interior_temperature: 21.5,
    altitude: 300
};

// GET route to send sensor data
app.get('/weather', (req, res) => {
    res.json(sensorData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
