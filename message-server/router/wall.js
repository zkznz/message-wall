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
router.get("/delfeedbacks/:id/:type", wallHandler.delFeedBacks);
router.get("/delcomments/:id", wallHandler.delComments);

//查找整个留言墙卡片的数据
router.get("/findMessagePage", wallHandler.findMessagePage);
//分页查找评论
router.get("/findComment", wallHandler.findComment);
module.exports = router;
