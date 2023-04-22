//用户注册
exports.addUser = "insert into auth set ?";
//通过名称查询用户
exports.findUser = "select * from auth where name=?";