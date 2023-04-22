const express = require("express")
const router = express.Router();
//引入处理函数
const router_handler = require('../router_handle/user');
router.post("/login", router_handler.login);
router.post("/register", router_handler.register);

module.exports = router