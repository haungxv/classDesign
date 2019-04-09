const Koa = require('koa');
const registerRouter = require('./router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');


const app = new Koa();
app.use(bodyParser());

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8002';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(registerRouter());

app.listen(3000);
console.log('服务端正常启动！！！');