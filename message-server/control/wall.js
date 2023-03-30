const db = require("../lib/db")
const sql = require("../sql/wall")
//查找总反馈数
exports.findFeedbacksTotal = (id, type) => {
    db.query(sql.findFeedbacksTotal, [id, type], (err, results) => {
        if (err)
            console.log(err);
        return results[0].total;
    })
}
//是否点赞
exports.findIslike = (id, userId) => {
    db.query(sql.findIslike, [id, userId], (err, results) => {
        if (err)
            console.log(err);
        return results[0].total;
    })
}
//查找评论数
exports.findCommentTotal = (id) => {
    db.query(sql.findCommentTotal, id, (err, results) => {
        if (err)
            console.log(err);
        return results[0].total;
    })
}