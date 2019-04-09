const Router = require('koa-router');
const redis = require("../redis/config.js");
const router = new Router();

router.prefix('/change');

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
    let newEmail = ctx.request.body.newEmail;
    let oldEmail = ctx.request.body.oldEmail;
    let code = ctx.request.body.code;
    let back = {};
    //判断旧邮箱是否存在
    let email_test = await user.findOne({
        where: {
            email: oldEmail
        }
    })
    if (!email_test) {
        back.code = -1;
        back.msg = "旧邮箱并未注册";
    } else {
        //判断验证码是否正确
        let code_test = await redis.get(newEmail);
        if (!code_test || code_test !== code) {
            back.code = -1;
            back.msg = "验证码错误"
        } else {
            await user.update({
                email: newEmail
            }, {
                    where: {
                        email: oldEmail
                    }
                }).then((res) => {
                    back.code = 0;
                    back.msg = "更新邮箱成功"
                }).catch((err) => {
                    back.code = -1;
                    back.msg = `更新邮箱失败，${err}`
                });
        }
    }
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});
router.post('/name', async (ctx, next) => {
    let email = ctx.request.body.email;
    let code = ctx.request.body.code;
    let name = ctx.request.body.name;
    let back = {};
    //判断邮箱是否已注册
    let email_test = await user.findOne({
        where: {
            email: email
        }
    })
    if (!email_test) {
        back.code = -1;
        back.msg = "该邮箱未注册";
    } else {
        //判断验证码是否正确
        let code_test = await redis.get(email);
        if (!code_test || code_test !== code) {
            back.code = -1;
            back.msg = "验证码错误"
        } else {
            await user.update({
                name: name
            }, {
                    where: {
                        email: email
                    }
                }).then((res) => {
                    back.code = 0;
                    back.msg = "修改用户名成功"
                }).catch((err) => {
                    back.code = -1;
                    back.msg = `修改用户名失败，${err}`
                });
        }
    }
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});


module.exports = router