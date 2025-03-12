<template>
  <div class="container text-center">
    <div class="container mt-5">
      <h2 class="mb-4">{{ isEditing ? 'Cập nhật' : 'Đăng bài' }}</h2>

      <form @submit.prevent="taoBaiViet">
        <div class="mb-3">
          <label for="title" class="form-label">Tiêu đề bài viết</label>
          <input v-model="title" type="text" id="title" class="form-control" placeholder="Nhập tiêu đề" />
          <p class="text-danger" v-if="errorTitle">{{ errorTitle }}</p>
        </div>

        <div class="mb-3">
          <label for="content" class="form-label">Nội dung bài viết</label>
          <textarea v-model="content" id="content" class="form-control" rows="5" placeholder="Nhập nội dung bài viết"
            required></textarea>
          <p class="text-danger" v-if="errorContent">{{ errorConent }}</p>

        </div>

        <div class="mb-3">
          <label for="image" class="form-label">Hình ảnh minh họa</label>
          <input @change="handleFileChange" type="file" class="form-control" id="image" accept="image/*" />
          <p class="text-danger" v-if="errorImage">{{ errorImage }}</p>
        </div>

        <button type="submit" class="btn btn-info">{{ isEditing ? 'Cập nhật' : 'Đăng bài' }}</button>
      </form>

      <!-- Hiển thị thông báo nếu có -->
      <div v-if="success" class="alert alert-success mt-3" role="alert">
        Bài viết đã được {{ editingIndex === null ? 'đăng' : 'cập nhật' }} thành công!
      </div>
      <div v-if="error" class="alert alert-danger mt-3" role="alert">
        Vui lòng kiểm tra lại thông tin!
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tiêu đề</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ post.title }}</td>
          <td><button class="btn btn-danger btn-sm" @click="deletePost(index)">Xóa</button></td>
          <td><button class="btn btn-primary btn-sm me-2" @click="editPost(index)">Sửa</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khai báo ref cho các giá trị
const title = ref('');
const content = ref('');
const imageFile = ref(null);
const posts = ref(JSON.parse(localStorage.getItem('posts')) || []);
const success = ref(false);
const error = ref(false);
const errorTitle = ref('');
const errorContent = ref('');
const errorImage = ref('');

// Chỉnh sửa bài viết
const editingIndex = ref(null);


// Hàm xóa bài viết
const deletePost = (index) => {
  posts.value.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts.value));
}

// Hàm xử lý thay đổi file
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
  }
};

// Hàm để điền thông tin bài viết vào form khi chỉnh sửa
const editPost = (index) => {
  editingIndex.value = index; // Lưu lại vị trí bài viết đang chỉnh sửa
  const postToEdit = posts.value[index]; // Lấy thông tin bài viết

  // Điền thông tin bài viết vào form
  title.value = postToEdit.title;
  content.value = postToEdit.content;
  imageFile.value = null;
}

const taoBaiViet = () => {
  success.value = false;
  error.value = false;

  // Reset lỗi
  errorTitle.value = '';
  errorContent.value = '';
  errorImage.value = '';

  // Kiểm tra tiêu đề
  if (!title.value.trim() || title.value.trim().length < 10) {
    errorTitle.value = 'Tiêu đề phải có ít nhất 10 ký tự.';
  }

  // Kiểm tra nội dung
  if (!content.value.trim()) {
    errorContent.value = 'Nội dung không được để trống.';
  }

  // Kiểm tra file ảnh
  if (imageFile.value) {
    const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedExtensions.includes(imageFile.value.type)) {
      errorImage.value = 'Chỉ được tải ảnh định dạng PNG, JPG.';
    }
  } else if (editingIndex.value === null) {
    // Khi thêm bài mới, yêu cầu phải có ảnh
    errorImage.value = 'Hình ảnh không được để trống.';
  }

  // Dừng lại nếu có bất kỳ lỗi nào
  if (errorTitle.value || errorContent.value || errorImage.value) {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 3000);
    return; // Không thực hiện các bước tiếp theo
  }

  // Xử lý đăng bài hoặc cập nhật bài viết
  const post = {
    title: title.value,
    content: content.value,
    image: imageFile.value,
    date: new Date().toLocaleDateString(),
  };

  if (editingIndex.value !== null) {
  // Trường hợp chỉnh sửa bài viết
  posts.value[editingIndex.value] = post;
  editingIndex.value = null; // Reset trạng thái chỉnh sửa
} else {
  // Thêm bài viết mới
  posts.value.unshift(post);
}


  // Lưu danh sách vào localStorage
  localStorage.setItem('posts', JSON.stringify(posts.value));

  // Reset form
  title.value = '';
  content.value = '';
  imageFile.value = null;

  success.value = true;
  setTimeout(() => {
    success.value = false;
  }, 3000);
};


</script>


<style scoped>
.post-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
}

.btn-submit {
  border-radius: 30px;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  width: 100%;
}

.btn-submit:hover {
  background-color: #333;
}

.text-danger {
  color: red;
}

.post-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>