const content = document.getElementById("content");
const men = document.getElementById("filterMen");
const women = document.getElementById("filterWomen");
const all = document.getElementById("filterAll");
const addToCart = document.querySelector('.addToCart');
const cartBox = document.querySelector('.cartBox');
const cartCloseBtn = document.querySelector('.closeCart');
const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

let apiData;

fetch(apiUrl)
.then((response) => response.json())
    .catch(() => renderError())
    .then((dataResult) => {
        localStorage.setItem('apiData', JSON.stringify(dataResult));
        apiData = dataResult;

        for (const data of apiData) {
            displayProduct(data);
        }
    });
    
men.addEventListener("click", () => {
    filterGender("Male");
});
women.addEventListener("click", () => {
    filterGender("Female");
});
    
all.addEventListener("click", () => {
    content.innerHTML = "";
    for (const data of apiData) {
        displayProduct(data);
    }
});

function displayProduct(data) {
    const priceBox = document.createElement("div");
    priceBox.classList.add("priceBox");
    const productDiv = document.createElement("div");
    productDiv.classList.add("card");
    const productTitlePara = document.createElement("h2");
    productTitlePara.innerText = data.title;
    productTitlePara.classList.add("title");
    const productPrice = document.createElement("p");
    productPrice.innerText = data.price;
    const productDiscount = document.createElement("strong");
    productDiscount.innerText = data.discountedPrice;
    productDiscount.classList.add("discounted");
    const productImg = document.createElement("img");
    productImg.src = `${data.image}`;
    productImg.alt = `Image of ${data.title}`;
    productDiv.addEventListener("click", () => {
        sessionStorage.setItem("selectedProduct", JSON.stringify(data));
        window.location.href = "assets/pages/product.html";
    });
    productDiv.appendChild(productImg);
    productDiv.appendChild(productTitlePara);
    content.appendChild(productDiv);
    if (data && data.onSale === true) {
        productDiv.appendChild(priceBox);
        priceBox.appendChild(productDiscount);
        priceBox.appendChild(productPrice);
        productPrice.classList.add("dashedPrice");
    } else {
        productPrice.classList.add("price");
        productDiv.appendChild(priceBox);
        priceBox.appendChild(productPrice);
    }
}

function filterGender(gender) {
    let filteredResults = [];

    for (const data of apiData) {
        if (data.gender === gender) {
            filteredResults.push(data);
        }
    }
    content.innerHTML = "";
    for (const data of filteredResults) {
        displayProduct(data);
    }
}

function renderError() {
    const error = document.getElementById("content");
    error.innerHTML = "ERROR";
}

addToCart.addEventListener('click', () => {
    cartBox.classList.add('active');
});

cartCloseBtn.addEventListener('click', () => {
    cartBox.classList.remove('active');
});
