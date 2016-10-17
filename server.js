var koa = require('koa');
var app = koa();
var serve = require('koa-static');
var mount = require('koa-mount');
var unirest = require('unirest');

var router = require('koa-router')();

var bodyParser = require('koa-bodyparser');
var logger = require('koa-logger');
app.use(logger());
app.use(bodyParser());

router.get('/api/query', function *(next) {
  this.body = {};
});

router.post('/api/query', function *(next) {
  const body = this.request.body;
  //console.log('query', this.request.query);
  this.body = yield new Promise(function(resolve, reject) {
    console.log('body', body);
    var req = unirest.post('http://' + body.host)
      .qs({database:body.database});
    if (body.auth) {
        req = req.headers({"Authorization": "Basic " + body.auth})
    }
    req.send(body.sql)
      .end(function (response) {
        if (response.error) {
          if (response.raw_body) {
            resolve({"status": "error", "message": response.raw_body});
          } else
            reject(response.error)
        } else {
          resolve({"status": "ok", "message": response.raw_body});
          console.log(response.body);
        }

      });
  });
});


app.use(router.routes());

//app.use(serve('./dist'));
//app.use(mount('/app', serve('./dist')));
//app.use(mount('/app/styles', serve('./bower_components/mdi')));

app.use(mount('/app', serve('./tmp/serve')));
app.use(serve('.tmp/serve'));
app.use(serve('.tmp/partials'));
app.use(mount('/app', serve('./src/app')));
app.use(mount('/bower_components', serve('./bower_components')));
app.use(mount('/assets', serve('./src/assets')));

app.listen(3000);
