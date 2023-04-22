const db = require('../lib/db');
const bcrypt = require('bcryptjs')
const userSql = require('../sql/user')
exports.register = (req, res) => {
    let userInfo = req.body;
    db.query(userSql.findUser, userInfo.name, (err, results) => {
        if (err)
            return req.msg(err);
        if (results.length > 0)
            res.send(441, {
                msg: '用户名被占用，请更换其他用户名！'
            });
        else {
            //密码加密并插入数据库
            userInfo.password = bcrypt.hashSync(userInfo.password, 10)
            db.query(userSql.addUser, userInfo, (err, results) => {
                if (err)
                    return req.msg(err);
                if (results.affectedRows > 0) {
                    res.send({
                        msg: '注册成功'
                    })
                }
            })
        }

    })
}
//用户登录
exports.login = (req, res) => {

    res.send({
        status: 200,
        data: {
            ip: req.ip
        }
    })
}