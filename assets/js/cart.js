window.onload = function() {
    
    const addToCart = document.querySelector('.addToCart');
    const cartBox = document.querySelector('.cartBox');
    const cartCloseBtn = document.querySelector('.closeCart');
    
    addToCart.addEventListener('click', () => {
        cartBox.classList.add('active');
    });
    
    cartCloseBtn.addEventListener('click', () => {
        cartBox.classList.remove('active');
        function reload() {
            location.reload();
        }
        setTimeout(reload, 220);
    });
    const iconShoppingP = document.querySelector('.addToCart p');
    let no = 0;
    let items = JSON.parse(localStorage.getItem('items'));
    if(items){
        items.find(data=>{
            no = no+data.no;
        });
    }
    iconShoppingP.innerHTML = no;

    
    const cardBoxTable = cartBox.querySelector('table');
    let tableData = '';
    tableData += '<tr><th>Item Name</th><th>Item No</th><th>Item Price</th></tr>';
    items = JSON.parse(localStorage.getItem('items'));
    if(!items || items[0] === null){
        tableData += '<tr><td colspan="5">There are no items in your cart!</td></tr>'
    }else{
        items.find(data=>{
            tableData += '<tr><th>' + data.name + '</th><th>' + data.no + '</th><th>' + data.price + '</th><th><a href="#" onclick=Delete("' + data.id + '");>Delete</a></th></tr>';
        });
    }
    
    window.Delete = function(itemId) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        let updatedItems = items.filter(data => data.id !== itemId);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        let tableData = '<tr><th>Item Name</th><th>Item No</th><th>Item Price</th></tr>';
                
        if (!updatedItems || updatedItems.length === 0) {
            tableData += '<tr><td colspan="4">There are no items in your cart!</td></tr>';
        } else {
            updatedItems.forEach(data => {
                tableData += `<tr id="item-${data.id}"><td>${data.name}</td><td>${data.no}</td><td>${data.price}</td><td><a href="#" onClick="Delete('${data.id}');">Delete</a></td></tr>`;
                cartBox.classList.add('active');
            });
        }
    
        cardBoxTable.innerHTML = tableData;
    }
    
cardBoxTable.innerHTML = tableData;
}

const checkOut = document.getElementById('checkout');

checkOut.addEventListener('click', () => {
    window.location.href = "../pages/checkout.html";
});
