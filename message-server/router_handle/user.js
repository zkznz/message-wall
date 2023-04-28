const db = require('../lib/db');
const bcrypt = require('bcryptjs')
const userSql = require('../sql/user');
const jwt = require('jsonwebtoken');
const config = require('../config/default')
//检验名称是否重复
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
//检验账号是否存在
exports.checkCount = (req, res) => {
    let { email } = req.body;
    db.query(userSql.findUserByEmail, email, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.length > 0)
            res.send(true);
        else
            res.send(false);
    })
}
//修改密码
exports.updatePwd = (req, res) => {
    const info = req.body;
    const password = bcrypt.hashSync(info.password, 10);
    db.query(userSql.updatePwd, [password, info.email], (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功,请重新登录"
            })
        }
    })
}
exports.register = (req, res) => {
    let userInfo = req.body;
    db.query(userSql.findUserByEmail, userInfo.email, (err, results) => {
        if (err)
            return res.msg(err);
        //用户已存在
        if (results.length > 0) {
            return res.send({
                status: 441,
                exist: true
            })
        }
        else {
            let sql = "select * from auth where name=? and isdeleted=1";
            db.query(sql, userInfo.email, (err, results) => {
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
