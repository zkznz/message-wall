const db = require("../lib/db");
//留言墙相关的sql语句
const wallSql = require("../sql/wall")
const control = require("../control/wall")
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
        const sql = "select * from walls where type=? and isdeleted=0 order by id DESC limit ?,?"
        db.query(sql, [type, currentPage, pagesize], async (err, results) => {
            if (err)
                return res.msg(err);
            if (results.length == 0)
                return res.msg("查询失败");
            for (let item of results) {
                //查询点赞数
                item.like = await control.findFeedbacksTotal(item.type, 0);
                //查询举报数
                item.report = await control.findFeedbacksTotal(item.type, 1);
                //查询撤销数
                item.revoke = await control.findFeedbacksTotal(item.type, 2);
                //是否点赞
                item.islike = await control.findIslike(item.type, item.userId);
                //查询评论数
                item.comtotal = await control.findCommentTotal(item.type);
            }
            console.log(results);
            const sql1 = "select count (*) as total from walls where isdeleted=0 and type=?";
            db.query(sql1, type, (err, among) => {
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
        db.query(wallSql.findMessagePage, [type, label, currentPage, pagesize], (err, results) => {
            if (err)
                return res.msg(err);
            if (results.length == 0) {
                res.send({
                    status: 200,
                    msg: "没有该数据",
                    data: results,
                    total: 0
                })
                return;
            }
            results.forEach(item => {
                //查询点赞数
                item.like = control.findFeedbacksTotal(item.id, 0);
                //查询举报数
                item.report = control.findFeedbacksTotal(item.id, 1);
                //查询撤销数
                item.revoke = control.findFeedbacksTotal(item.id, 2);
                //是否点赞
                item.islike = control.findIslike(item.id, item.userId);
                //查询评论数
                item.comtotal = control.findCommentTotal(item.id);
            })
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
exports.findComment = (req, res) => {
    let { id, page, pagesize } = req.query;
    const currentPage = (page - 1) * pagesize;
    pagesize = parseInt(pagesize);
    db.query(wallSql.findComment, [id, currentPage, pagesize], (err, results) => {
        if (err)
            return res.msg(err);
        db.query(wallSql.findCommentTotal, id, (err, among) => {
            if (err)
                return res.msg(err);
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
