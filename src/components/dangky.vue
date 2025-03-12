<template>
  <form id="registerForm" @submit.prevent="register">
    <div class="d-flex justify-content-center vh-100 align-items-center bg-light">
      <div class="register d-flex flex-column border shadow-lg p-4 rounded-4 col-12 col-sm-8 col-md-6 col-lg-5 bg-white">
        <h1 class="text-success text-center fw-bold">Register</h1>

        <!-- Ô nhập tên đăng nhập -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-person"></i></span>
          <input v-model="username" class="form-control" type="text" placeholder="Nhập tên đăng nhập"  />
        </div>
        <p v-if="errorUsername" class="text-danger text-center fw-bold">{{ errorUsername }}</p>

        <!-- Ô nhập email -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-envelope"></i></span>
          <input v-model="email" class="form-control" type="email" placeholder="Nhập email"  />
        </div>
        <p v-if="errorEmail" class="text-danger text-center fw-bold">{{ errorEmail }}</p>

        <!-- Ô nhập mật khẩu -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock"></i></span>
          <input v-model="password" class="form-control" type="password" placeholder="Nhập mật khẩu"  />
        </div>
        <p v-if="errorPassword" class="text-danger text-center fw-bold">{{ errorPassword }}</p>

        <!-- Ô xác nhận mật khẩu -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input v-model="confirmPassword" class="form-control" type="password" placeholder="Xác nhận mật khẩu"  />
        </div>
        <p v-if="errorMessage" class="text-danger text-center fw-bold">{{ errorMessage }}</p>

        <!-- Nút đăng ký -->
        <button type="submit" class="btn btn-success w-100 fw-bold py-2">
          <i class="bi bi-person-plus"></i> Đăng ký
        </button>

        <!-- Link đăng nhập -->
        <router-link class="text-center mt-3 d-block text-decoration-none text-primary fw-bold" to="/DangNhap">
          <i class="bi bi-box-arrow-in-right"></i> Đã có tài khoản?
        </router-link>

        <!-- Nút đăng nhập bằng Google -->
      <button class="btn btn-danger w-100 mt-3 fw-bold py-2" @click="loginWithGoogle">
        <i class="bi bi-google"></i> Đăng nhập với Google
      </button>
      </div>
    </div>
  </form>
</template>

<script>
import { auth, provider, signInWithPopup } from '@/firebase.js'; // Sử dụng alias @ trỏ đến thư mục src

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorUsername: "",
      errorEmail: "",
      errorPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    validateUsername(username) {
    if (!username) return "Tên đăng nhập không được để trống!";
    if (username.length < 4) return "Tên đăng nhập phải có ít nhất 4 ký tự!";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới!";
    return "";
  },

  validateEmail(email) {
    if (!email) return "Email không được để trống!";
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) return "Email không hợp lệ!";
    return "";
  },

  validatePassword(password) {
    if (!password) return "Mật khẩu không được để trống!";
    if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự!";
    if (!/[A-Z]/.test(password)) return "Mật khẩu phải chứa ít nhất một chữ hoa!";
    if (!/[a-z]/.test(password)) return "Mật khẩu phải chứa ít nhất một chữ thường!";
    if (!/[0-9]/.test(password)) return "Mật khẩu phải chứa ít nhất một số!";
    return "";
  },
    // Đăng nhập với Google không cần validation
    loginWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Đăng nhập với Google thành công:", result.user);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(result.user));
          this.$router.push("/"); // Điều hướng về trang chính
        })
        .catch((error) => {
          console.error("Lỗi đăng nhập với Google:", error);
          this.errorMessage = "Lỗi đăng nhập với Google!";
        });
    },

    // Kiểm tra và đăng ký tài khoản thông thường
    register() {
      this.errorUsername = this.validateUsername(this.username);
      this.errorEmail = this.validateEmail(this.email);
      this.errorPassword = this.validatePassword(this.password);

      if (this.errorUsername || this.errorEmail || this.errorPassword) {
        this.errorMessage = "Vui lòng kiểm tra lại thông tin.";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu xác nhận không khớp!";
        return;
      }

      // Lưu thông tin vào localStorage
      const user = { username: this.username, email: this.email, password: this.password };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Đăng ký thành công!");
      this.$router.push("/Login"); // Chuyển hướng đến trang đăng nhập
    },
  },
};
</script>

