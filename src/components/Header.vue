<template>
    <header class="news-header">
        <div class="container d-flex justify-content-between align-items-center py-2">
            <!-- Logo -->
            <div>
                <router-link to="/">
                    <img src="@/assets/img/logo-energy-pilates.png" alt="Logo" class="logo">
                </router-link>
            </div>

            <!-- Thanh tìm kiếm -->
            <div class="search-container">
                <input
                    v-model="searchQuery"
                    class="form-control"
                    type="search"
                    placeholder="Tìm kiếm bài viết..."
                    aria-label="Search"
                />
            </div>

            <!-- Menu chính -->
            <nav class="nav-items d-flex">
                <router-link to="/" class="nav-link" title="Trang chủ">
                    <i class="bi bi-house-door-fill"></i>
                </router-link>
                <router-link to="/account" class="nav-link" title="Tài khoản">
                    <i class="bi bi-person-circle"></i>
                </router-link>
                <router-link to="/dangbaiviet" class="nav-link" title="Đăng bài">
                    <i class="bi bi-file-earmark-plus-fill"></i>
                </router-link>
            </nav>
        </div>
    </header>

    <!-- Hiển thị danh sách bài viết dưới dạng thẻ nhỏ -->
    <div v-if="searchQuery.trim() && filteredPosts.length" class="container mt-3">
        <div class="row row-cols-2 row-cols-md-4 g-3">
            <div v-for="post in filteredPosts" :key="post.id" class="col">
                <div class="card h-100">
                    <router-link :to="`/news/${post.id}`" class="text-decoration-none">
                        <img :src="post.imageFile" alt="Post Image" class="card-img-top">
                        <div class="card-body text-center">
                            <h6 class="card-title text-dark">{{ post.title }}</h6>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <!-- Slider -->
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="@/assets/img/banner1.jpg" class="d-block w-100" alt="Banner 1">
            </div>
            <div class="carousel-item">
                <img src="@/assets/img/banner2.jpg" class="d-block w-100" alt="Banner 2">
            </div>
            <div class="carousel-item">
                <img src="@/assets/img/banner3.jpg" class="d-block w-100" alt="Banner 3">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>
</template>

<style scoped>
/* Header */
.news-header {
    background-color: #93bee6;
    padding: 10px 0;
}

/* Logo */
.logo {
    width: 150px;
}

/* Navigation */
.nav-items {
    display: flex;
    gap: 20px;
}

.nav-link {
    text-decoration: none;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
}

.nav-link:hover {
    color: #0056b3;
}

/* Carousel */
.carousel {
    width: 100%;
    max-height: 400px;
}

.carousel img {
    object-fit: cover;
    height: 400px;
}

/* Search */
.search-container {
    width: 300px;
}

/* Định dạng cho danh sách bài viết */
.card {
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
}

.card:hover {
    transform: scale(1.05);
}

.card-img-top {
    height: 120px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
}

.card-title {
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 5px;
}
</style>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export default {
    data() {
        return {
            searchQuery: '',
            selectedCategory: 'all',
            posts: []
        };
    },
    computed: {
        filteredPosts() {
            let filtered = this.selectedCategory === 'all'
                ? this.posts
                : this.posts.filter(post => post.category === this.selectedCategory);

            // Lọc theo tiêu đề bài viết dựa trên từ khóa tìm kiếm
            if (this.searchQuery.trim()) {
                filtered = filtered.filter(post =>
                    post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
            return filtered;
        }
    },
    async created() {
        try {
            const querySnapshot = await getDocs(collection(db, "News"));
            this.posts = querySnapshot.docs.map(doc => {
                let data = doc.data();
                if (data.DatePost && data.DatePost.toDate) {
                    try {
                        data.DatePost = data.DatePost.toDate();
                    } catch (error) {
                        console.warn("Lỗi khi chuyển đổi DatePost:", error);
                    }
                }
                return { ...data, id: doc.id };
            });
        } catch (error) {
            console.error("Lỗi khi lấy tin tức:", error);
        }
    },
    methods: {
        formatDate(date) {
            return date ? new Date(date).toLocaleDateString() : "Không xác định";
        }
    }
};
</script>
