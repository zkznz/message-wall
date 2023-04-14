const db = require("../lib/db")
const sql = require("../sql/wall")
//查找总反馈数
exports.findFeedbacksTotal = (id, type) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findFeedbacksTotal, [id, type], (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })
}
//是否点赞
exports.findIslike = (id, userId) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findIslike, [id, userId], (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })
}
//查找评论数
exports.findCommentTotal = (id) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findCommentTotal, id, (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })

}