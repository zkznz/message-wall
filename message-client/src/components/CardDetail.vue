<template>
    <div class="card">
        <div class="card-header" v-if="userInfo && userInfo.role === 'admin'">
            <p class="contact">联系墙主撕掉该便签 {{ noteItem.revoke }}</p>
            <span class="report">举报 {{ noteItem.report }}</span>
            <span class="delcard" @click="deleteCard">删除</span>
        </div>
        <div class="card-header" v-else>
            <p class="contact" @click="revokeNote">联系墙主撕掉该便签</p>
            <span class="report" @click="reportNote">举报</span>
        </div>
        <NoteCard :note="noteItem" style="margin-top: 35px;width: 100%;"></NoteCard>
        <!-- 评论区 -->
        <div class="comment">
            <div class="comment-content">
                <a-textarea placeholder="请输入内容..." :auto-size="{ minRows: 2, maxRows: 5 }"
                    v-model:value="comment"></a-textarea>
                <div class="comment-input">
                    <a-input v-model:value="name" placeholder="签名"></a-input>
                    <a-button shape="round" :style="{ 'background-color': disabled ? '#ccc' : 'black' }"
                        @click="submitComment" :disabled="disabled">评论</a-button>
                </div>
            </div>
            <div class="comment-list">
                <div class="comment-number">
                    <span>评论</span>
                    <span>{{ total }}</span>
                </div>
                <div class="comment">
                    <div class="content" v-for="item in commentData">
                        <div v-if="item.imgUrl.length !== 1 && item.imgUrl.length !== 2">
                            <img class="user" :src="item.imgUrl" alt="">
                        </div>
                        <div class="user" v-else :style="{ 'background-image': portrait[item.imgUrl] }"></div>
                        <div :class="(userInfo && userInfo.role === 'admin') ? 'admin' : 'name'">
                            <p>{{ item.name }}</p>
                            <span>{{ item.time }}</span>
                            <div class="delmsg" v-if="userInfo && userInfo.role === 'admin'" @click="delComment(item)">删除
                            </div>
                        </div>

                        <div class="review">{{ item.comment }}</div>
                    </div>
                    <div class="more" v-if="total != commentData.length" @click="handleTime">
                        加载更多
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, computed, watch, defineEmits } from 'vue'
import NoteCard from '@/components/NoteCard.vue'
import { IComment, ICommentParams, IFeedBacksParams } from '@/type'
import { message } from 'ant-design-vue'
import { findComment, addComment, delComments, delMessage, addFeedback } from '@/api'
import moment from 'moment'
//头像背景
import { portrait } from '@/utils/data'
import { useMainStore } from '@/store'
//接收留言卡片详情数据
const props = defineProps(['note']);
const emits = defineEmits(['delMsg']);
const noteItem = computed(() => reactive(props.note));
let commentParams = reactive<ICommentParams>({
    wallId: noteItem.value.id,
    page: 1,
    pagesize: 2
})
//获取仓库
const mainStore = useMainStore();
//评论数
let total = ref<number>(0);
//评论名字
let name = ref<string>('');
//评论内容
let comment = ref<string>('');
//按钮禁用
let disabled = computed(() => comment.value.trim() === "" || name.value.trim() === "");
//评论详情数组
let commentData = ref<IComment[]>([]);
//用户信息
const userInfo = reactive(JSON.parse(localStorage.getItem("userInfo") as string));
//获取评论详情
const handleTime = async () => {
    let res = await findComment(commentParams);
    if (res.status == 200) {
        //处理时间
        commentData.value.push(...res.data.map((item: IComment) => {
            item.time = moment(item.moment).format('YYYY.MM.DD hh:mm');
            return item;
        }))
        total.value = res.total;
    }
    if (commentData.value.length != total.value)
        commentParams.page++;
}
//重新获取评论
const handleLoading = () => {
    commentData.value = [];
    commentParams = {
        wallId: noteItem.value.id,
        page: 1,
        pagesize: 2
    }
    handleTime();
}
watch(noteItem, () => {
    handleLoading();
    name.value = "";
    comment.value = "";
});
handleLoading();
//添加评论
const submitComment = async () => {
    let data: IComment = {
        wallId: noteItem.value.id,
        userId: mainStore.user.id,
        imgUrl: userInfo.avatar || String(Math.floor(Math.random() * 14)),
        comment: comment.value,
        name: name.value,
        moment: new Date()
    }
    try {
        let res = await addComment(data);
        if (res.status === 200) {
            noteItem.value.comtotal++;
            total.value++;
            data.time = moment(data.moment).format('YYYY.MM.DD hh:mm');
            commentData.value.unshift(data);
        }
        name.value = "";
        comment.value = "";
    } catch (error) {
        name.value = "";
        comment.value = "";
    }
}
//删除留言信息
const deleteCard = async () => {
    let res = await delMessage(noteItem.value.id);
    if (res.status === 200) {
        //发请求通知父组件关闭弹窗并重新加载
        emits('delMsg');
        message.info("留言已删除");
    }
}
//删除评论
const delComment = async (commentItem: IComment) => {
    let data = {
        userId: commentItem.userId,
        moment: commentItem.moment
    }
    let res = await delComments(data);
    if (res.status === 200) {
        noteItem.value.comtotal--;
        total.value--;
        handleLoading();
        message.info("评论已删除");
    }
}
//联系墙主撤销便签
const revokeNote = async () => {
    let data: IFeedBacksParams = {
        wallId: noteItem.value.id,
        userId: mainStore.user.id,
        type: 2,
        moment: new Date()
    }
    let res = await addFeedback(data);
    if (res.status === 200) {
        message.info("感谢你的反馈");
    }
}
//举报便签
const reportNote = async () => {
    let data: IFeedBacksParams = {
        wallId: noteItem.value.id,
        userId: mainStore.user.id,
        type: 1,
        moment: new Date()
    }
    let res = await addFeedback(data);
    if (res.status === 200) {
        message.info("感谢你的反馈");
    }
}
</script>

