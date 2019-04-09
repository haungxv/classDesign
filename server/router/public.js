const Router = require('koa-router');
const redis = require("../redis/config.js");
const router = new Router();

router.prefix('/public')

//全局变量
function getCode() {
    //产生六位随机验证码
    let number = '';
    for (let i = 0; i < 6; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

//配置发邮件功能
let nodemailer = require('nodemailer');

let smtpConfig = {
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
        user: '1323178720@qq.com',
        pass: 'hvwrreklmvpqfgfd'
    }
};

let transporter = nodemailer.createTransport(smtpConfig);

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


router.post('/email', async (ctx, next) => {
    let email = ctx.request.body.email;
    let code = await getCode();
    let back = {};
    let mailOptions = {
        from: '1323178720@qq.com',
        to: email,
        subject: '仪器管理系统验证码',
        text: `仪器管理系统邮件验证码为：${code}，30分钟内有效`
    };
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions)
            .then(res => {
                transporter.close();
                redis.set(email, code);
                back.code = 0;
                back.msg = "邮件已发送，请注意查收"
            })
            .catch(err => {
                back.code = -1;
                back.msg = `邮件发送错误，${err}`
            })
    })
    ctx.response.type = 'json'
    ctx.response.body = back;
});
router.post('/pass', async (ctx, next) => {
    let email = ctx.request.body.email;
    let pass = ctx.request.body.pass;
    let code = ctx.request.body.code;
    let back = {};
    let mysqlData = await user.findOne({
        where: {
            email: email
        }
    });
    if (!mysqlData) {
        back.code = -1;
        back.msg = "该邮箱未注册"
    }
    else {
        let code_test = await redis.get(email);
        if (!code_test || code_test !== code) {
            back.code = -1;
            back.msg = "验证码错误"
        } else {
            await user.update({
                pass: pass
            }, {
                    where: {
                        email: email
                    }
                }).then((res) => {
                    back.code = 0;
                    back.msg = "修改密码成功"
                }).catch((err) => {
                    back.code = -1;
                    back.msg = `修改密码失败，${err}`
                })
        }
    }
    ctx.response.type = 'json'
    ctx.response.body = back;
});


module.exports = router