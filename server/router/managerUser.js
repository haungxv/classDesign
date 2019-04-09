const Router = require('koa-router');
const redis = require("../redis/config.js");
const router = new Router();

router.prefix('/user');

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


router.get('/all', async (ctx, next) => {
    let back = {};
    await user.findAll()
        .then((res) => {
            if (res) {
                back.code = 0;
                back.msg = "获取用户列表成功"
                back.data = [];
                for (let item of res) {
                    back.data.push({
                        id: item.dataValues.id,
                        name: item.dataValues.name,
                        email: item.dataValues.email
                    });
                }
            } else {
                back.code = 0;
                back.msg = "当前没有用户";
            }
        }).catch((err) => {
            back.code = -1;
            back.msg = `获取用户列表失败，${err}`;
        })
        
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});
router.post('/delete', async (ctx, next) => {
    let id = ctx.request.body.id;
    let back = {};
    await user.destroy({
        where: {
            id: id
        }
    }).then((res) => {
        back.code = 0;
        back.msg = "删除用户成功";
    }).catch((err) => {
        back.code = -1;
        back.msg = `删除用户失败，${err}`;
    })
    //返回数据
    ctx.response.type = 'json'
    ctx.response.body = back;
});

module.exports = router