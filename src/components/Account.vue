<template>
    <div class="container">

        <div class="row">
            <div class="col-sm-4 ">
                <div class="content-2 p-3">
                    <h1 class="">Thông tin cá nhân</h1>
                    <div v="in user" class="list-group">
                        <!-- Nút chỉnh sửa tên người dùng -->
                        <button type="button"
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            data-bs-toggle="modal" data-bs-target="#usernameModal">
                            <p>{{ user.username }}</p>
                            <a href="#"><i class="bi bi-pen"></i></a>
                        </button>

                        <!-- Nút chỉnh sửa mật khẩu -->
                        <button type="button"
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            data-bs-toggle="modal" data-bs-target="#passwordModal">
                            <p>Password???</p>
                            <a href="#"><i class="bi bi-pen"></i></a>
                        </button>

                        <!-- Nút chỉnh sửa email -->
                        <button type="button mb-3"
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            data-bs-toggle="modal" data-bs-target="#emailModal">
                            <p>{{ user.email }}</p>
                            <a href="#"><i class="bi bi-pen"></i></a>
                        </button>
                        <button class="btn btn-danger " @click="logout">Đăng xuất</button>


                    </div>
                </div>

                <!-- Modal chỉnh sửa tên người dùng -->
                <div class="modal fade" id="usernameModal" tabindex="-1" aria-labelledby="usernameModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="usernameModalLabel">Chỉnh sửa tên người dùng</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="username" class="form-label">Tên người dùng</label>
                                        <input type="text" class="form-control" id="username" v-model="newUsername" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button @click="changeUsername" type="button" class="btn btn-primary">Lưu thay
                                    đổi</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal chỉnh sửa mật khẩu -->
                <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="passwordModalLabel">Đổi mật khẩu</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="newPassword" class="form-label">Mật khẩu mới</label>
                                        <input type="password" class="form-control" id="newPassword"
                                            placeholder="Nhập mật khẩu mới" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="confirmPassword" class="form-label">Nhập lại mật khẩu</label>
                                        <input type="password" class="form-control" id="confirmPassword"
                                            placeholder="Nhập lại mật khẩu" required />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button @click="changePassword" type="button" class="btn btn-primary">Lưu thay
                                    đổi</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal chỉnh sửa email -->
                <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="emailModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="emailModalLabel">Chỉnh sửa email</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="newEmail" class="form-label">Email mới</label>
                                        <input type="email" class="form-control" id="newEmail"
                                            placeholder="Nhập email mới" required />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button @click="changeEmail" type="button" class="btn btn-primary">Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div class="col-sm-8">
                <h1>Blog của tôi</h1>
                <div class="row bg-light rounded-3 ">
                    <div class="p-3">
                        <div class="border rounded-3 p-4 bg-white">
                            <!-- First Item -->
                            <div class="d-flex gap-3 mb-3" v-for="(post, index) in posts" :key="index">
                                <img class="img-fluid" :src="post.image" alt="" style="width: 70px;">
                                <div class="d-flex flex-column">
                                    <h5>{{ post.title }}</h5>
                                    <div class="d-flex">
                                        <i class="bi bi-chat-left-fill"></i>
                                        <p class="mb-0 ms-2">16</p>
                                    </div>
                                    <div class="mt-2">

                                        <button class="btn btn-danger btn-sm" @click="deletePost(index)">Xóa</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import Post from '../components/dangbaiviet.vue'; // Import component Post
import dangky from '../components/dangky.vue'


export default {
    components: { Post },
    components: { dangky },

    data() {
        return {

            posts: JSON.parse(localStorage.getItem('posts')) || [],
            user: JSON.parse(localStorage.getItem("user")) || {},

        };
    },

    methods: {
        togglePostForm() {
            this.showPostForm = !this.showPostForm; // Đổi trạng thái hiển thị form
        },

        //Xóa posts
        deletePost(index) {
            // Xóa bài viết tại vị trí index
            this.posts.splice(index, 1);

            // Cập nhật lại localStorage
            localStorage.setItem('posts', JSON.stringify(this.posts));

            console.log('Dữ liệu sau khi xóa:', this.posts);
        },
        logout() {
            // Xóa tất cả dữ liệu trong localStorage
            localStorage.removeItem('user');
            // Điều hướng người dùng về trang đăng nhập
            this.$router.push('/login');
            localStorage.setItem("isLoggedIn", "false");
        },

        // Đổi tên người dùng
        changeUsername() {
            if (!this.newUsername.trim()) {
                alert("Tên người dùng không được để trống.");
                return;
            }

            this.user.username = this.newUsername;

            // Cập nhật lại thông tin người dùng vào localStorage
            localStorage.setItem('user', JSON.stringify(this.user));

            // Đóng modal
            this.newUsername = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('usernameModal'));
            modal.hide();

            alert("Tên người dùng đã được thay đổi thành công.");
        },

        // Đổi mật khẩu
        changePassword() {
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (newPassword !== confirmPassword) {
                alert("Mật khẩu không khớp. Vui lòng nhập lại.");
                return;
            }

            this.user.password = newPassword;

            // Cập nhật lại thông tin người dùng vào localStorage
            localStorage.setItem('user', JSON.stringify(this.user));

            // Đóng modal
            document.getElementById("newPassword").value = '';
            document.getElementById("confirmPassword").value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('passwordModal'));
            modal.hide();

            alert("Mật khẩu đã được thay đổi thành công.");
        },

        changeEmail() {
            const newEmail = document.getElementById("newEmail").value;

            // Kiểm tra nếu email mới trống
            if (!newEmail.trim()) {
                alert("Email không được để trống.");
                return;
            }

            

            // Cập nhật lại email trong đối tượng user
            this.user.email = newEmail;

            // Cập nhật lại thông tin người dùng vào localStorage
            localStorage.setItem('user', JSON.stringify(this.user));

            // Đóng modal và reset giá trị trong form
            document.getElementById("newEmail").value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('emailModal'));
            modal.hide();

            alert("Email đã được thay đổi thành công.");
        }




    },



};

</script>

<style>
a {
    text-decoration: none;
    color: inherit;
}

h1 {
    color: #34d8eb;
}

input:focus {
    outline: none;
    box-shadow: none;
}
</style>