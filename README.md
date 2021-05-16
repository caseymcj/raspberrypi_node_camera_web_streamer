# raspberrypi_node_camera_web_streamer
## Stream a realtime raspberry pi camera feed through an HTML web page

After many hours of searching the web, I realized that, as prolific as raspberry pi's, cameras, and node.js are, there was no fusion of the three. I wrote this node.js solution in response to that in hopes that others may find it useful. This project can serve as a stand-alone video streamer or as a template for a much more complicated project.

The camera is streamed as a .mjpeg file into a &lt;img /&gt; tag. The implementation is simple yet fully effective.

## Simple Example Project
A simple example project can be installed from git:

Assuming you already have node.js set up, steps to install are:

1. Clone the repository: `git clone https://github.com/caseymcj/raspberrypi_node_camera_web_streamer`
1. Restore dependencies by running `npm install` from within the folder of the repository
1. Start the server by running `node index.js`
1. Navigate to the site in a web browser by going to `http://<ip_address>:3000`

Anything inside the `public` folder is hosted as static content. The index.html page gives an example of how to stream from the camera. The key tag for this is 
```
<img src="stream.mjpg" />
```
`stream.mjpg` is hosted via Express in `index.js`.

Streaming quality settings can also be modified within the `index.js` file.

## Installation

### Install via npm

### **NOTE: MAKE SURE THE CAMERA INTERFACE IS ENABLED USING `sudo raspi-config` (under interface options). OTHERWISE, AN ERROR WILL BE THROWN WHEN THE CAMERA INITIALIZES.**

Execute the below command:
```
npm install raspberrypi-node-camera-web-streamer
```

Then in your node script, you can start it like this:
```
const express = require('express')
const app = express()
const videoStream = require('raspberrypi-node-camera-web-streamer');
videoStream.acceptConnections(app, {
    width: 1280,
    height: 720,
    fps: 16,
    encoding: 'JPEG',
    quality: 7 //lower is faster
}, '/stream.mjpg', true);

app.listen(3000, () => console.log(`Listening on port ${port}!`));
```
The video frames can be continuously streamed using an `img` HTML tag (the server tells it to continually refresh / stream the image):
```
<img src="http://<server_address>/stream.mjpg" />
```

`videoStream.acceptConnections` accepts 4 parameters: `express` module, `settings object` (optional), `path` to host the streaming resource (optional), and `isVerbose` (optional).

The last video frame captured can also be retrieved as a .jpg image by calling `videoStream.getLastFrame()`. If no frame has been captured (which can happen if no users have connected yet), then this will be `null`.