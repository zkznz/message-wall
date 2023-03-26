import Mock from 'mockjs'

export const note = Mock.mock({
    "data|20": [{
        //创建时间
        "moment": new Date(),
        "id|+1": 1,
        "userId|+1": 10,
        //内容
        "message|24-96": "@cword",
        "label|0-10": 0,
        "name": "@cname",
        "like|0-120": 0,
        //评论
        "comment|0-120": 0,
        //背景色
        "imgurl|0-4": 0,
        //是否撤销
        "revoke|0-20": 0,
        //是否举报
        "report|0-20": 0
    }]
})
//卡片背景色
export const cardColor = [
    'rgba(252,175,162,0.30)',
    'rgba(255,227,148,0.30)',
    'rgba(146,230,245,0.30)',
    'rgba(168,237,138,0.30)',
    'rgba(202,167,247,0.30)',
    'rgba(212,212,212,0.30)'
]