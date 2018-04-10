#Node.js 템플릿
포함 모듈
```
express
serve-static
ejs
```

#express
서버를 실행시키기 위해 http가 필요하다
```js
//app.js
var express = require('express')
,   http    = require('http')

...

var app = express()
http.createServer(app).listen(4000, function(){
	console.log('server start at 4000')
})
```
#route
./config/config.js를 수정한다
```js
// ./config/config.js
module.exports = {
    server_port :3000,
    route_info : [
        {path : "/index", file : "./index", type : "get", method : "index_get"},
		//추가할 경로 및 메소드를 설정한다.
    ]
};
```
config.js에 추가된 경로는 route_loader를 통해 불러온다.
```js
//./route/route_loader.js
var route_loader = {};

var config = require('../config/config')

route_loader.init = function (app){
    return initeRoutes(app)
}

function initeRoutes(app){
    var infoLen = config.route_info.length
    console.log('info len : ' + infoLen)
    for(var i = 0 ; i < infoLen; i++){
        var curr = config.route_info[i]
        var currModule = require(curr.file);
        if(curr.type == 'get'){
            app.get(curr.path, currModule[curr.method])
        }
        if(curr.type == 'post'){
            app.post(curr.path, currModule[curr.method])
        }
    }
}
module.exports = route_loader;
```
app.js에서 route_loader를 불러온다.

```js
//app.js

...

var route_load = require('./route/route_loader');
route_load.init(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server start at ' + app.get('port'))
})
```
index 경로 파일
```js
// ./route/index.js
var index_get = function(req, res){
    console.log('>> /index (get)')
    res.render('index')	//ejs 엔진
}
module.exports.index_get = index_get;
```


#View Engine
ejs 설치 후 app.js에 추가한다.
```js
//app.js
var static  = require('serve-static')	//정적 경로 지정
,   path    = require('path')			//static 경로 지정에 필요

...

//static 파일 연결
app.use('/public', static(path.join(__dirname, 'public')));
//뷰 파일 위치 설정 및 엔진 설정
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

...

```


