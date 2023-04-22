const db = require('../lib/db');
const bcrypt = require('bcryptjs')
const userSql = require('../sql/user');
const jwt = require('jsonwebtoken');
const config = require('../config/default')
//检验用户是否存在
exports.checkUser = (req, res) => {
    let { name } = req.query;
    db.query(userSql.findUser, name, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.length > 0)
            res.send(true);
        else
            res.send(false);
    })
}
exports.register = (req, res) => {
    let userInfo = req.body;
    let sql = "select * from auth where name=? and isdeleted=1";
    db.query(sql, userInfo.name, (err, results) => {
        if (err)
            return res.msg(err);
        //数据库存在该字段
        if (results.length > 0) {
            let sql1 = "update auth set isdeleted=0 where name=?"
            db.query(sql1, userInfo.name, (err, results) => {
                if (err)
                    return res.msg(err);
                if (results.affectedRows > 0) {
                    res.send({
                        msg: '注册成功'
                    })
                }
            })
        }
        //不存在该字段
        else {
            //密码加密并插入数据库
            userInfo.password = bcrypt.hashSync(userInfo.password, 10)
            db.query(userSql.addUser, userInfo, (err, results) => {
                if (err)
                    return res.msg(err);
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
exports.userLogin = (req, res) => {
    let { name, password } = req.body;
    db.query(userSql.findUser, name, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.length === 0) {
            res.send(443, {
                msg: "该用户不存在!"
            });
            return;
        }
        const compareResult = bcrypt.compareSync(password, results[0].password);
        //密码错误
        if (!compareResult) {
            res.send(443, {
                msg: "密码错误!"
            })
        }
        else {
            let userInfo = { name }
            //加密用户信息生成token并返回
            const token = jwt.sign(userInfo, config.secretKey, {
                algorithm: 'HS256',
                expiresIn: '2h'
            });
            res.send({
                token: 'Bearer ' + token,
                msg: "登录成功"
            })
        }
    })

}
//获取用户ip地址
exports.getId = (req, res) => {
    res.send({
        status: 200,
        data: {
            ip: req.ip
        }
    })
}