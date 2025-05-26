document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let email_phone = document.querySelector("input[placeholder='Email/Số điện thoại']").value;
    let signIn_password = document.querySelector("input[placeholder='Mật khẩu']").value;
    let rememberMe = document.querySelector(".terms-container input[type='checkbox']").checked;

    let userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData || userData.emailOrPhone !== email_phone || userData.password !== signIn_password) {
        alert("Thông tin đăng nhập không chính xác!");
        return; 
    }

    if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify({ email_phone, signIn_password }));
    } else {
        localStorage.removeItem("rememberedUser");
    }

    alert("Đăng nhập thành công!");
    localStorage.setItem('isLoggedIn', JSON.stringify({email_phone, signIn_password}));
    window.location.href = "../trang chủ/trangchu.html";
});

window.addEventListener("load", function () {
    let rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    if (rememberedUser) {
        document.querySelector("input[placeholder='Email/Số điện thoại']").value = rememberedUser.email_phone;    }
});


document.querySelector(".sign-up-button").addEventListener("click", function () {
    window.location.href = "../đăng ký/login.html"; 
});

