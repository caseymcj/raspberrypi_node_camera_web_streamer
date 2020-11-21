const express = require('express')
const app = express();
const fs = require('fs')
const port = 3000;

// start capture
const videoStream = require('raspberrypi-node-camera-web-streamer');
videoStream.acceptConnections(app, {
        width: 1280,
        height: 720,
        fps: 16,
        encoding: 'JPEG',
        quality: 7 // lower is faster, less quality
    }, 
    '/stream.mjpg', true);

app.use(express.static(__dirname+'/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
