const express = require("express")
const router = express.Router();
//引入处理函数
const router_handler = require('../router_handle/user');
router.get("/getId", router_handler.getId);
//检验用户名是否被占用
router.get("/checkname", router_handler.checkUser);
//检验账号是否存在
router.post("/checkCount", router_handler.checkCount);
router.post("/register", router_handler.register);
//用户登录
router.post("/login", router_handler.userLogin);
module.exports = router