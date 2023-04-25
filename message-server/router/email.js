const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const emailSql = require("../sql/email");
const emailserver = require("../control/emailserver");
router.post("/send", (req, res) => {
    const mail = req.body.email;
    emailserver.emailSignup(mail, res);
});
//验证认证码是否正确
router.post("/checkcode", (req, res) => {
    let { email, code } = req.body;
    console.log(email);
    db.query(emailSql.checkEmail, [email, code], (err, results) => {
        if (err)
            return res.msg(err);
        if (results.length > 0) {
            res.send({
                status: 200,
                check: true
            })
        }
        else {
            res.send({
                status: 200,
                check: false
            })
        }
    })
})
module.exports = router;