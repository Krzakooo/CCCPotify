'use strict';
const http = require("http");
const fs = require("fs");

const albums = [];

function getData() {
    const albumNames = fs.readdirSync('./static/mp3', {
        encoding: 'utf-8'
    });
    for (const albumName of albumNames) {
        const dir = {
            name: albumName,
            songs: []
        }
        for (const songName of fs.readdirSync('./static/mp3/' + albumName)) {
            const fileStats = fs.statSync('./static/mp3/' + albumName + '/' + songName);
            if (fileStats.isFile()) {
                if (songName.endsWith('.mp3')) {
                    const songSize = fs.statSync('./static/mp3/' + albumName + '/' + songName).size;
                    dir.songs.push({
                        name: songName,
                        size: songSize,
                    });
                } else if (songName.endsWith('.jpg'))
                    dir.cover = songName;
            }
        }
        albums.push(dir);

    }
    console.log(JSON.stringify(albums))
}
getData();

function getCover(res, albumName) {
    fs.readFile('./static/mp3/' + albumName + "/cover.jpg", function (err, data) {
        if (err) throw err;
        res.writeHead(200, {
            'Content-Type': 'image/jpg'
        });
        res.write(data);
        res.end();
    });
}


function getSongs(res, index) {
    res.writeHead(200, {
        'Content-Type': 'aplication/json;charset=utf-8'
    });
    res.end(JSON.stringify(albums[index]));
}



const server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url.search(/^.*\.mp3$/) != -1) {
                fs.readFile(__dirname + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, {
                        "Content-type": "audio/mpeg"
                    });
                    res.write(data);
                    res.end();
                })
            }
            if (req.url === "/") {
                fs.readFile("static/index.html", function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    res.end();
                    console.log("static...")
                })
            }
            if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'text/css'
                    });
                    res.write(data);
                    res.end();
                    console.log("styles...")
                })
            }
            if (req.url === "/main.js") {
                fs.readFile("static/main.js", function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                    console.log("main...")
                })
            }
            if (req.url === "/net.js") {
                fs.readFile("static/net.js", function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                    console.log("NET...")
                })
            }
            if (req.url === "/ui.js") {
                fs.readFile("static/ui.js", function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                    console.log("UI...")
                })
            }
            if (req.url === "/jquery.js") {
                fs.readFile("./static/jquery.js", function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                    console.log("Jquery...")
                })
            }
            if (req.url === '/getData') {
                res.writeHead(200, {
                    'Content-Type': 'aplication/json;charset=utf-8'
                });
                res.end(JSON.stringify(albums))
                console.log("loaded")
            }
            let cover = req.url.match(/getcover\/([^\/]*)/i);
            if (cover) {
                return getCover(res, decodeURIComponent(cover[1]));
            }
            let list = req.url.match(/getsongs\/([^\/]*)/i);
            if (list) {
                return getSongs(res, decodeURIComponent(list[1]));
            }
            break;
    }
});

server.listen(3000, function () {
    console.log("Port 3000...")
});