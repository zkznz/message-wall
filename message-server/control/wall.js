const db = require("../lib/db")
const sql = require("../sql/wall")
//查找总反馈数
exports.findFeedbacksTotal = (id, type) => {
    let total = 0;
    db.query(sql.findFeedbacksTotal, [id, type], (err, results) => {
        if (err)
            console.log(err);
        total = results[0].total;
    })
    return total;
}
//是否点赞
exports.findIslike = (id, userId) => {
    let total = 0;
    db.query(sql.findIslike, [id, userId], (err, results) => {
        if (err)
            console.log(err);
        total = results[0].total;
    })
    return total;
}
//查找评论数
exports.findCommentTotal = (id) => {
    let total = 0;
    db.query(sql.findCommentTotal, id, (err, results) => {
        if (err)
            console.log(err);
        total = results[0].total;
    })
    return total;
}