const express = require("express");
const router = express.Router();

//引入路由处理函数
const wallHandler = require("../router_handle/wall");
//添加新留言
router.post("/addmessage", wallHandler.addMessage);
//添加反馈
router.post("/addfeedbacks", wallHandler.addFeedBacks);
//添加评论
router.post("/addcomment", wallHandler.addComment);

//删除
router.get("/delmessage/:id", wallHandler.delMessage);
router.get("/delfeedbacks/:id", wallHandler.delFeedBacks);
router.get("/delcomments/:id", wallHandler.delComments);

//查找
router.get("/findMessagePage", wallHandler.findMessagePage);
// router.post("/findComment",wallHandler.findComment);
module.exports = router;
