let API = "https://68b70b3c73b3ec66cec399c4.mockapi.io/AsaxiyAPI/AsaxiyApi";
const productSection = document.getElementById("product-section");
const productSlider = document.getElementById("product-slider");
const slider = document.getElementById("slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const likeSection = document.getElementById("like-section");
const placeholder = document.getElementById("placeholder");
const scrollAmount = 300;


if (nextBtn && prevBtn && slider) {
    nextBtn.addEventListener("click", () => slider.scrollBy({ left: scrollAmount, behavior: "smooth" }));
    prevBtn.addEventListener("click", () => slider.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
}


function setupLikeButton(btn, item) {
    const icon = btn.querySelector("i");
    let liked = JSON.parse(localStorage.getItem("likedItems")) || [];

    if (liked.some(el => el.id === item.id)) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "red";
    } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "gray";
    }

    btn.addEventListener("click", () => {
        let liked = JSON.parse(localStorage.getItem("likedItems")) || [];

        if (icon.classList.contains("far")) {
            icon.classList.remove("far");
            icon.classList.add("fas");
            icon.style.color = "red";
            if (!liked.some(el => el.id === item.id)) liked.push(item);
        } else {
            icon.classList.remove("fas");
            icon.classList.add("far");
            icon.style.color = "gray";
            liked = liked.filter(el => el.id !== item.id);
        }

        localStorage.setItem("likedItems", JSON.stringify(liked));
        renderLikes();
    });
}

async function loadSliderProducts() {
    if (!productSlider) return;
    try {
        const res = await fetch(API);
        const data = await res.json();
        productSlider.innerHTML = "";

        data.forEach(item => {
            const stars = "★".repeat(Math.floor(item.ratingItem)) + "☆".repeat(5 - Math.floor(item.ratingItem));
            const card = document.createElement("div");
            card.className = "bg-white rounded-2xl shadow-md w-64 flex-shrink-0 p-4 relative";
            card.innerHTML = `
                <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">СКИДКА</span>
                <button class="like-btn absolute top-2 right-2 text-gray-400 text-2xl"><i class="far fa-heart"></i></button>
                <img src="${item.imgItem}" alt="${item.nameItem}" class="w-full h-40 object-contain mb-3" />
                <h3 class="text-sm font-medium mb-2">${item.nameItem}</h3>
                <div class="flex items-center text-orange-400 text-sm mb-1">${stars}</div>
                <p class="text-gray-400 text-xs line-through">${item.costItem} сум</p>
                <p class="text-blue-600 font-bold text-lg">${item.priceItem} сум</p>
                <p class="text-orange-500 text-sm border border-orange-400 rounded px-2 py-1 inline-block mt-1">
                    ${(item.priceItem/12).toFixed(0)} сум x 12 мес
                </p>
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 py-2 rounded-lg flex items-center justify-center gap-2"> 01.01.2025 </button>
            `;
            productSlider.appendChild(card);
            setupLikeButton(card.querySelector(".like-btn"), item);
        });
    } catch (err) {
        console.log("Xatolik:", err);
    }
}

async function loadGridProducts() {
    if (!productSection) return;
    try {
        const res = await fetch(API);
        const data = await res.json();
        productSection.innerHTML = "";

        data.forEach(item => {
            const stars = "★".repeat(Math.floor(item.ratingItem)) + "☆".repeat(5 - Math.floor(item.ratingItem));
            const card = document.createElement("div");
            card.className = "bg-white rounded-2xl shadow-md p-4 relative";
            card.innerHTML = `
                <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">СКИДКА</span>
                <button class="like-btn absolute top-2 right-2 text-gray-400 text-2xl"><i class="far fa-heart"></i></button>
                <img src="${item.imgItem}" alt="${item.nameItem}" class="w-full h-40 object-contain mb-3" />
                <h3 class="text-sm font-medium mb-2">${item.nameItem}</h3>
                <div class="flex items-center text-orange-400 text-sm mb-1">${stars}</div>
                <p class="text-gray-400 text-xs line-through">${item.costItem} сум</p>
                <p class="text-blue-600 font-bold text-lg">${item.priceItem} сум</p>
                <p class="text-orange-500 text-sm border border-orange-400 rounded px-2 py-1 inline-block mt-1">
                    ${(item.priceItem/12).toFixed(0)} сум x 12 мес
                </p>
                <div class="flex items-center">
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 py-2 rounded-lg flex items-center justify-center gap-2"> Купить в один клик </button>
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-[40px] mt-[15px] ml-[12px] p-[10px] bg-green-400 rounded-[5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </a>
                </div>
            `;
            productSection.appendChild(card);
            setupLikeButton(card.querySelector(".like-btn"), item);
        });
    } catch (err) {
        console.log("Xatolik:", err);
    }
}


