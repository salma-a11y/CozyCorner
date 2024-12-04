let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{body.classList.add('active');}
    )
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 120000
    },
    {
        id: 7,
        name: 'PRODUCT NAME 7',
        image: '7.PNG',
        price: 10000
    },
    {
        id: 8,
        name: 'PRODUCT NAME 8',
        image: '6.PNG',
        price: 20000
    },{
        id: 9,
        name: 'PRODUCT NAME 9',
        image: '9.PNG',
        price: 1000
    }
]; //array of objectes

let listCards  = [];//array of cart 
///////////////////////////////////////////////////////////////////////////////////////////////////////
//add products to a page``
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    }) 
}
initApp();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//take a deep copy of the object from array product to array listcards
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//مسؤولة انها تضيف المنتج فعليا وتابديت الشوبينج كارت
function reloadCard() {
    listCard.innerHTML = ''; // Clear the current content of the shopping cart

    let count = 0; // Initialize a variable to keep track of the total quantity of items in the cart
    let totalPrice = 0; // Initialize a variable to keep track of the total price of items in the cart

    listCards.forEach((value, key) => {
        // Loop through each item in the shopping cart

        // Update total price and quantity
        if (value != null) {
            totalPrice += value.price;
            count += value.quantity;

            // Create a new list item to display the product details and quantity controls
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv); // Add the new list item to the shopping cart
        }
    });

    // Update the total price and quantity display outside the loop
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get references to the buttons
const payCashButton = document.querySelector('.checkout');
const payCreditButton = document.querySelector('.checkout1');

// Event listener for the "Pay Cash" button
payCashButton.addEventListener('click', () => {
    if (isShoppingCartEmpty()) {
        // Display an alert if the shopping cart is empty
        alert('Shopping cart is empty! Please add items before proceeding to pay.');
    } else {
        // Redirect to the "pay-cash.html" page if the shopping cart is not empty
        window.location.href = 'Delivr.html';
    }
});

// Event listener for the "Pay Credit" button
payCreditButton.addEventListener('click', () => {
    if (isShoppingCartEmpty()) {
        // Display an alert if the shopping cart is empty
        alert('Shopping cart is empty! Please add items before proceeding to pay.');
    } else {
        // Redirect to the "pay-credit.html" page if the shopping cart is not empty
        window.location.href = 'index_salma.html';
    }
});

// Function to check if the shopping cart is empty
function isShoppingCartEmpty() {
    // Check if the listCards array is empty or contains only null values
    return listCards.every(item => item === null);
}