<style lang="less" scoped>
.card {
    height: 100vh;

    .card-header {
        display: flex;
        align-items: center;
        position: fixed;
        padding: 20px 20px 20px 0;
        top: 90px;

        .contact {
            margin-right: 30px;
            cursor: pointer;
            font-size: 16px;
            color: @primary;
        }

        .report {
            cursor: pointer;
            margin-right: 50px;
            font-size: 16px;
            color: @warning;
        }

        .delcard {
            cursor: pointer;
            font-size: 16px;
            color: @error
        }
    }

    // 评论输入框
    .comment-content {
        padding: 10px 0;

        .ant-input {
            border: 1px solid rgba(148, 148, 148, 1);
        }

        .comment-input {
            display: flex;
            padding-top: 10px;

            .ant-btn {
                background-color: black;
                color: #fff;
                font-size: 14px;
                margin-left: 40px;
            }
        }
    }

    //评论内容详情
    .comment-list {
        .comment-number {
            padding: 20px 0;
            color: @gray-1;
            font-size: 14px;

            span {
                margin-right: 5px;
                font-weight: 600;
            }
        }

        .comment {
            .content {
                display: flex;
                flex-wrap: wrap;
                padding-bottom: 22px;
                height: 72px;

                //管理员样式
                .admin {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;

                    p {
                        font-size: 14px;
                        font-weight: 600;
                    }

                    span {
                        line-height: 24px;
                        font-size: 12px;
                        color: @gray-2;
                        margin-left: -70px;

                    }

                    .delmsg {
                        cursor: pointer;
                        font-size: 14px;
                        color: @error
                    }
                }

                .name {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;

                    p {
                        font-size: 14px;
                        font-weight: 600;
                    }

                    span {
                        line-height: 24px;
                        font-size: 12px;
                        color: @gray-2;

                    }


                }

                .user {
                    flex: none;
                    border-radius: 20px;
                    margin-right: 8px;
                    width: 28px;
                    height: 28px;
                }

                .review {
                    width: 100%;
                    padding-left: 37px;
                }
            }
        }



        .more {
            color: @gray-1;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
        }
    }

}
</style>