function renderLikes() {
    if (!likeSection) return;
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    likeSection.innerHTML = "";

    if (likedItems.length === 0) {
        if (placeholder) placeholder.style.display = "block";
    } else {
        if (placeholder) placeholder.style.display = "none";
        likedItems.forEach(item => {
            const stars = "★".repeat(Math.floor(item.ratingItem)) + "☆".repeat(5 - Math.floor(item.ratingItem));
            const card = document.createElement("div");
            card.className = "bg-white rounded-2xl shadow-md p-4 relative";
            card.innerHTML = `
                <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">СКИДКА</span>
                <button class="like-btn absolute top-2 right-2 text-red-500 text-2xl"><i class="fas fa-heart"></i></button>
                <img src="${item.imgItem}" alt="${item.nameItem}" class="w-full h-40 object-contain mb-3" />
                <h3 class="text-sm font-medium mb-2">${item.nameItem}</h3>
                <div class="flex items-center text-orange-400 text-sm mb-1">${stars}</div>
                <p class="text-gray-400 text-xs line-through">${item.costItem} сум</p>
                <p class="text-blue-600 font-bold text-lg">${item.priceItem} сум</p>
                <p class="text-orange-500 text-sm border border-orange-400 rounded px-2 py-1 inline-block mt-1">
                    ${(item.priceItem/12).toFixed(0)} сум x 12 мес
                </p>
            `;
            likeSection.appendChild(card);

            // Like tugmasi ishlashi
            const likeBtn = card.querySelector(".like-btn");
            setupLikeButton(likeBtn, item);
        });
    }
}


async function loadMainProducts() {
    const productSection = document.getElementById("product-section");
    if (!productSection) return;

    try {
        const res = await fetch(API);
        const data = await res.json();
        productSection.innerHTML = "";

        data.forEach(item => {
            const stars = "★".repeat(Math.floor(item.ratingItem || 5)) + "☆".repeat(5 - Math.floor(item.ratingItem || 5));
            const card = document.createElement("div");
            card.className = "bg-white rounded-2xl shadow-md p-5 relative flex flex-col mb-4";
            card.innerHTML = `
                <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">СКИДКА</span>
                <button class="like-btn absolute top-2 right-2 text-gray-400 text-2xl"><i class="far fa-heart"></i></button>
                <img src="${item.imgItem}" alt="${item.nameItem}" class="w-full h-40 object-contain mb-3" />
                <h3 class="text-sm font-medium mb-2">${item.nameItem}</h3>
                <div class="flex items-center text-orange-400 text-sm mb-1">${stars}</div>
                <p class="text-gray-400 text-xs line-through">${item.costItem} сум</p>
                <p class="text-blue-600 font-bold text-lg">${item.priceItem} сум</p>
                <p class="text-orange-500 text-sm border border-orange-400 rounded px-2 py-1 inline-block mt-1">
                    ${(item.priceItem/12).toFixed(0)} сум x 12 мес
                </p>
                <div class="flex items-center mt-4">
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg buy-btn">Купить в один клик</button>
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-[40px] ml-3 p-2 bg-green-400 rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </a>
                </div>
            `;
            productSection.appendChild(card);

            // Like button
            const likeBtn = card.querySelector(".like-btn");
            likeBtn.addEventListener("click", () => {
                let likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
                const itemData = {
                    id: item.id,
                    nameItem: item.nameItem,
                    priceItem: item.priceItem,
                    costItem: item.costItem,
                    imgItem: item.imgItem,
                    ratingItem: item.ratingItem
                };
                if (likedItems.find(i => i.id === itemData.id)) {
                    likedItems = likedItems.filter(i => i.id !== itemData.id);
                    likeBtn.querySelector("i").classList.replace("fas", "far");
                } else {
                    likedItems.push(itemData);
                    likeBtn.querySelector("i").classList.replace("far", "fas");
                }
                localStorage.setItem("likedItems", JSON.stringify(likedItems));
            });

            // Buy button
            const buyBtn = card.querySelector(".buy-btn");
            buyBtn.addEventListener("click", () => {
                let shopProducts = JSON.parse(localStorage.getItem("shopProducts")) || [];
                if (!shopProducts.some(p => p.id === item.id)) {
                    shopProducts.push(item);
                    localStorage.setItem("shopProducts", JSON.stringify(shopProducts));
                    alert(item.nameItem + "mahsulot qoshildi"); //korib turshmga
                    loadShopPage();
                }
            });
        });
    } catch (err) {
        console.error("Xatolik:", err);
    }
}

