const Router = require('koa-router');
const redis = require("../redis/config.js");
const router = new Router();
const uuid = require("node-uuid");

//全局变量
function getCode() {
    //产生六位随机验证码
    let number = '';
    for (let i = 0; i < 6; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}


//使用sequelize操作数据库
const Sequelize = require('sequelize');
const config = require('../mysql/config.js');
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
let user = sequelize.define('user', {
    email: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    id: Sequelize.STRING(50),
    name: Sequelize.STRING(50),
    pass: Sequelize.STRING(50),
},
    {
        timestamps: false
    });



router.prefix('/sign')

router.post('/login', async (ctx, next) => {
    let email = ctx.request.body.email;
    let pass = ctx.request.body.pass;
    console.log(`ctx.session.user:${ctx.session.user}`)
    let back = {};
    let mysqlData = await user.findOne({
        where: {
            email: email
        }
    });
    if (!mysqlData) {
        back.code = -1;
        back.msg = "该邮箱未注册";
    } else {
        let a = mysqlData.dataValues;
        if (a.pass === pass) {
            ctx.session.user = email;
            console.log(`ctx.session.user:${ctx.session.user}`)
            back.code = 0;
            back.msg = "登陆成功"
        } else {
            back.code = -1;
            back.msg = "密码错误"
        }
    }
    ctx.response.type = 'json'
    ctx.response.body = back;
});
router.post('/register', async (ctx, next) => {
    let id = uuid.v1().substring(0, 8);
    let email = ctx.request.body.email;
    let pass = ctx.request.body.pass;
    let code = ctx.request.body.code;
    let name = ctx.request.body.name;
    let back = {};
    //判断验证码是否正确
    let code_test = await redis.get(email);
    if (!code_test || code_test !== code) {
        back.code = -1;
        back.data = "验证码错误"
    } else {
        //判断邮箱是否已注册
        let email_test = await user.findOne({
            where: {
                email: email
            }
        })
        if (email_test) {
            back.code = -1;
            back.msg = "该邮箱已注册";
        } else {
            await user.create({
                id: id,
                email: email,
                name: name,
                pass: pass
            }).then((res) => {
                back.code = 0;
                back.msg = "注册成功";
            }).catch((err) => {
                back.code = -1;
                back.msg = `注册失败，${err}`;
            });
        }
    }
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});


module.exports = router