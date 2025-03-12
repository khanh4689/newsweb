<template>
    <div class="container mt-4">
        <button @click="$router.back()" class="btn btn-secondary mb-3">Quay lại</button>

        <div v-if="post" class="news-article">
            <div v-if="post.imageFile" class="text-center mb-4">
                <img :src="post.imageFile" alt="Post Image" class="img-fluid rounded news-image">
            </div>

            <h1 class="news-title">{{ post.title || "Không có tiêu đề" }}</h1>
            
            <p class="text-muted text-center">
                <i class="bi bi-person"></i> <strong>Tác giả:</strong> {{ post.Author || 'Ẩn danh' }} &nbsp;|&nbsp;
                <i class="bi bi-calendar"></i> <strong>Ngày đăng:</strong> {{ formatDate(post.DatePost) }}
            </p>
            
            <div class="news-content" v-html="post.content"></div>
        </div>
        
        <div v-else class="text-center text-muted">Đang tải bài viết...</div>
    </div>

    <div class="comment-section mt-5">
        <h3 class="text-dark">Bình luận</h3>
        <div class="comment-box p-3 border rounded">
            <textarea v-model="newComment" class="form-control" rows="3" placeholder="Nhập bình luận của bạn..."></textarea>
            <button @click="addComment" class="btn btn-success mt-2">Gửi bình luận</button>
        </div>

        <div class="comment-list mt-4">
            <div v-for="(comment, index) in comments" :key="index" class="comment-item p-2 border-bottom">
                <p class="mb-1"><strong>{{ user.username || 'Ẩn danh' }}</strong></p>
                <p class="mb-0">{{ comment }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
    props: ['id'],
    data() {
        return {
            post: null,
            postId: this.id || this.$route.params.id,
            newComment: '',
            comments: JSON.parse(localStorage.getItem("comments")) || [],
            user: JSON.parse(localStorage.getItem("user")) || {},
        };
    },
    async created() {
        if (!this.postId) {
            console.error("Lỗi: Không có ID bài viết.");
            return;
        }
        try {
            const docRef = doc(db, "News", this.postId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                this.post = docSnap.data();
            } else {
                console.warn("Bài viết không tồn tại!");
            }
        } catch (error) {
            console.error("Lỗi khi tải bài viết:", error);
        }
    },
    methods: {
        formatDate(date) {
            return date ? new Date(date).toLocaleDateString() : "Không xác định";
        },
        addComment() {
            if (this.newComment.trim()) {
                this.comments.push(this.newComment);
                this.newComment = '';
                localStorage.setItem("comments", JSON.stringify(this.comments));
            }
        },
    }
};
</script>

<style scoped>
.container {
    max-width: 800px;
}
.news-title {
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
}
.news-content {
    font-size: 1.1rem;
    line-height: 1.6;
}
.comment-section {
    max-width: 800px;
    margin: auto;
}
.comment-box textarea {
    width: 100%;
    border-radius: 5px;
}
.comment-list .comment-item {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    margin-top: 5px;
}
</style>
