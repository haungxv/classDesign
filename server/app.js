const Koa = require('koa');
const registerRouter = require('./router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');


const app = new Koa();

app.keys = ['this is my secret and fuck you all'];//我理解为一个加密的钥匙，类似一个token

app.use(session({
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
}, app));


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