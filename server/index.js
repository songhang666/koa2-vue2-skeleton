const Koa = require('koa');
const app = new Koa();
const config = require('./config')
const router = require('koa-router')({
  prefix:config.app.adminPath
});
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const debug = require('debug')('demo:server');
const http = require('http');
const cors = require('koa-cors')
//  database引入
const models = require('./models');
//  路由引入
const index = require('./routes/index');
const users = require('./routes/users');
app.use(cors({
  maxAge: 7 * 24 * 60 * 60,
  // 7 days 预请求头有效期
  credentials: true,
  methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
  headers: 'Content-Type, Accept, Authorization'
}))

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});




// 路由处理
router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());




app.use(router.routes(), router.allowedMethods());

// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
// console.log(process.env.PORT);
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());


//  连接数据库

models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, function() {
    debug('Express server listening on port ' + server.address().port);
    console.log('Express server listening on port ' + server.address().port);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Database connected');
}


/*

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');



app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms); // 显示执行的时间
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
*/
