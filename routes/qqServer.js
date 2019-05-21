var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var multer = require('multer');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'qqchat',
}); 
connection.connect(); 

var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch( e ){
        fs.mkdirSync(folder);
    }
};
var uploadFolder = __dirname+'/../public/images/qqchat/';
createFolder(uploadFolder);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder );
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname );
    }
})
var upload = multer({ storage: storage });

router.post('/qqregister', upload.single('head'), function(req, res, next) { 
  connection.query('SELECT userNumber FROM user where userNumber = "' + req.body.userNumber + '";', function (error, results, fields) {
      if (results.length !== 0){
        res.json({"userNumber":"该用户名已被注册"});
      }
      else {
        connection.query('insert into user (userName, userNumber, head, password) values ("' + req.body.userName + '", "' + req.body.userNumber
         + '", "/images/qqchat/' + req.file.originalname +'", "' + req.body.password + '");', function (error, results, fields) {
          res.json({userNumber: req.body.userNumber});
        });
      }
  });
});

router.post('/qqlogin',upload.single('head'), function(req, res, next) { 
  connection.query('SELECT userName, userNumber, head, password FROM user where userNumber = "' + req.body.userNumber + '";', function (error, results, fields) {
      if (results.length === 0){
        res.json([{"userNumber":"该用户不存在"}]);
      }
      else {   
          res.json(results);
      }
  });
});

router.post('/qqchatLog', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  connection.query('select user.userName, user.userNumber, user.head, qqchatlog.message from qqchatlog inner join user on qqchatlog.userNumber=user.userNumber;', function (error, results, fields) {
    if (error) throw error;
    else res.json(results);
  });
});



module.exports = router;

module.exports.initialize = function (io) {
  io.on('connection', function (socket) {  
    socket.on('qqmessage', function (data) {
      connection.query('insert into qqchatlog (userNumber,message) values ("' + data.userNumber + '","' + data.message + '");', function (error, results, fields) {
        if (error) throw error;
        else socket.broadcast.emit('qqnews', data);
      });    
    });
  });
};