function loadShopPage() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    const shopProducts = JSON.parse(localStorage.getItem("shopProducts")) || [];
    productList.innerHTML = "";

    shopProducts.forEach(item => {
        const card = document.createElement("div");
        card.className = "shop-card relative bg-white rounded-2xl shadow p-5 flex flex-col mb-4";
        card.dataset.id = item.id;
        card.innerHTML = `
            <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">СКИДКА</span>
            <button class="like-btn absolute top-2 right-2 text-gray-400 text-2xl"><i class="far fa-heart"></i></button>
            <img src="${item.imgItem}" alt="${item.nameItem}" class="w-full h-40 object-contain mb-3" />
            <h3 class="text-sm font-medium mb-2">${item.nameItem}</h3>
            <p class="text-gray-400 text-xs line-through">${item.costItem} сум</p>
            <p class="current-price text-blue-600 font-bold text-lg mb-2">${item.priceItem} сум</p>
            <div class="flex items-center justify-between mt-auto">
                <button class="decrease bg-red-500 text-white px-3 py-1 rounded-lg text-lg">-</button>
                <span class="quantity mx-3 font-semibold text-lg w-6 text-center">1</span>
                <button class="increase bg-green-500 text-white px-3 py-1 rounded-lg text-lg">+</button>
                <button class="delete bg-gray-400 text-white px-3 py-1 rounded-lg text-lg">X</button>
            </div>
        `;
        productList.appendChild(card);

        const quantityElem = card.querySelector(".quantity");
        const priceElem = card.querySelector(".current-price");
        let quantity = 1;
        const price = parseInt(item.priceItem);

        card.querySelector(".increase").addEventListener("click", () => {
            quantity++;
            quantityElem.textContent = quantity;
            priceElem.textContent = (price * quantity) + " сум";
            updateCartSummary();
        });
        card.querySelector(".decrease").addEventListener("click", () => {
            if (quantity > 1) quantity--;
            quantityElem.textContent = quantity;
            priceElem.textContent = (price * quantity) + " сум";
            updateCartSummary();
        });
        card.querySelector(".delete").addEventListener("click", () => {
            card.remove();
            removeFromLocalStorage(item.id);
            updateCartSummary();
        });
    });

    updateCartSummary();
}

function updateCartSummary() {
    let total = 0;
    let count = 0;

    document.querySelectorAll("#product-list .shop-card").forEach(card => {
        const price = parseInt(card.querySelector(".current-price").textContent.replace(/\D/g, ''));
        const quantity = parseInt(card.querySelector(".quantity").textContent);
        total += price;
        count += quantity;
    });

    document.getElementById("total-price").textContent = total.toLocaleString() + " сум";
    document.getElementById("total-count").textContent = count + " товара";
}

function removeFromLocalStorage(id) {
    let shopProducts = JSON.parse(localStorage.getItem("shopProducts")) || [];
    shopProducts = shopProducts.filter(item => item.id !== id);
    localStorage.setItem("shopProducts", JSON.stringify(shopProducts));
}

document.addEventListener("DOMContentLoaded", () => {
    loadMainProducts();
    loadShopPage();
});




loadSliderProducts();
loadGridProducts();
renderLikes();