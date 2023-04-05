//用户登录
exports.login = (req, res) => {
    res.send({
        status: 200,
        data: {
            ip: req.ip
        }
    })
}