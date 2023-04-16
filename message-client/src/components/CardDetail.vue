<template>
    <div class="card">
        <div class="card-header">
            <p class="contact">联系墙主撕掉该标签</p>
            <span class="report">举报</span>
        </div>
        <NoteCard :note="noteItem" style="margin-top: 10px;width: 100%;"></NoteCard>
        <!-- 评论区 -->
        <div class="comment">
            <div class="comment-content">
                <a-textarea placeholder="请输入内容..." :auto-size="{ minRows: 2, maxRows: 5 }"></a-textarea>
                <div class="comment-input">
                    <a-input></a-input>
                    <a-button shape="round">评论</a-button>
                </div>
            </div>
            <div class="comment-list">
                <div class="comment-number">
                    <span>评论</span>
                    <span>{{ noteItem.comment }}</span>
                </div>
                <div class="comment">
                    <div class="content" v-for="item in commentData">

                        <div class="user" :style="{ 'background-image': portrait[item.imgurl] }"></div>
                        <div class="name">
                            <p>{{ item.name }}</p>
                            <span>{{ item.time }}</span>
                        </div>

                        <div class="message">{{ item.comment }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, computed, toRefs, inject } from 'vue'
import { useRoute } from 'vue-router'
import NoteCard from '@/components/NoteCard.vue'
import { IComment, ICommentParams } from '@/type'
import { findComment } from '@/api'
import moment from 'moment'
//头像背景
import { portrait } from '@/utils/data'
//接收留言卡片详情数据
const props = defineProps(['note']);
let noteItem = reactive(props.note);
const route = useRoute();
//总页数
let total = ref<number>(0);
let commentParams = reactive<ICommentParams>({
    wallId: noteItem.type,
    id: noteItem.id,
    page: 1,
    pagesize: 5
})
//评论详情数组
let commentData = ref<IComment[]>([]);
//获取评论详情
const handleTime = async (): Promise<void> => {
    let res = await findComment(commentParams);
    if (res.status == 200) {
        //处理时间
        commentData.value = res.data.map((item: IComment) => {
            item.time = moment(item.moment).format('YYYY.MM.DD hh:mm');
            return item;
        })
        total = res.total;
    }

}
//组件创建就执行函数
handleTime();

</script>

<style lang="less" scoped>
.card {
    height: 100%;

    .card-header {
        display: flex;
        position: fixed;
        padding: 20px 20px 20px 0;
        top: 50px;

        .contact {
            margin-right: 30px;
            cursor: pointer;
            font-size: 16px;
            color: @primary;
        }

        .report {
            cursor: pointer;
            font-size: 16px;
            color: @warning;
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

        .content {
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 32px;


            .name {
                display: flex;

                p {
                    font-size: 14px;
                    font-weight: 600;
                    margin-right: 5px;
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

            .message {
                padding-left: 37px;
            }
        }
    }

}
</style>