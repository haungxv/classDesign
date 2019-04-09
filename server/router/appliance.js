const Router = require('koa-router');
const redis = require("../redis/config.js");
const uuid = require("node-uuid");
const router = new Router();

router.prefix('/appliance');

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

function sendEmail(name, email) {
    let mailOptions = {
        from: '1323178720@qq.com',
        to: email,
        subject: '仪器管理系统警告邮件',
        text: `${name}仪器当前值已经超过报警阈值：请及时进行处理`
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
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
let appliance = sequelize.define('appliance', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    name: Sequelize.STRING(50),
    depict: Sequelize.STRING(200),
    alertvalue: Sequelize.BIGINT,
},
    {
        timestamps: false
    });


router.post('/add', async (ctx, next) => {
    let id = uuid.v1().substring(0, 8);
    let name = ctx.request.body.name;
    let depict = ctx.request.body.depict;
    let alertvalue = ctx.request.body.alertvalue;
    let back = {};
    await appliance.create({
        id: id,
        name: name,
        depict: depict,
        alertvalue: alertvalue,
    }).then((res) => {
        back.code = 0;
        back.msg = "添加设备成功";
    }).catch((err) => {
        back.code = -1;
        back.msg = `添加设备失败，${err}`;
    });

    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});
router.post('/change', async (ctx, next) => {
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let depict = ctx.request.body.depict;
    let alertvalue = ctx.request.body.alertvalue;
    let back = {};
    await appliance.update({
        name: name,
        depict: depict,
        alertvalue: alertvalue,
    }, {
            where: {
                id: id
            }
        }).then((res) => {
            back.code = 0;
            back.msg = "修改设备信息成功"
        }).catch((err) => {
            back.code = -1;
            back.msg = `修改设备信息失败，${err}`
        });
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});
router.get('/all', async (ctx, next) => {
    let back = {};
    await appliance.findAll()
        .then((res) => {
            if (res) {
                back.code = 0;
                back.msg="获取设备列表成功";
                back.data = [];
                for (let item of res) {
                    back.data.push({
                        id: item.dataValues.id,
                        name: item.dataValues.name,
                        depict: item.dataValues.depict,
                        alertvalue: item.dataValues.alertvalue,
                    });
                }
            } else {
                back.code = 0;
                back.msg = "当前没有仪器";
            }
        }).catch((err) => {
            back.code = -1;
            back.msg = `获取仪器列表失败，${err}`;
        })
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});
router.post('/delete', async (ctx, next) => {
    let id = ctx.request.body.id;
    let back = {};
    await appliance.destroy({
        where: {
            id: id
        }
    }).then((res) => {
        back.code = 0;
        back.msg = "删除仪器成功";
    }).catch((err) => {
        back.code = -1;
        back.msg = `删除仪器失败，${err}`;
    })
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});

router.post('/check', async (ctx, next) => {
    let id = ctx.request.body.id;
    let back = {};
    let mysqlData = await appliance.findOne({
        where: {
            id: id
        }
    });
    let alertvalue = mysqlData.dataValues.alertvalue;
    let name = mysqlData.dataValues.name;
    let number = Math.floor(Math.random() * 99 + 1);
    back.data = number;
    if (number < alertvalue) {
        back.code = 0;
        back.msg = "检测正常";
    } else {
        //发邮件功能
        let email = '1323178720@qq.com'
        await sendEmail(name, email)
            .then((res) => {
                back.code = 0;
                back.msg = "报警邮件已发送，请注意查收"
            })
            .catch((err) => {
                back.code = -1;
                back.msg = `报警邮件发送错误，${err}`
            })
    }
    ctx.response.type = 'json'
    ctx.response.body = back;
});



module.exports = router