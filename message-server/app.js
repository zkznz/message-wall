const express = require('express');
const config = require('./config/default')
const ejs = require("ejs")
const path = require("path");
const cors = require("cors");
const expressJwt = require("express-jwt");
const app = express();

//获取静态资源
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/data'));
//解决跨域
app.use(cors());

//解析html,服务端渲染
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//获取客户端发送数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//错误提示中间件
app.use((req, res, next) => {
    res.msg = (err, status = 1) => {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        })
    }
    next();
})
//验证token中间件
app.use(expressJwt.expressjwt({ secret: config.secretKey, algorithms: ["HS256"] }).unless({ path: [{ url: /^\/user\// }, { url: /^\/api\/.*/, methods: ['GET'] }, '/api/wall/addfeedbacks'] }));
//token校验错误中间件
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({
            msg: '请先登录',
        })
    }
})
//注册用户相关的路由
const userRouter = require("./router/user");
app.use('/user', userRouter);
//注册权限相关的路由
const authRouter = require("./router/auth");
app.use('/auth', authRouter);
//注册留言墙相关的路由
const wallRouter = require("./router/wall");
app.use('/api/wall', wallRouter);
//注册上传照片的路由
const filesRouter = require("./router/files");
app.use('/api', filesRouter);


app.listen(config.port, () => {
    console.log(`service running at http://127.0.0.1:${config.port}`);
})