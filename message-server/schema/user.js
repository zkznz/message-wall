const joi = require('joi');

//用户名校验规则
const name = joi.string().min(1).max(10).required();
//密码校验规则
const password = joi.string().min(3).max(15).required();
//邮箱校验规则
const email = joi
    .string()
    .pattern(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).error(new Error('邮箱格式错误'))
    .required()
//规则对象
exports.regSchema = {
    //对req.body进行校验
    body: {
        name,
        password,
        email
    }
}
exports.loginSchema = {
    //对req.body进行校验
    body: {
        name,
        password,
    }
}