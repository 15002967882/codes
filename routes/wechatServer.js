var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
var multer = require('multer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'chatlog',
}); 
connection.connect(); 

//wechat
router.get('/login', function(req, res, next) { 
  connection.query('SELECT id, name, username, headImageUrl FROM user where username = "' + 
    req.query.username + '" and password = "' + req.query.password + '";', function (error, results, fields) {
      if (results.length === 0){
        res.send('{"username":"该账户不存在或密码错误"}');
      }
      else {
        res.json(results[0]);
      }
  });
});
router.get('/register', function(req, res, next) { 
  connection.query('SELECT username FROM user where username = "' + req.query.username + '";', function (error, results, fields) {
      if (results.length !== 0){
        res.send('{"username":"该用户名已被注册"}');
      }
      else {
        connection.query('insert into user (name,username,password,headImageUrl) values ("' + req.query.name + '","' + 
          req.query.username + '","' + req.query.password + '","' + req.query.headImageUrl + '");', function (error, results, fields) {
            res.end('{"username":""}');
        });
      }
  });
});
router.get('/message', function(req, res, next) { 
  connection.query('insert into chatlog (name,message) values ("' + req.query.name + '","' + req.query.message + '");', function (error, results, fields) {
    var result = JSON.stringify(results);
    if (error) throw error;
    else {
      res.end(result);
    }
  });
});
router.get('/chatLog', function(req, res, next) {
  connection.query('select user.headImageUrl, chatlog.id, chatlog.name, chatlog.message from chatlog inner join user on chatlog.name=user.username;', function (error, results, fields) {
    var result = JSON.stringify(results);
    if (error) throw error;
    else res.end(result);
  });
});

//文件传输
var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch( e ){
        fs.mkdirSync(folder);
    }
};
var uploadFolder = __dirname+'/../public/medias/';// 设定存储文件夹为 /public/medias/ 文件夹
createFolder(uploadFolder);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder );// 他会放在 /public/medias 文件夹下（没有该文件夹，就新建一个）
    },
    filename: function (req, file, cb) {// 在这里设定文件名
        cb(null, file.originalname );
    }
})
var upload = multer({ storage: storage })
router.post('/upload', upload.single('logo'), function(req, res, next){
    console.dir(req.file);
    res.json({url: '/medias/'+req.file.originalname});
});

module.exports = router;

//wechat
module.exports.initialize = function (io) {
  io.on('connection', function (socket) {  
    socket.on('message', function (data) {
      // console.log(data);
      connection.query('insert into chatlog (name,message) values ("' + data.name + '","' + data.message + '");', function (error, results, fields) {
        if (error) throw error;
        else socket.broadcast.emit('news', data);
      });    
    });
  });
};

  // fs.readFile(__dirname + '/chatLog.txt','utf-8',(err,data) =>{
  // res.setHeader('Content-Type', 'text/html;charset=utf-8');
  //  if(err) res.send("no source");
  //  else res.send(data);
  //  res.end();
  // });

  // console.log(req.query);
  // fs.appendFile(__dirname + '/chatLog.txt', req.query.message + '\n', function () {
  //   res.end(req.query.message);
  // });
  // fs.writeFile(__dirname + '/chatLog.txt', JSON.stringify(array), function () {
    //    res.end(req.query.message);