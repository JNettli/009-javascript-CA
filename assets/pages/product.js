let selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));
displayProduct(selectedProduct)

function displayProduct(data) {
    const priceBox = document.createElement("div");
    priceBox.classList.add('priceBox');
    const productDiv = document.createElement("div");
    productDiv.classList.add('single-card');
    const productTitlePara = document.createElement("h2");
    productTitlePara.innerText = data.title;
    productTitlePara.classList.add('title');
    const productPrice = document.createElement("p");
    productPrice.innerText = data.price;
    const addCart = document.createElement("button");
    addCart.classList.add("addCart");
    addCart.innerText = `Add to Cart`;
    const productDiscount = document.createElement("strong");
    productDiscount.innerText = data.discountedPrice;
    productDiscount.classList.add('discounted');
    const productImg = document.createElement("img");
    productImg.src = `${data.image}`;
    productImg.alt = `Image of ${data.title}`;
    productDiv.appendChild(productImg);
    productDiv.appendChild(productTitlePara);
    content.appendChild(productDiv);
    if(data && data.onSale === true) {
        productDiv.appendChild(priceBox);
        priceBox.appendChild(productDiscount);
        priceBox.appendChild(productPrice);
        productPrice.classList.add('dashedPrice');
        priceBox.appendChild(addCart);
    } else {
        productPrice.classList.add('price');
        productDiv.appendChild(productPrice);
        productPrice.appendChild(addCart);
    }
    content.appendChild(productDiv);
    const productDescription = document.createElement("p");
    productDescription.innerText = data.description;
    productDiv.appendChild(productDescription)
};

const addToCartBtn = document.querySelector('.addCart');
const items = JSON.parse(localStorage.getItem("items")) || [];

addToCartBtn.addEventListener("click", () => {
    if(typeof(Storage) !== 'undefined') {
        let item = {
            id: selectedProduct.id,
            name: selectedProduct.title,
            price: selectedProduct.price,
            no: 1
        };
        if(JSON.parse(localStorage.getItem("items")) === null) {
            items.push(item);
            localStorage.setItem("items", JSON.stringify(items));
            window.location.reload();
        } else {
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            window.location.reload();
        }
    } else {
        alert("Local Storage is not supported in this browser!")
    }
});
