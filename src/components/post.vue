<template>
  <div class="container mt-5">

    <div class="row">
      <!-- Hiển thị bài viết -->
      <div class="" v-for="(post, index) in posts" :key="index">
        <h1>{{ post.title }}</h1>
        <img :src="post.image" alt="Post Image" class="img-fluid rounded mb-3 " />
        <p>{{ post.content }}</p>
      </div>

      <!-- Phần bình luận -->
      <div class="">
        <h1 class="text-dark">Bình luận</h1>
        <textarea v-model="newComment" class="mb-3" rows="2" cols="90"
          placeholder="Nhập bình luận của bạn..."></textarea>
        <button @click="addComment" class="text-white bg-success p-2 rounded-3 mb-3 border-0">Gửi bình luận</button>

        <!-- Danh sách bình luận -->
        <div class="comment d-flex gap-3" v-for="(comment, index) in comments" :key="index">
          <p v="in user" class="text-muted">
             {{ user.username || 'Ẩn danh' }} 
          </p>
    
          <p>{{ comment }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from '../components/dangky.vue'
import Post from '../components/dangbaiviet.vue'; // Import component Post


export default {
  components: { Post },
  data() {
    return {
      newComment: '', // Dữ liệu cho bình luận mới
      comments: JSON.parse(localStorage.getItem("comments")) || [], // Danh sách các bình luận
      
      posts: JSON.parse(localStorage.getItem('posts')) || [],
      user: JSON.parse(localStorage.getItem("user")) || {},  
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment); // Thêm bình luận mới vào danh sách
        this.newComment = ''; // Làm trống ô nhập sau khi gửi
        localStorage.setItem("comments", JSON.stringify(this.comments))
      }
    },
    togglePostForm() {
      this.showPostForm = !this.showPostForm; // Đổi trạng thái hiển thị form
    },


  }
}
</script>

<style scoped>
.container {
  max-width: 1500px;
  margin: auto;
}
</style>