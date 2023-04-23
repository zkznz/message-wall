const userSql = require("../sql/user");
const db = require("../lib/db");
//获取用户信息
exports.getUserInfo = (req, res) => {
    db.query(userSql.findUser, req.auth.name, (err, results) => {
        if (err)
            return res.send(err);
        if (results.length === 0)
            return res.send(401, {
                msg: "请先登录"
            });
        if (results.length > 0) {
            let userInfo = {
                userId: results[0].id,
                name: results[0].name,
                avatar: results[0].avatar,
                role: results[0].code,
                email: results[0].email,
                brief: results[0].brief,
                sex: results[0].sex,
                birthday: results[0].birthday
            }
            res.send({
                status: 200,
                data: userInfo
            })
        }
    })
}
//修改用户信息
exports.updateUserInfo = (req, res) => {
    let { name, userId, email, avatar, brief, sex, birthday } = req.body;
    db.query(userSql.updateUser, [name, email, avatar, brief, sex, birthday, userId], (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows > 0) {
            res.send({
                msg: "保存成功！"
            })
        }
    })
}