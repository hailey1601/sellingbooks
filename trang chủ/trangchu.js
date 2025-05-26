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

// Danh sách sản phẩm
let bookList = [
    {
        id: 1,
        title: "A Court of Thorns and Roses",
        price: 260000, 
        describe: `CUỐN SÁCH ĐẦU TIÊN TRONG LOẠT SÁCH BÁN CHẠY NHẤT

        Với một chút Buffy, Game Of Thrones và Outlander, đây là một loạt truyện tuyệt vời với niềm vui trọn vẹn. 

        Feyre là một nữ thợ săn. Và khi cô nhìn thấy một con nai trong rừng bị một con sói đuổi theo, cô đã giết chết kẻ săn mồi và bắt con mồi của nó để nuôi sống bản thân và gia đình.

        Nhưng con sói không như vẻ bề ngoài, và Feyre không thể đoán trước được cái giá đắt mà cô sẽ phải trả cho cái chết của nó...

        Bị kéo đi khỏi gia đình vì tội giết một nàng tiên, Feyre phát hiện ra rằng kẻ bắt giữ cô, khuôn mặt bị che khuất bởi một chiếc mặt nạ nạm đá quý, đang che giấu nhiều điều hơn cả đôi mắt xanh lá cây sắc sảo của hắn. 

        Khi tình cảm của Feyre dành cho Tamlin chuyển từ thù địch sang đam mê, cô biết rằng vùng đất của các nàng tiên là một nơi nguy hiểm hơn nhiều so với những gì cô nhận ra. Và Feyre phải chiến đấu để phá vỡ một lời nguyền cổ xưa, nếu không cô sẽ mất anh ta mãi mãi.

        Sách của Sarah J. Maas đã bán được hàng triệu bản trên toàn thế giới và được dịch sang 37 ngôn ngữ. Hãy tự mình khám phá câu chuyện kỳ ​​ảo lãng mạn hấp dẫn, sâu sắc, sắp trở thành một loạt phim truyền hình lớn.`
    }, 
    {
        id: 2,
        title: "A Curse for True Love",
        price: 320000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id: 3,
        title: "Better Than The Movies",
        price: 272000, 
        describe: `Hoàn hảo cho những người hâm mộ Kasie West và Jenn Bennett, bộ phim hài lãng mạn tuổi teen “ngọt ngào và hài hước” (Kerry Winfrey, tác giả Chờ đợi Tom Hanks) này theo chân một cô gái tuổi teen lãng mạn vô vọng và người hàng xóm dễ thương nhưng đáng ghét của cô khi họ lên kế hoạch thu hút sự chú ý của cô. bởi tình yêu không thể chạm tới của cô ấy.

        Người luôn mơ mộng Liz Buxbaum đã trao trái tim mình cho Michael từ lâu. Nhưng người yêu luôn lạnh lùng, xa cách của cô chưa bao giờ thực sự nhìn thấy cô trước khi anh chuyển đi. Bây giờ anh ấy đã trở lại thị trấn, Liz sẽ làm bất cứ điều gì cần thiết để lọt vào tầm ngắm của anh ấy — và có thể lôi kéo anh ấy làm người hẹn hò trong buổi vũ hội — thậm chí là kết bạn với Wes Bennet.
        
        Người hàng xóm hấp dẫn khó chịu có vẻ như là ứng cử viên hàng đầu cho những bộ phim hài lãng mạn giả tưởng, nhưng Wes chỉ là một nỗi đau trong mông Liz kể từ khi họ còn nhỏ. Những trò đùa liên quan đến ếch và những chú lùn cắt cỏ không phải là một người bạn trai tiềm năng. Tuy nhiên, bằng cách nào đó, Wes và Michael lại có thiện cảm với nhau, điều đó có nghĩa là Wes thuộc về Liz.
        
        Nhưng khi Liz và Wes lên kế hoạch thu hút sự chú ý của Michael để Liz có được khoảnh khắc vũ hội kỳ diệu của mình, cô ấy bị sốc khi phát hiện ra rằng mình thích ở bên Wes. Và khi họ tiếp tục thân thiết hơn, cô phải xem xét lại tất cả những gì cô nghĩ mình biết về tình yêu—và suy nghĩ lại ý tưởng của riêng mình về Hạnh phúc mãi mãi về sau sẽ như thế nào.`
    },
    {
        id:4,
        title: "Fourth Wing",
        price: 513900, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:5,
        title: "Happy Place",
        price: 298000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:6,
        title: "Harry Potter part 1",
        price: 259000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:7,
        title: "Just For The Summer",
        price: 253899, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:8,
        title: "Nothing Like The Movies",
        price: 280000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:9,
        title: "Cây cam ngọt của tôi",
        price: 108000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:10,
        title: "Powerless",
        price: 511000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:11,
        title: "Fairy Tale",
        price: 303000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },
    {
        id:12, 
        title: "Holy",
        price: 484000, 
        describe: `Hai nhân vật phản diện, một cô gái và một trận chiến chết chóc để có được hạnh phúc mãi mãi.

        Cáo truyền giáo đã mạo hiểm đến phương bắc tráng lệ để tìm kiếm kết thúc có hậu cho mình, và có vẻ như cô ấy đã có được nó. Cô kết hôn với một hoàng tử đẹp trai và sống trong một lâu đài huyền thoại. nhưng Evangeline không biết cái giá khủng khiếp mà cô phải trả cho câu chuyện cổ tích này. Cô ấy không biết mình đã đánh mất những gì và chồng cô ấy quyết tâm đảm bảo rằng cô ấy sẽ không bao giờ phát hiện ra . . . nhưng trước tiên anh ta phải giết Jacks, hoàng tử của những trái tim.
        
        Máu sẽ đổ, trái tim sẽ bị đánh cắp, và tình yêu đích thực sẽ bị thử thách trong lời nguyền dành cho tình yêu đích thực, cái kết nghẹt thở được mong đợi cho bộ ba trái tim tan vỡ một thời.`
    },

];

localStorage.setItem('list_product',  JSON.stringify(bookList))

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
