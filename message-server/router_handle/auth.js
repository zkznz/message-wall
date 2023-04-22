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
                name: results[0].name,
                role: results[0].code,
                email: results[0].email
            }
            res.send({
                status: 200,
                data: userInfo
            })
        }
    })
}