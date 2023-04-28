const db = require("../lib/db");
const emailSql = require("../sql/email");
exports.checkCode = (req, res) => {
    let { email, code } = req.body;
    db.query(emailSql.checkEmail, [email, code], (err, results) => {
        if (err)
            return res.msg(err);
        if (results.length > 0) {
            res.send({
                check: true
            })
        }
        else {
            res.send({
                check: false
            })
        }
    })
}
exports.submitInfo = (req, res) => {

}
