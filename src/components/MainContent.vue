<template>
    <div class="news-container">
        <header class="news-header">
            <h1 class="news-title">Tin Tức Mới Nhất</h1>
        </header>

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div class="container">
                <a class="navbar-brand" href="#">Báo Mới</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="category in categories" :key="category.id">
                            <a class="nav-link" :class="{ active: selectedCategory === category.id }" @click="filterNews(category.id)">
                                <i :class="category.icon"></i> {{ category.name }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div v-if="filteredPosts.length" class="container">
            <div v-for="post in filteredPosts" :key="post.id" class="row align-items-center p-2 mb-2">
                <div class="col-auto">
                    <img :src="post.imageFile" alt="Post Image" class="img-fluid rounded" style="width: 155px; height: 110px; object-fit: cover;">
                </div>
                <div class="col">
                    <h5 class="fw-bold">{{ post.title }}</h5>
                    <p class="text-muted mb-1">
                        <i class="bi bi-person"></i> <strong>Tác giả:</strong> {{ post.Author || 'Ẩn danh' }} |
                        <i class="bi bi-calendar"></i> <strong>Ngày đăng:</strong> {{ formatDate(post.DatePost) }}
                    </p>
                    <p class="mb-0">{{ post.description || "Không có mô tả." }}</p>
                    <router-link :to="`/news/${post.id}`" class="read-more">Xem chi tiết</router-link>
                </div>
            </div>
        </div>
        
        <div v-else class="no-news">
            <p>Không có bài viết nào để hiển thị.</p>
        </div>
    </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
    data() {
        return {
            selectedCategory: 'all',
            categories: [
                { id: 'all', name: 'Tất Cả', icon: 'bi bi-newspaper' },
                { id: 'Worlds', name: 'Thế Giới', icon: 'bi bi-globe' },
                { id: 'Technology', name: 'Công Nghệ', icon: 'bi bi-cpu' },
                { id: 'Sports', name: 'Thể Thao', icon: 'bi bi-trophy' },
                { id: 'Entertaiment', name: 'Giải Trí', icon: 'bi bi-film' }
            ],
            posts: []
        };
    },
    computed: {
        filteredPosts() {
            if (this.selectedCategory === 'all') return this.posts;
            return this.posts.filter(post => post.category === this.selectedCategory);
        }
    },
    async created() {
        try {
            const querySnapshot = await getDocs(collection(db, "News"));
            this.posts = querySnapshot.docs.map(doc => {
                let data = doc.data();
                if (data.DatePost && typeof data.DatePost.toDate === "function") {
                    data.DatePost = data.DatePost.toDate();
                }
                return { ...data, id: doc.id };
            });
        } catch (error) {
            console.error("Lỗi khi lấy tin tức:", error);
        }
    },
    methods: {
        filterNews(category) {
            console.log("Chọn danh mục:", category); // Kiểm tra dữ liệu category
            this.selectedCategory = category;
        },
        formatDate(date) {
            return date ? new Date(date).toLocaleDateString() : "Không xác định";
        }
    }
};
</script>

<style scoped>
.news-container {
    width: 100vw;
    flex-direction: column;
}
.news-header {
    text-align: center;
    background: #f8f9fa;
    padding: 20px;
    border-bottom: 3px solid #ddd;
}
.read-more {
    display: inline-block;
    padding: 10px 15px;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 10px;
}
.read-more:hover {
    background: #0056b3;
}
.navbar-nav .nav-link {
    cursor: pointer;
}
.no-news {
    text-align: center;
    padding: 20px;
    color: #666;
}
</style>
