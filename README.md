# raspberrypi_node_camera_web_streamer
Stream a realtime raspberry pi camera feed through an HTML web page

After many hours of searching the web, I realized that, as prolific as raspberry pi's, cameras, and node.js are, there was no fusion of the three. I wrote this node.js solution in response to that in hopes that others may find it useful. This project can serve as a stand-alone video streamer or as a template for a much more complicated project.

The camera is streamed as a .mjpeg file into a &lt;img /&gt; tag. The implementation is simple yet fully effective.

Assuming you already have node.js installed, steps to install are:

1) Download the repo

2) Restore dependencies by running "npm -install" from within the folder of the repo

3) Start the server by running "node index.js"

4) Navigate to the new site by going to http://<ip_address>:3000

Anything inside the "public" folder is hosted as static content. The index.html page gives an example of how to stream from the camera. Streaming quality settings can be modified within the index.js file.
