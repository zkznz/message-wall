const express = require("express");
const router = express.Router();
const router_handler = require("../router_handle/email")
const emailserver = require("../control/emailserver");
router.post("/send", (req, res) => {
    const mail = req.body.email;
    emailserver.emailSignup(mail, res);
});
//验证认证码是否正确
router.post("/checkcode", router_handler.checkCode);
module.exports = router;