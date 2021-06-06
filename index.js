const express = require("express");
const app = express();
const cors = require('cors');
const fs = require("fs");
const https = require("https");
const dotenv = require('dotenv');
dotenv.config();

// enable cors
app.use(cors());
app.options("*", cors());

app.use(express.static("/var/www/main"));

app.get('/',function(req,res){
  res.sendFile("/var/www/main/index.html");
});

app.use('/tour', express.static("/var/www/html"));

app.get('tour/*',function(req,res){
  res.sendFile("/var/www/html/index.html");
});

var credentials = {
        key: fs.readFileSync("/etc/ssl/myflexworx.private.pem"),
        cert: fs.readFileSync("/etc/ssl/4229e2ea976eb4a9.pem"),
};

//let server;
//let server = http.createServer(app);
const server = https.createServer(credentials, app);

//const server = app.listen(process.env.PORT, () => {
  //console.log(`Server connection on  http://127.0.0.1:${process.env.PORT}`);  // Server Connnected
//});


server.listen(443, () => {
        console.log(`Listening to port ${process.env.PORT}`);
});
