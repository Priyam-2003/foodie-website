var swiper = new Swiper(".mySwiper", {
    loop:true,
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    },
});

const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const hamburger = document.querySelector('.hamburgur');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');


cartIcon.addEventListener('click',() => {
    cartTab.classList.add('cart-tab-active');
})

closeBtn.addEventListener('click',() => {
    cartTab.classList.remove('cart-tab-active');
})
hamburger.addEventListener('click',(e)=>{
        e.preventDefault();
        mobileMenu.classList.toggle('mobile-menu-active');
})
hamburger.addEventListener('click',(e)=>{
    e.preventDefault();
    bars.classList.toggle('fa-bars');
    bars.classList.toggle('fa-xmark');
})

let productList = [];
let cartProduct = [];

const updateTotals = ()=>{
    let totalPrice = 0;
    let totalQuantity = 0;
    document.querySelectorAll('.item').forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-value').textContent);
       const price =  parseFloat(item.querySelector('.item-total').textContent.replace("$",''));

       totalPrice += price;
       totalQuantity += quantity;
    })
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartValue.textContent = totalQuantity;
}
const showCards = () => {

    productList.forEach(item => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');
        orderCard.innerHTML = `
        <div class="card-image">
            <img src="${item.image}">
        </div>
        <h4>${item.name}</h4>
        <h4 class="price">${item.price}</h4>
        <a href="#" class="btn card-btn">Add to cart</a>
        `;
        cardList.appendChild(orderCard);
        const cardBtn = orderCard.querySelector('.card-btn');
        cardBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            addToCart(item);
        })
    })
}

const addToCart = (product)=>{
    const existingProduct = cartProduct.find(item => item.id === product.id);
    if(existingProduct){
        alert("Item already in your cart");
        return;
    }

    cartProduct.push(product);

    let quantity = 1;
    const cartItem = document.createElement('div');
    cartItem.classList.add('item');
    cartItem.innerHTML = 
    `
        <div class="item-img">
            <img src="${product.image}">
        </div>
        <div class="detail">
            <h4>${product.name}</h4>
            <h4 class="item-total">${product.price}</h4>
        </div>
        <div class="flex">
            <a href="#" class="quantity-btn minus">
            <i class="fa-solid fa-minus"></i>                         
            </a>
            <h4 class="quantity-value">${quantity}</h4>
            <a href="#" class="quantity-btn plus">
             <i class="fa-solid fa-plus"></i>
            </a>
        </div>
    `;
    cartList.appendChild(cartItem);
    updateTotals();

    const plusBtn = cartItem.querySelector('.plus');
    const minusBtn = cartItem.querySelector('.minus');
    const quantityValue = cartItem.querySelector('.quantity-value');
    const totalPrice = cartItem.querySelector('.item-total');

    plusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        quantity++;
        quantityValue.textContent = quantity;
        totalPrice.textContent =`$${(quantity * (parseFloat(product.price.slice(1)))).toFixed(2)}`;
        updateTotals();
    })

    minusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
         quantity--;
         if(quantity === 0){
            cartItem.classList.add('slide-out');
            setTimeout(()=>{
            cartList.removeChild(cartItem);
            cartProduct = cartProduct.filter(item => item.id !== product.id);
            updateTotals();
            },300)
            return;
         }
         quantityValue.textContent = quantity;
        totalPrice.textContent =`$${(quantity * (parseFloat(product.price.slice(1)))).toFixed(2)}`;
        updateTotals();
    })

}
const initApp = async () => {
   await fetch('product.json')
    .then(response => response.json())
    .then(data => {
        productList = data;
        showCards();
    })
}
initApp();