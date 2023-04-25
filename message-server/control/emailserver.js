const credentials = require("../config/credentials")
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: credentials.qq.user,
        pass: credentials.qq.password
    }
});
// 生成6位随机数
const randomFns = () => {
    let code = ""
    for (let i = 0; i < 6; i++) {
        code += parseInt(Math.random() * 10)
    }
    return code
}
//验证邮箱正则
const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

//注册发送邮箱给客户
exports.emailSignup = (email, res) => {
    if (regEmail.test(email)) {
        let code = randomFns()
        let options = {
            from: "1174633615@qq.com",
            to: email,
            subject: '验证你的电子邮件', // 标题
            html: `
            <p>你好！</p>
            <p>您正在找回轻语留言账号密码</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***该验证码2分钟内有效***</p>` // html 内容
        }
        //发送消息
        transport.sendMail(options, (err, msg) => {
            if (err)
                res.send(err);
            else {
                res.send("邮箱发送成功");
            }
        });
        //对数据库操作保存邮件信息和验证码
        const db = require("../lib/db");
        const emailSql = require("../sql/email");
        db.query(emailSql.findEmail, email, (err, results) => {
            if (err)
                return res.msg(err);
            //如果数据库存在该数据,直接更新验证码
            if (results.length > 0) {
                db.query(emailSql.updateCode, [code, email], (err, results) => {
                    if (err) {
                        return res.msg(err);
                    }

                    if (results.affectedRows > 0) {
                        console.log("验证码修改成功");
                    }
                })
            }
            //没有该数据，插入记录
            else {
                db.query(emailSql.addEmail, { email, code }, (err, results) => {
                    if (err) {
                        return res.msg(err);
                    }

                    if (results.affectedRows > 0) {
                        console.log("验证码插入成功");
                    }
                })
            }
        });
        //设置定时器两分钟后更改验证码
        setTimeout(() => {
            db.query(emailSql.updateCode, ['0', email], (err, results) => {
                if (err)
                    console.log(err);
                if (results.affectedRows > 0) {
                    console.log("验证码已重置");
                }
            })
        }, 30 * 1000);
    }
    else {
        res.send({
            status: 441,
            msg: "邮箱格式错误！"
        })
    }

}