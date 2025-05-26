// Khi đăng nhập thành công
function checkLogInStatus() {
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")); // Lấy thông tin người dùng từ localStorage
    let signinLinks = document.querySelector(".signin-login");
    let signinSuccess = document.querySelector(".signinsuccess");

    // Kiểm tra nếu người dùng đã đăng nhập
    if (isLoggedIn) {
        // Người dùng đã đăng nhập thành công
        signinLinks.style.display = "none"; 
        signinSuccess.style.display = "block"; 

        // Thêm sự kiện đăng xuất
        let logoutButton = signinSuccess.querySelector(".logout-btn");
        logoutButton.addEventListener("click", function () {
            // Khi đăng xuất, chỉ làm mới giao diện, xóa phiên đăng nhập gần nhất
            localStorage.removeItem('isLoggedIn');
            signinLinks.style.display = "block"; 
            signinSuccess.style.display = "none";
        });
    } else {
        // Người dùng chưa đăng nhập, hiển thị lại nút Đăng nhập và Đăng ký
        signinLinks.style.display = "block"; 
        signinSuccess.style.display = "none"; 
    }
}

// Gọi hàm khi tải trang
window.addEventListener("load", checkLogInStatus);



// Lấy sản phẩm từ localStorage
let cart = JSON.parse(localStorage.getItem("myCart")) || [];

let cartTableBody = document.querySelector(".cart-table tbody");
let cartSection = document.querySelector(".cart");
let cartActions = document.querySelector(".cart-actions");
let cartEmptyMessage = document.createElement("p");

// Kiểm tra giỏ hàng
function checkCart() {
    if (cart.length === 0) {
        cartTableBody.innerHTML = ""; 
        cartTableBody.parentElement.style.display = "none"; 
        cartActions.style.display = "none"; 

        cartEmptyMessage.innerHTML = `
        Giỏ hàng của bạn đang trống. Bạn có muốn quay lại 
        <a href="../trang chủ/trangchu.html" style="color: blue; text-decoration: underline;"> trang chủ </a> không?
        `;
        cartSection.appendChild(cartEmptyMessage);
        return;
    }

    cartTableBody.parentElement.style.display = "table";
    cartActions.style.display = "flex";
    cartEmptyMessage.innerHTML = ""; 

    renderCartItems();
}

function renderCartItems() {
    let totalCart = 0;
    cartTableBody.innerHTML = "";

    cart.forEach((item, i) => {
        let price = item.price; 
        let totalItem = price * item.quantity;
        totalCart += totalItem;

        // Tạo dòng sản phẩm
        let row = `
            <tr>
                <td><img src="${item.image}" alt="Product Image"></td>
                <td>${item.title}</td>
                <td>${price.toLocaleString("vi-VN")}₫</td>
                <td class="quantity-btn">
                    <button class="decrease-qty" data-index="${i}">-</button>
                    <input type="text" class="quantity" value="${item.quantity}" data-index="${i}">
                    <button class="increase-qty" data-index="${i}">+</button>
                </td>
                <td>${totalItem.toLocaleString("vi-VN")}₫</td>
                <td><button class="delete-btn" data-index="${i}"><i class='bx bxs-trash'></i></button></td>
            </tr>
        `;
        cartTableBody.innerHTML += row;
    });

    // Hiển thị tổng tiền
    document.getElementById("cart-total").textContent = `${totalCart.toLocaleString("vi-VN")}₫`;

    // Gắn sự kiện cho nút
    addEventListeners();
}


function addEventListeners() {
    document.querySelectorAll(".decrease-qty").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            if (cart[i].quantity > 1) {
                cart[i].quantity--;
                updateCart();
            }
        });
    });

    document.querySelectorAll(".increase-qty").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            cart[i].quantity++;
            updateCart();
        });
    });

    document.querySelectorAll(".delete-btn").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            // Xoá đi dòng sản phẩm đó
            cart.splice(i, 1);
            updateCart();
        });
    });

    // Thêm sự kiện cho nút "Tiến hành thanh toán"
    let checkoutButton = document.querySelector(".proceed-checkout");
    if (checkoutButton) { 
        checkoutButton.addEventListener("click", () => {
            window.location.href = "https://forms.gle/mNrncovGUm3gTtw47"; // Chuyển hướng đến Google Form
        });
    }
}

function updateCart() {
    localStorage.setItem("myCart", JSON.stringify(cart));
    checkCart();
}

let continueShopping = document.querySelector(".continue-shopping");
if (continueShopping) {
    continueShopping.addEventListener("click", function() {
        window.location.href = "../trang chủ/trangchu.html";
    });
}


// Chạy kiểm tra giỏ hàng khi tải trang
checkCart();