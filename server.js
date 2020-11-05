'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 3000;

const fs = require('fs');
const fetch = require('node-fetch');

const url = "https://media.gettyimages.com/photos/tan-dinh-church-with-pink-color-in-christmas-season-picture-id957612164?s=612x612"

async function download() {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`/mnt/efs/image.jpg`, buffer, () =>
    console.log('finished downloading!'));
}

download()


let path = "/mnt/efs";

fs.lstat(path, (err, stats) => {

    if(err)
        return console.log(err); //Handle error

    console.log(`Is file: ${stats.isFile()}`);
    console.log(`Is directory: ${stats.isDirectory()}`);
    console.log(`Is symbolic link: ${stats.isSymbolicLink()}`);
    console.log(`Is FIFO: ${stats.isFIFO()}`);
    console.log(`Is socket: ${stats.isSocket()}`);
    console.log(`Is character device: ${stats.isCharacterDevice()}`);
    console.log(`Is block device: ${stats.isBlockDevice()}`);
});

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
