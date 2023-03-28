const express = require('express');
const config = require('./config/default')
const ejs = require("ejs")
const path = require("path");
const cors = require("cors");
const app = express();

//获取静态资源
app.use(express.static(__dirname) + '/dist');
app.use(express.static(__dirname) + '/data');
//解决跨域
app.use(cors());

//解析html,服务端渲染
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//获取客户端发送数据
app.use(express.json());
app.use(express.urlencoded({ extends: false }))

app.use()



app.listen(config.port, () => {
    console.log(`service running at http://127.0.0.1:${config.port}`);
})