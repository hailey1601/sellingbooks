document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    let emailOrPhone = document.querySelector('input[placeholder="Nhập email/số điện thoại"]').value;
    let username = document.querySelector('input[placeholder="Tên đăng nhập"]').value;
    let password = document.querySelector('input[placeholder="Mật khẩu"]').value;
    let confirmPassword = document.querySelector("input[placeholder='Nhập lại mật khẩu']").value;

    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp! Vui lòng kiểm tra lại.");
        return; 
    }

    let termsAccepted = document.querySelector('input[type="checkbox"]').checked;

    if (!termsAccepted) {
        alert('Vui lòng đồng ý với các điều khoản và điều kiện!');
        return;
    }

    let userInfo = {
        emailOrPhone: emailOrPhone,
        username: username,
        password: password,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    alert("Bạn đã đăng ký thành công!");

    window.location.href = '../đăng nhập/signin.html';
});
