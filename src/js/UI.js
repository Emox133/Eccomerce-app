import { elements } from './base';
import Storage from './Storage';

// Main cart
let cart = [];

// Buttons
let buttonsDOM = [];

//UI / Display model
export default class UI {
    displayResults(flights) {
        let result = '';
        flights.forEach(flight => {
           result += `
            <article class="product">
                <div class="product__container">
                    <img src=${flight.image} alt=${flight.title} class="product__container-img">
                    <button href="#" class="product__container-reserve btn--reserve btn--white" data-id=${flight.id}>
                        Reserve now <i class="fas fa-plane-departure"></i>
                    </button>
                </div>
                <h3 class="product__name">${flight.title}</h3>
                <h4 class="product__price">$${flight.price}</h4>
            </article>
            `;
            elements.flightsContent.innerHTML = result;
        })
    }

    getReserveButtons() {
        // 1. Save buttons AFTER content loads, reason we use 'DQSALL' and not 'elements.reserveBtns
        //Converted nodeList to Arr with spread operator
        const buttons = [...document.querySelectorAll('.product__container-reserve')];
        buttonsDOM = buttons;
        
        buttons.forEach(button => {
            // 1. Assign ID's
            let id = button.dataset.id;
            // console.log(id);
            // 2. Check if our passed ID matches
            let inCart = cart.find(item => item.id === id);

            // 3. Check if the item is already in the cartArr
            if(inCart) {
                button.innerText = 'In Cart';
                button.disabled = true;
            } 

            // IF NOT
            button.addEventListener('click', e => {
                // 1. Change button text
                e.target.innerText = 'In Cart';
                // 2. Disable the button
                e.target.disabled = true;
                // 3. Get the item from the LS
                let cartItem = {...Storage.getFlight(id), amount: 1};
                // 4. Add the clicked item to cart arr
                cart = [...cart, cartItem];
                // 5. Add the cart to LS
                Storage.saveCart(cart);
                // 6. Set new values to cartItems
                this.setCartValues(cart); 
                // 7. Add the item to DOM
                this.addCartItem(cartItem);
                // 8. Show the cart
                this.showCart();
            });
        });
    }

    setCartValues(cart) {
        let tempTotal = 0;
        let amountTotal = 0;

        // ONLY IF there are items IN cart
        // loop over every item in passed arr
        // and asign the values to amount and total
        // then update the html        

        if(cart.length > 0) {
            cart.map(item => {
                amountTotal += item.amount;
                tempTotal += item.price * item.amount;
            });
        }
    
        elements.cartItems.innerText = amountTotal;
        elements.cartTotal.innerText = '$' + parseFloat(tempTotal.toFixed(2));
    }

    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart__item');

        div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart__item-img">
        <div>
            <h4 class="cart__item-name">${item.title}</h4>
            <p class="cart__item-price">$${item.price}</p>
            <a href="#" class="cart__item-remove btn--red" data-id="${item.id}">remove item</a>
        </div>

        <div>
            <i class="fas fa-chevron-up" data-id="${item.id}"></i>
            <p class="amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id="${item.id}"></i>
        </div>
        `;
        elements.cartContainer.appendChild(div);
    }

    showCart() {
        elements.cartContent.classList.add('showCart');
        elements.cartOverlay.classList.add('showOverlay');
    }

    initializeApp() {
    // 1. IF there is a cart , get it from LS
    cart = Storage.getCart();
    // 2. SET cart values
    this.setCartValues(cart);
    // 3. Loop over the cart arr and display flight items
    this.loopCart(cart);
    // 4. Show cart when clicking the cart icon
    elements.cartBtn.addEventListener('click', this.showCart);
    // 5. Hide cart when clicking the X icon
    elements.closeBtn.addEventListener('click', this.hideCart);
    }

    loopCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }

    hideCart() {
    elements.cartContent.classList.remove('showCart');
    elements.cartOverlay.classList.remove('showOverlay');
    }

    cartLogic() {
        // 1. Clear cart button
        elements.clearBtn.addEventListener('click', () => {
            this.clearCart();
        });
        // 2. Cart functionality
        elements.cartContainer.addEventListener('click', e => {
        // 1. Remove individual product 
            if(e.target.classList.contains('cart__item-remove')){
                // 1. Assign the e.target result
                let removeItem = e.target;
                // 2. Get the single item id
                let id = removeItem.dataset.id;
                // 3. Traverse the DOM and remove the product from the DOM
                elements.cartContainer.removeChild(removeItem.parentElement.parentElement);
                // 4. Remove item with ID that we have / *from the cart
                this.removeItem(id);
            }

        // 2. INCREASE items amount
        else if (e.target.classList.contains('fa-chevron-up')) {
            // 1. Assign the e.target result
            let addAmount = e.target;
            // 2. Get the INDIVIDUAL item ID
            let id = addAmount.dataset.id;
            // 3. Find the item that coresponds to our ID
            let ourItem = cart.find(item => item.id === id);
            // 4. INCREASE the amount of that item / ID
            ourItem.amount += 1;
            // 5. Save NEW value to LS
            Storage.saveCart(cart);
            // 6. Set NEW cart values
            this.setCartValues(cart);
            // 7. Change the amount in the DOM
            addAmount.nextElementSibling.innerText = ourItem.amount;
        }

        // 3. DECREASE items amount
        else if (e.target.classList.contains('fa-chevron-down')) {
        // 1. Assign the e.target result
        let decAmount = e.target;
        // 2. Get the INDIVIDUAL item ID
        let id = decAmount.dataset.id;
        // 3. Find the item that coresponds to our ID
        let ourItem = cart.find(item => item.id === id);
        // 4. ONLY decrease IF the item amount is > 0
        if(ourItem.amount > 0) {
            // 1. INCREASE the amount of that item / ID
            ourItem.amount -= 1;
            // 2. Save NEW value to LS
            Storage.saveCart(cart);
            // 3. Set NEW cart values
            this.setCartValues(cart);
            // 4. Change the amount in the DOM
            decAmount.previousElementSibling.innerText = ourItem.amount;
        }
         // If the product amount is <= 0 
         // Then on click we remove the item
         else if (ourItem.amount === 0) {
             elements.cartContainer.removeChild(decAmount.parentElement.parentElement);
             this.removeItem(id);
         }
        }
        });
    }

    clearCart() {
        // 1. Get all id's from products that are in cart
        let cartItems = cart.map(item => item.id);
        // 2. Remove those particular items with that ID's
        cartItems.forEach(id => this.removeItem(id));
        // 3. Remove products from the UI
        while(elements.cartContainer.children.length > 0) {
            elements.cartContainer.removeChild(elements.cartContainer.children[0])
        };
    }

    removeItem(id) {
        // 1. Filter all items that DON'T have the ID
        cart = cart.filter(item => item.id !== id);
        // 2. Update/Set the cart values
        this.setCartValues(cart);
        // 3. Latest inf of cart / save the cart
        Storage.saveCart(cart);
        // 4. Enable the button and change inner HTML
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `Reserve now <i class="fas fa-plane-departure"></i>`;
    }

    getSingleButton(id) {
        // 1. Get the button ID that equals current button ID
        return buttonsDOM.find(button => button.dataset.id === id);
    }
};
