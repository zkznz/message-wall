//新增留言
exports.addMessage = "insert into walls set?"
//新增反馈
exports.addFeedBacks = "insert into feedbacks set?"
//新增评论
exports.addComment = "insert into comments set?"

//删除留言
exports.delMessage = `update walls,feedbacks,comments set walls.isdeleted=1,feedbacks.isdeleted=1,comments.isdeleted=1 
where walls.id=? and walls.id=feedbacks.wallId and walls.id=comments.wallId`
//删除反馈
exports.delFeedbacks = 'update feedbacks set isdeleted=1 where wallId=? and userId=? and type=?'
//删除评论
exports.delComments = 'update comments set isdeleted=1 where id=?'

//分页查找留言
exports.findMessagePage = 'select * from walls where type=? and label=? and isdeleted=0 order by id desc limit ?,?'
//查找留言总数
exports.findMessageTotal = 'select count(*) as total from walls where type=? and label=? and isdeleted=0'
//查找总反馈数
exports.findFeedbacksTotal = 'select count(*) as total from feedbacks where wallId=? and type=? and isdeleted=0'
//查找评论数
exports.findCommentTotal = 'select count(*) as total from comments where wallId=? and isdeleted=0'
//是否点赞
exports.findIslike = 'select count(*) as total from feedbacks where wallId=? and userId=? and isdeleted=0'
//分页查找评论
exports.findComment = 'select * from comments where wallId=? and isdeleted=0 order by id desc limit ?,?'

//通过id查找反馈
exports.findFeedbacksById = 'select * from feedbacks where wallId=? and userId=? and type=?'
//通过id查找评论
exports.findCommentsById = 'select * from comments where wallId=? and userId=? and isdeleted=1'

