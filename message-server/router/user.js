const express = require("express")
const router = express.Router();
const expressJoi = require('@escook/express-joi')
//引入处理函数
const router_handler = require('../router_handle/user');
//引入校验规则对象
const { regSchema, loginSchema } = require('../schema/user');
router.get("/getId", router_handler.getId);
//检验用户名是否被占用
router.get("/checkname", router_handler.checkUser);
//检验账号是否存在
router.post("/checkCount", router_handler.checkCount);
//更改密码
router.post("/updatePwd", router_handler.updatePwd);
router.post("/register", expressJoi(regSchema), router_handler.register);
//用户登录
router.post("/login", expressJoi(loginSchema), router_handler.userLogin);
module.exports = router