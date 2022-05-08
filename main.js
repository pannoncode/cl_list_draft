const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const MIME = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    txt: "text/plain",
    jpg: "image/jpg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-ico",
    type: function(ext) {
        return this[ext] || this.txt;
    }
};

http.createServer((req, res) => {
    switch (true) {
        case req.method == "GET" && req.url == "/":

            fs.readFile(path.join(__dirname, "public", "index.html"), (err, fileContent) => {
                res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
                res.write(fileContent);
                res.end();
            });

            break;

        case req.method == "GET" && req.url == "/cllist":

            fs.readFile(path.join(__dirname, "centerlines.json"), (err, fileContent) => {
                res.writeHead(200, { "Content-type": "application/json" });
                res.write(fileContent);
                res.end();
            });

            break;

        case req.method == "POST" && req.url == "/save":

            let postData = "";
            let newCenterline = {};

            req.on("data", chunk => {

                postData += chunk;

            });

            req.on("end", () => {

                newCenterline = JSON.parse(postData);
                newCenterline._id = new Date().getTime();

                fs.readFile(path.join(__dirname, "centerlines.json"), (err, fileContent) => {

                    let centerline = JSON.parse(fileContent);
                    centerline.push(newCenterline);

                    fs.writeFile(path.join(__dirname, "centerlines.json"), JSON.stringify(centerline), function() {

                        res.writeHead(200, { "Content-type": "application/json" });
                        res.write(JSON.stringify(newCenterline));
                        res.end();
                    });
                });
            });

            break;

        default:
            var filePath = path.join(__dirname, "public", req.url.slice(1));
            var fileExt = path.extname(req.url).slice(1);

            fs.readFile(filePath, (err, fc) => {
                if (err) {
                    res.write("hiba");
                    res.end();
                } else {
                    res.writeHead(200, { "Content-type": MIME.type(fileExt) });
                    res.write(fc);
                    res.end();
                }
            });

            break;
    }
}).listen(3000);