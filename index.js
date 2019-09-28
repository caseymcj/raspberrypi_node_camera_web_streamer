const express = require('express')
const app = express()
const fs = require('fs')
const raspberryPiCamera = require('raspberry-pi-camera-native');
const port = 3000

// start capture
raspberryPiCamera.start({
    width: 1280,
    height: 720,
    fps: 16,
    encoding: 'JPEG',
    quality: 7
  });
console.log('Camera started.');

app.use(express.static(__dirname+'/public'));

//app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html', (err, data) => res.send(data)));


app.get('/stream.mjpg', (req, res) => {

    res.writeHead(200, {
		'Cache-Control': 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
		Pragma: 'no-cache',
		Connection: 'close',
		'Content-Type': 'multipart/x-mixed-replace; boundary=--myboundary'
	});
    console.log('Accepting connection: '+req.hostname);
    // add frame data event listener

    let isReady = true;

    let frameHandler = (frameData) => {
        try{
            if(!isReady){
                return;
            }

            isReady = false;

            console.log('Writing frame: '+frameData.length);
		    res.write('--myboundary\nContent-Type: image/jpg\nContent-length: ${frameData.length}\n\n');
		    res.write(frameData, function(){
                isReady = true;
            });


        }
        catch(ex){
            console.log('Unable to send frame: '+ex);
        }
    }

    let frameEmitter = raspberryPiCamera.on('frame', frameHandler);

    req.on('close', ()=>{
        frameEmitter.removeListener('frame', frameHandler);
        console.log('Connection terminated: '+req.hostname);
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

