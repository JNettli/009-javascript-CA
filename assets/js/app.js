const content = document.getElementById("content");
const men = document.getElementById("filterMen");
const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

fetch(apiUrl)
    .then((response) => response.json())
    .catch(() => renderError())
    .then((dataResult) => {
        apiData = dataResult;
        for (let i = 0; 0 < apiData.length; i++) {
            let data = apiData[i];
            if (data && data.onSale === true) {
                content.innerHTML += `
                    <div class="card">
                        <img src="${data.image}" alt="Image of ${data.title}">
                        <h2 class="title">${data.title}</h2>
                        <div class="priceBox">
                        <p class="dashedPrice">$ ${data.price}</p><strong id="discounted">$ ${data.discountedPrice}</strong>
                        </div>
                        <button>Add to cart</button>
        `;
            } else {
                content.innerHTML += `
                    <div class="card">
                        <img src="${data.image}" alt="Image of ${data.title}">
                        <h2 class="title">${data.title}</h2>
                        <p class="price">$ ${data.price}</p>
                        <button>Add to cart</button>
        `;
            }
        }
    });

function renderError() {
    const error = document.getElementById("content");
    error.innerHTML = "ERROR";
}
