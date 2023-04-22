//用户注册
exports.addUser = "insert into auth set ?";
//通过名称查询用户
exports.findUser = "select * from auth where name=? and isdeleted=0";
//用户信息校验
exports.findAuth = "select * from auth where name=? and password=? and isdeleted=0";