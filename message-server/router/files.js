//文件上传路由
const express = require("express");
const router = express.Router();
const multer = require("multer");
//生成随机数
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const storage = multer.diskStorage({
    //保存路径
    destination: function (req, file, cb) {
        cb(null, './data/photo')
        //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
    },
    //保存在 destination 中的文件名
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + random(1, 100));
    }
})
const upload = multer({ storage: storage })
router.post('/profile', upload.single('file'), function (req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    res.send({
        status: 200,
        msg: '上传成功',
        data: {
            img: `http://47.120.4.121:3000/photo/${req.file.filename}`
        }

    })
})
module.exports = router;
