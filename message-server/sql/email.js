exports.addEmail = "insert into mail set ?"
exports.findEmail = "select * from mail where email=? "
exports.checkEmail = "select * from mail where email=? and code=?"
exports.updateCode = "update mail set code=? where email=?"