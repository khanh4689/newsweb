import { createRouter, createWebHistory } from 'vue-router';
import MainContent from '../components/MainContent.vue'; 
import BaiViet from '../components/baiviet.vue'; 
import DangKy from '../components/dangky.vue';
import DangNhap from '../components/dangnhap.vue';
import DangBaiViet from '../components/dangbaiviet.vue';
import Post from '../components/post.vue';
import Account from '../components/Account.vue';
import NewsDetail from '../components/NewsDetail.vue';


const routes = [
  {
    path: '/',
    name: 'maincontent',
    component: MainContent,
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail // Đổi về import bình thường nếu file ở thư mục components
  }, // **Thêm dấu phẩy ở đây**
  {
    path: '/baiviet', 
    name: 'baiviet',
    component: BaiViet,
  },
 
  {
    path: '/dangky',
    name: 'dangky',
    component: DangKy,
    meta: { layout: 'none' }
  },
  {
    path: '/dangnhap', 
    name: 'dangnhap',
    component: DangNhap,
    meta: { layout: 'none' }
  },
  {
    path: '/dangbaiviet',
    name: 'dangbaiviet',
    component: DangBaiViet,
  },
  {
    path: '/post',
    name: 'post',
    component: Post,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Kiểm tra trạng thái đăng nhập trước khi chuyển hướng đến bất kỳ route nào ngoài Login và Register
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user'); // Kiểm tra xem người dùng đã đăng nhập chưa
  if (to.name === 'maincontent' || to.name === 'dangnhap' || to.name === 'dangky') {
    next(); // Cho phép truy cập tự do vào các trang này
  } else if (!isLoggedIn) {
    next({ name: 'dangnhap' }); // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
  } else {
    next(); // Cho phép truy cập nếu đã đăng nhập
  }
});

export default router;
