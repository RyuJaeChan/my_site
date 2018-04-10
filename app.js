var express = require('express')
,   http    = require('http')
,   static  = require('serve-static')
,   path    = require('path')

var config = require('./config/config');


var app = express();
app.set('port', config.server_port);

//static 파일 연결
app.use('/public', static(path.join(__dirname, 'public')));
//뷰 파일 위치 설정 및 엔진 설정
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')



var route_load = require('./route/route_loader');
route_load.init(app);




http.createServer(app).listen(app.get('port'), function(){
    console.log('Server start at ' + app.get('port'))
})