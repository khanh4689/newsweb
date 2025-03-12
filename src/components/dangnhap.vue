<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="register d-flex flex-column border shadow-lg p-4 rounded-4 col-12 col-sm-8 col-md-6 col-lg-5 bg-white">
      <h1 class="text-success text-center p-3 fw-bold">Login</h1>

      <!-- Ô nhập tên đăng nhập -->
      <div class="input-group mb-3">
        <span class="input-group-text"><i class="bi bi-person"></i></span>
        <input v-model="username" class="form-control" type="text" placeholder="Nhập tên đăng nhập" />
      </div>

      <!-- Ô nhập mật khẩu -->
      <div class="input-group mb-3">
        <span class="input-group-text"><i class="bi bi-lock"></i></span>
        <input v-model="password" class="form-control" type="password" placeholder="Nhập mật khẩu" />
      </div>

      <!-- Thông báo lỗi -->
      <p v-if="errorMessage" class="text-danger text-center fw-bold">{{ errorMessage }}</p>

      <!-- Nút đăng nhập -->
      <button class="btn btn-success w-100 fw-bold py-2" @click="login">
        <i class="bi bi-box-arrow-in-right"></i> Đăng nhập
      </button>

      <!-- Link đăng ký -->
      <router-link class="text-center mt-3 d-block text-decoration-none text-primary fw-bold" to="/dangky">
        <i class="bi bi-person-plus"></i> Chưa có tài khoản?
      </router-link>

      <!-- Nút đăng nhập bằng Google -->
      <button class="btn btn-danger w-100 mt-3 fw-bold py-2" @click="loginWithGoogle">
        <i class="bi bi-google"></i> Đăng nhập với Google
      </button>
    </div>
  </div>
</template>


<script>
import { auth, provider, signInWithPopup } from '@/firebase.js'; // Sử dụng alias @ trỏ đến thư mục src

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      // Xử lý đăng nhập thông thường (local)
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        this.errorMessage = "Tài khoản không tồn tại. Vui lòng đăng ký!";
        return;
      }
      if (this.username === user.username && this.password === user.password) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập
        this.$router.push("/"); // Chuyển tới trang chủ
      } else {
        this.errorMessage = "Sai tên đăng nhập hoặc mật khẩu!";
      }
    },
    loginWithGoogle() {
      // Sử dụng Firebase để đăng nhập với Google
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Đăng nhập với Google thành công:", result.user);
          localStorage.setItem("isLoggedIn", "true");
          // Lưu thông tin user nếu cần:
          localStorage.setItem("user", JSON.stringify(result.user));
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Lỗi đăng nhập với Google:", error);
          this.errorMessage = "Lỗi đăng nhập với Google!";
        });
    },
  },
};
</script>

<style scoped>
.scale-up {
  transform: scale(1.2);
  transform-origin: center;
}
</style>
