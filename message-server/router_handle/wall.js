const db = require("../lib/db");
//留言墙相关的sql语句
const wallSql = require("../sql/wall")
exports.addMessage = (req, res) => {
    const msgInfo = req.body;
    db.query(wallSql.addMessage, msgInfo, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows < 1)
            return res.msg('添加失败');
        res.send({
            status: 200,
            msg: '添加成功！'
        })
    })
}
exports.addFeedBacks = (req, res) => {
    db.query(wallSql.addFeedBacks, req.body, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows < 1)
            return res.msg("添加失败");
        res.send({
            status: 200,
            msg: '添加成功！'
        })
    })
}
exports.addComment = (req, res) => {
    db.query(wallSql.addComment, req.body, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows < 1)
            return res.msg("添加失败");
        res.send({
            status: 200,
            msg: '添加成功！'
        })
    })
}
//删除
exports.delMessage = (req, res) => {
    db.query(wallSql.delMessage, req.params.id, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows < 1)
            return res.msg("删除失败");
        res.send({
            status: 200,
            msg: '删除成功！'
        })
    })
}

exports.delFeedBacks = (req, res) => {
    db.query(wallSql.delFeedbacks, req.params.id, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows < 1)
            return res.msg("删除失败");
        res.send({
            status: 200,
            msg: '删除成功！'
        })
    })
}
exports.delComments = (req, res) => {
    db.query(wallSql.delComments, req.params.id, (err, results) => {
        if (err)
            return res.msg(err);
        if (results.affectedRows < 1)
            return res.msg("删除失败");
        res.send({
            status: 200,
            msg: '删除成功！'
        })
    })
}
//查找
exports.findMessagePage = (req, res) => {
    let { page, pagesize, label, type } = req.query;
    const currentPage = (page - 1) * pagesize;
    pagesize = parseInt(pagesize);
    //查找全部
    if (label == -1) {
        const sql = "select * from walls where type=? order by id desc limit ?,? "
        db.query(sql, [currentPage, pagesize], (err, results) => {
            if (err)
                return res.msg(err);
            if (results.length == 0)
                return res.msg("查询失败");
            const sql1 = "select count (*) as total from walls"
            db.query(sql1, (err, among) => {
                if (err)
                    return res.msg(err);
                if (among.length == 0)
                    return res.msg("查找总数失败");
                let total = among[0];
                res.send({
                    status: 200,
                    msg: "查找成功",
                    data: results,
                    ...total
                })
            })
        })
    }
    //查找对应标签的留言
    else {
        db.query(wallSql.findMessagePage, [currentPage, pagesize], (err, results) => {
            if (err)
                return res.msg(err);
            if (results.length == 0)
                return res.msg("查询失败");
            db.query(wallSql.findMessageTotal, [type, label], (err, among) => {
                if (err)
                    return res.msg(err);
                if (among.length == 0)
                    return res.msg("查找总数失败");
                let total = among[0];
                res.send({
                    status: 200,
                    msg: "查找成功",
                    data: results,
                    ...total
                })
            })
        })
    }


}
//查找评论
exports.findComment = () => {

}
