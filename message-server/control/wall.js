const db = require("../lib/db")
const sql = require("../sql/wall")
//查找总反馈数
exports.findFeedbacksTotal = (wallId, type) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findFeedbacksTotal, [wallId, type], (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })
}
//是否点赞
exports.findIslike = (wallId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findIslike, [wallId, userId], (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })
}
//查找评论数
exports.findCommentTotal = (wallId) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findCommentTotal, wallId, (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })

}