const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const showLoginBtn = document.getElementById("show-login");
const closeModalBtn = document.getElementById("close");
const loginModal = document.querySelector(".login-modal");
const usernameDisplay = document.getElementById("username-display");

// إظهار وإخفاء المودال
showLoginBtn.addEventListener("click", () => {
  loginModal.classList.add("active");

  // تفريغ الحقول في نموذج التسجيل
  document.getElementById("signup-name").value = "";
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-password").value = "";

  // تفريغ الحقول في نموذج الدخول
  document.getElementById("signin-email").value = "";
  document.getElementById("signin-password").value = "";
});

// إغلاق المودال
closeModalBtn.addEventListener("click", () => {
  loginModal.classList.remove("active");
});

// تبديل بين الدخول والتسجيل
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// إنشاء حساب (submit form)
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();

  if (!name) return;

  localStorage.clear(); // حذف البيانات القديمة
  localStorage.setItem("username", name);
  updateNavbar();
  loginModal.classList.remove("active");
});

// تسجيل دخول (submit form)
document.getElementById("signin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = "User";
  localStorage.setItem("username", name);
  updateNavbar();
  loginModal.classList.remove("active");
});

// تسجيل الخروج
usernameDisplay.addEventListener("click", () => {
  const confirmLogout = confirm("Do you want to log out?");
  if (confirmLogout) {
    localStorage.removeItem("username");
    updateNavbar();
  }
});

// تحديث الـ Navbar حسب الحالة
function updateNavbar() {
  const savedName = localStorage.getItem("username");
  const usernameDisplay = document.getElementById("username-display");
  const showLoginBtn = document.getElementById("show-login");

  if (!usernameDisplay || !showLoginBtn) return;

  if (savedName) {
    usernameDisplay.textContent = `Welcome ${savedName}`;
    showLoginBtn.style.display = "none";
  } else {
    usernameDisplay.textContent = "";
    showLoginBtn.style.display = "inline-block";
  }
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", updateNavbar);
