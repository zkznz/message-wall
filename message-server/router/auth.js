const express = require("express");
const router = express.Router();
const router_handler = require("../router_handle/auth");
//获取用户信息
router.get("/getUserInfo", router_handler.getUserInfo);
//更改用户信息
router.post("/updateUserInfo", router_handler.updateUserInfo);
//删除账号
router.post("/delUser", router_handler.delUser);
module.exports = router;