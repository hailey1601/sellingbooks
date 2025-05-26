let closeNotiButton = document.getElementById("closeNoti");
let noti = document.getElementById("noti");

function copyPhone() {
    let phoneNumber = document.querySelector(".phone-number p").textContent;

    navigator.clipboard.writeText(phoneNumber).then(() => {
        noti.style.display = "flex";
    }).catch(err => {
        console.error("Sao chép thất bại:", err);
    });
}

closeNotiButton.onclick = function() {
    noti.style.display = "none";
};


// Hàm khởi tạo slider
let initSlider = () => {
    let imageList = document.querySelector("#container .image-list");
    let slideButtons = document.querySelectorAll("#container .slide-button");
    let sliderScrollbar = document.querySelector("#container .slider-scrollbar .scrollbar-track");
    let scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    let maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Xử lý kéo thanh trượt (scrollbar thumb)
    scrollbarThumb.addEventListener("mousedown", (e) => {
        let startX = e.clientX;
        let thumbStartPos = scrollbarThumb.offsetLeft;
        let maxThumbPosition = sliderScrollbar.offsetWidth - scrollbarThumb.offsetWidth;

        let handleMouseMove = (e) => {
            let deltaX = e.clientX - startX;
            let newThumbPosition = thumbStartPos + deltaX;

            // Giới hạn vị trí của thanh kéo
            let boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            let scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        let handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Xử lý khi nhấn nút prev hoặc next
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let direction = button.id === "prev-slide" ? -1 : 1;
            let scrollAmount = imageList.clientWidth * direction;

            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Hiển thị hoặc ẩn nút prev/next dựa vào vị trí cuộn
    let handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Cập nhật vị trí của thanh kéo (scrollbar thumb) khi cuộn danh sách
    let updateScrollThumbPosition = () => {
        let scrollPosition = imageList.scrollLeft;
        let thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.offsetWidth - scrollbarThumb.offsetWidth);

        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Gọi các hàm khi danh sách cuộn
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Đặt trạng thái ban đầu
    handleSlideButtons();
    updateScrollThumbPosition();
};

// Khởi tạo khi tải trang hoặc thay đổi kích thước cửa sổ
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);


let login_button = document.getElementById("notification")
let shortCutLogin = document.getElementById("shortcut-notification")

login_button.addEventListener("click", function() {
    if (shortCutLogin.value =="") {
        alert("Điền thiếu thông tin")
    } else {
        localStorage.setItem("Gmail", shortCutLogin.value)
        
        alert("Chuyển đến trang đăng nhập.");
        window.location.href = "../đăng ký/login.html";
    }
})

// Nút xem thêm 
let more_button = document.getElementById("more")
let hidden_line = document.getElementById("second-3-hidden")

more_button.addEventListener("click", function() {
    hidden_line.classList.toggle("active"); 
    
    if (hidden_line.classList.contains("active")) {
        more_button.querySelector("label").innerText = "Ẩn bớt";
    } else {
        more_button.querySelector("label").innerText = "Xem thêm";
    }
}); 

// Lấy dữ liệu trong LocalStorage
let getListProduct = JSON.parse(localStorage.getItem("list_product")) 

// Khi ấn vô nút "Xem chi tiết" 
let list_button_detail = document.getElementsByClassName("view-detail")
for (let i = 0; i < list_button_detail.length; i++) {
    list_button_detail[i].addEventListener('click', function() {
        console.log(getListProduct[i])

        localStorage.setItem('current_product', JSON.stringify(getListProduct[i]))

        let productImage = this.closest(".book").querySelector("img").src;
        localStorage.setItem("current_product_image", productImage);

        window.location.href = "../chitiet/details.html"; 
        checkLogInStatus();
    }) 
}

// Khi ấn vô nút "Giỏ hàng" 
let cart_button = document.getElementsByClassName("add-to-cart")
for (let i = 0; i < cart_button.length; i++) {
    cart_button[i].addEventListener("click", function() {
        window.location.href = "../giỏ hàng/cart.html";
        checkLogInStatus();
    });
}

// Khởi tạo giỏ hàng
let cartFromLocalStorage = JSON.parse(localStorage.getItem("myCart"))
if (cartFromLocalStorage == null) {
    localStorage.setItem("myCart", JSON.stringify([]))
    window.location.reload() 
} 

// Biến kiểm tra trạng thái đăng nhập ban đầu
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

// Hàm ẩn giá tiền (chỉ được gọi sau 3 giây nếu chưa đăng nhập)
function hidePrices() {
    let priceElements = document.querySelectorAll(".book p");
    priceElements.forEach(element => {
        element.style.display = "none";
    });
}

// Hàm hiển thị thông báo và chuyển hướng
function showLoginNotification() {
    if (!isLoggedIn) {
        // Ẩn giá tiền
        hidePrices();
        if (document.getElementById("loginRequired")) return; // Kiểm tra thông báo đã tồn tại chưa
        
        // Tạo required thông báo
        let required = document.createElement("div");
        required.id = "loginRequired";
        required.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); 
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999; /* Đảm bảo required ở trên cùng */
        `;

        let requiredContent = document.createElement("div");
        requiredContent.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            line-height: 1.5;
        `;

        requiredContent.innerHTML = `
            <h2>Bạn cần đăng nhập</h2>
            <p>Để tiếp tục truy cập trang web, bạn cần đăng nhập hoặc đăng ký tài khoản.</p>
            <button id="goToSigninBtn" style="padding: 10px 20px; background-color: #213F84; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 12px">Đến trang đăng nhập</button>
        `;

        required.appendChild(requiredContent);
        document.body.appendChild(required);

        // Xử lý sự kiện cho nút "Đến trang đăng nhập"
        let goToSigninBtn = document.querySelector("#goToSigninBtn");
        goToSigninBtn.addEventListener("click", function() {
            window.location.href = "../đăng nhập/signin.html";
        });
    }
}

// Gọi hàm hiển thị thông báo sau 3s
setTimeout(showLoginNotification, 3000);



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
            // Gọi showLoginNotification sau 3s kể từ khi đăng xuất
            setTimeout(showLoginNotification, 3000);
        });
    } else {
        // Người dùng chưa đăng nhập, hiển thị lại nút Đăng nhập và Đăng ký
        signinLinks.style.display = "block"; 
        signinSuccess.style.display = "none"; 
    }
}

// Gọi hàm khi tải trang
window.addEventListener("load", checkLogInStatus);