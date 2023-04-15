const db = require("../lib/db")
const sql = require("../sql/wall")
//查找总反馈数
exports.findFeedbacksTotal = (wallId, id, type) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findFeedbacksTotal, [wallId, id, type], (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })
}
//是否点赞
exports.findIslike = (wallId, id, userId) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findIslike, [wallId, id, userId], (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })
}
//查找评论数
exports.findCommentTotal = (id, wallId) => {
    return new Promise((resolve, reject) => {
        db.query(sql.findCommentTotal, [id, wallId], (err, results) => {
            if (err)
                reject(err);
            resolve(results[0].total);
        })
    })

}