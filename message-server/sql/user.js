//用户注册
exports.addUser = "insert into auth set ?";
//通过名称查询用户
exports.findUser = "select * from auth where name=? and isdeleted=0";
//通过邮箱查询用户
exports.findUserByEmail = "select * from auth where email=? and isdeleted=0";
//用户信息校验
exports.findAuth = "select * from auth where name=? and password=? and isdeleted=0";
//修改用户信息
exports.updateUser = "update auth set name=?,email=?,avatar=?,brief=?,sex=?,birthday=? where id=?"