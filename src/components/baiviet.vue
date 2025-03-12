<template>
    <div class="container-fluid">
        <div class="container mt-5">
            <!-- Title Section -->
            <div class="text-center mb-4">
                <h1>Bài Viết</h1>
                <p>Đăng ký nhận email ngay để được cập nhật thông tin sản phẩm và bài viết về chương trình khuyến mãi.</p>
                <form>
                    <div class="mb-3">
                      <input type="email" class="form-control" placeholder="Email của bạn" style="max-width: 400px; margin: 0 auto;">
                    </div>
                    <button type="submit" class="btn btn-primary      shadow mb-3 text-white"><strong>Đăng ký</strong></button>
                  </form>
            </div>
            <router-link to="/post" class="text-decoration-none text-reset">
                <!-- Highlighted Post -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <img src="@/assets/img/tim-mach.jpg" alt="Highlighted Post Image">
                    </div>
                    <div class="col-md-6 d-flex align-items-center highlighted-post">
                        <div>
                            <span class="badge bg-light text-dark mb-2">Latest</span>
                            <h3>Chuột Lamzu chính thức hỗ trợ 8000Hz Polling Rate cho các dòng sử dụng Nordic MCU</h3>
                            <p>Trên dòng sản phẩm chuột Lamzu, công nghệ mới đã được tích hợp để hỗ trợ tốc độ phản hồi...</p>
                            <p class="text-light">11 Tháng 11, 2023</p>
                        </div>
                    </div>
                </div>
            </router-link>
    
            <!-- Smaller Posts Grid -->
            <div class="row">
                <div class="col-md-4 small-post">
                    <img src="@/assets/img/sesameoil_300x300.jpg" alt="Small Post 1">
                    <h5 class="post-title mt-2">Tìm hiểu tính năng Dynamic Auto-Caliberation trên bàn phím...</h5>
                    <p>Đặc điểm nổi bật của Dynamic Auto-Caliberation...</p>
                    <p class="text-muted">11 Tháng 11, 2023</p>
                </div>
                <div class="col-md-4 small-post">
                    <img src="@/assets/img/sesameoil_300x300.jpg" alt="Small Post 2">
                    <h5 class="post-title mt-2">Pwnage ra mắt Zenblades 65...</h5>
                    <p>Phiên bản Zenblades mới hỗ trợ người dùng tùy chỉnh...</p>
                    <p class="text-muted">11 Tháng 11, 2023</p>
                </div>
                <div class="col-md-4 small-post">
                    <img src="@/assets/img/sesameoil_300x300.jpg" alt="Small Post 3">
                    <h5 class="post-title mt-2">8000 Hz Polling Rate...</h5>
                    <p>Giới thiệu công nghệ mới...</p>
                    <p class="text-muted">11 Tháng 11, 2023</p>
                </div>
                <!-- Add more posts as needed -->
            </div>
        </div>
    </div>
</template>

<script>
        // Bootstrap validation script
        (function () {
            'use strict';

            
            var forms = document.querySelectorAll('.needs-validation');

           
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault();
                            event.stopPropagation();
                        }

                        form.classList.add('was-validated');
                    }, false);
                });
        })();

        export default {};
    </script>

<style>
.footer {
background-color: #f8f9fa;
padding: 20px 0;
color: #000;
}
.footer h5 {
margin-bottom: 20px;
}
.footer a {
color: #000;
text-decoration: none;
}
.footer a:hover {
text-decoration: underline;
}
.social-icons a {
margin-right: 10px;
font-size: 24px;
color: #000;
}
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
}
.btn-login {
    border-radius: 30px;
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    width: 100%;
}
.btn-login:hover {
    background-color: #333;
}
.highlighted-post {
    background-color: #001F54; /* Adjust to match the desired color */
    color: white;
    padding: 20px;
    border-radius: 30px;
    
}
.highlighted-post img {
    max-width: 100%;
    height: auto;
    border-radius: 100px;
}
.post-title {
    font-weight: bold;
}
.small-post img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
}
.small-post {
    margin-bottom: 20px;
}
.category-tabs a {
    margin: 0 5px;
    color: #333;
}
.category-tabs a.active {
    font-weight: bold;
}
</style>