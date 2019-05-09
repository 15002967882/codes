var express = require('express');
var router = express.Router();
var fs = require('fs');

// router.get('/qianQianMusic', function(req, res, next) {
//   console.log(req.query);
//   fs.readFile('./public' + req.url + '.html','utf-8',(err,data) =>{
//   	res.setHeader('Content-Type', 'text/html;charset=utf-8');
//   	console.log(err);
//   	if(err) res.send("no source");
//   	else res.send(data);
//   	res.end();
//   });
// });

router.get('/remengedan', function(req, res, next) {
  fs.readFile(__dirname + '/remengedan.txt','utf-8',(err,data) =>{
  	if(err) res.send("no source");
  	else res.send(data);
  	res.end();
  });
});

router.get('/xingeshoufa', function(req, res, next) {
  fs.readFile(__dirname + '/xingeshoufa.txt','utf-8',(err,data) =>{
    if(err) res.send("no source");
    else res.send(data);
    res.end();
  });
});

router.get('/PHBleft', function(req, res, next) {
  fs.readFile(__dirname + '/PHBleft.txt','utf-8',(err,data) =>{
    if(err) res.send("no source");
    else res.send(data);
    res.end();
  });
});
router.get('/PHBmiddle', function(req, res, next) {
  fs.readFile(__dirname + '/PHBmiddle.txt','utf-8',(err,data) =>{
    if(err) res.send("no source");
    else res.send(data);
    res.end();
  });
});
router.get('/PHBright', function(req, res, next) {
  fs.readFile(__dirname + '/PHBright.txt','utf-8',(err,data) =>{
    if(err) res.send("no source");
    else res.send(data);
    res.end();
  });
});
router.get('/remengeshou', function(req, res, next) {
  fs.readFile(__dirname + '/remengeshou.txt','utf-8',(err,data) =>{
    if(err) res.send("no source");
    else res.send(data);
    res.end();
  });
});
router.get('/jingxuanMV', function(req, res, next) {
  fs.readFile(__dirname + '/jingxuanMV.txt','utf-8',(err,data) =>{
    if(err) res.send("no source");
    else res.send(data);
    res.end();
  });
});
router.get('/remenhuodong', function(req, res, next) {
  fs.readFile(__dirname + '/remenhuodong.txt','utf-8',(err,data) =>{
    if(err) res.send("no source");
    else res.send(data);
    res.end();
  });
});

module.exports = router;