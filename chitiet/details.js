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



// Nút tăng giảm ở trang chi tiết
let decreaseBtn = document.querySelector(".decrease-btn");
let increaseBtn = document.querySelector(".increase-btn");
let quantityValue = document.querySelector(".quantity-value");

let quantity = 1; 

decreaseBtn.addEventListener("click", () => {
    if (quantity > 0) {
        quantity--; 
        quantityValue.textContent = quantity; 
    }
});

increaseBtn.addEventListener("click", () => {
    quantity++; 
    quantityValue.textContent = quantity; 
});


// Bước lấy dữ liệu từ product 
let getProduct = JSON.parse(localStorage.getItem("current_product"))

let productImage = localStorage.getItem("current_product_image");
document.getElementById("product-image").src = productImage;

let productName = document.getElementsByClassName("product-title");
productName[0].innerText = getProduct.title; 

let productPrice = parseInt(getProduct.price); 
document.querySelector(".product-price").innerText = productPrice.toLocaleString('vi-VN');

let productDetails = document.getElementsByClassName("description-content");
productDetails[0].innerText = getProduct.describe; 



let addToCartBtn = document.querySelector(".add-to-cart");
let notice = document.getElementById("cart-notice");

let cartFromLocalStorage = JSON.parse(localStorage.getItem("myCart"));
if (cartFromLocalStorage == null) {
    localStorage.setItem("myCart", JSON.stringify([]))
    window.location.reload() 
} 


addToCartBtn.addEventListener("click", function () {
    if (quantity === 0) {
        alert("Vui lòng chọn số lượng sản phẩm trước khi thêm vào giỏ hàng!");
        return;
    }

    let price = quantity * productPrice;

    let cartData = {
        quantity, 
        price, 
        title: getProduct.title,
        image: productImage
    };

    cartFromLocalStorage.push(cartData);
    localStorage.setItem("myCart", JSON.stringify(cartFromLocalStorage));

    notice.style.display = "flex";
});


let closeNotice = document.querySelector(".close-notice");
closeNotice.addEventListener("click", function () {
    notice.style.display = "none";
});

