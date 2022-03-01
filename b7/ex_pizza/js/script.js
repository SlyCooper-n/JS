let pizzaGrid = document.querySelector('.pizza-grid');
let pizzaCartBg = document.querySelector('.pizza-cart-bg');

let pizzaSize, pizzaQuantity;
let pizzaIds = [0];
let cartContents = [];


(function renderPizzas(pizzaJson) {
    pizzaGrid.innerHTML = '';

    for (var i of pizzaJson) {
        pizzaGrid.innerHTML += `
        <div class="pizza-model">
        <div class="pizza-img" onclick="togglePizzaCart('${i.id}')"><img src="${i.img}" alt="${i.name}"></div>
        <div class="add-pizza" onclick="togglePizzaCart('${i.id}')">+</div>

        <div class="pizza-info">
            <p class="pizza-price">R$ ${parseFloat(i.price).toFixed(2)}</p>
            <h2 class="pizza-name">${i.name}</h2>
            <p class="pizza-desc">${i.description}</p>
        </div>
        </div>`
    }
})(pizzaJson);

function togglePizzaCart(pizzaId=-1) {
    pizzaCartBg.classList.toggle('active');
    if (pizzaId != -1) {
        loadPizza(pizzaId - 1);
    }
}

function loadPizza(i) {
    let pizza = pizzaJson[i]

    let selectedPizza = `
    <div class="photo">
                        <img src="${pizza.img}" alt="${pizza.name}">
                    </div>

                    <div class="buy-info">
                        <h2>${pizza.name}</h2>

                        <p>${pizza.description}</p>

                        <div class="size d-flex justify-content-center">
                            <div class="size-option" onclick="toggleSizeOption(0)">Pequena <span>${pizza.sizes[0]}</span></div>
                            <div class="size-option" onclick="toggleSizeOption(1)">Média <span>${pizza.sizes[1]}</span></div>
                            <div class="size-option active" onclick="toggleSizeOption(2)">Grande <span>${pizza.sizes[2]}</span></div>
                        </div>

                        <div class="d-flex justify-content-center align-items-center">
                            R$<p class="price"> ${parseFloat(pizza.price).toFixed(2)}</p>

                            <div class="quant">
                                <button onclick="updateQuantity('-', ${pizza.id}, 0)">-</button>
                                <span class="pizza-quantity">1</span>
                                <button onclick="updateQuantity('+', ${pizza.id}, 0)">+</button>
                            </div>
                        </div>

                        <div class="buttons d-flex justify-content-center">
                            <button class="add-cart">Adicionar ao carrinho</button>
                            <button onclick="togglePizzaCart()">Cancelar</button>
                        </div>
                    </div>`
    
    document.querySelector('.pizza-cart-buy').innerHTML = selectedPizza;

    setInterval(() => {
        pizzaSize = document.querySelector('.size-option.active').textContent;
        pizzaQuantity = document.querySelectorAll('.pizza-quantity')[0].textContent;
    }, 500);


    document.querySelector('.add-cart').addEventListener('click', () => {
        document.querySelector('aside').classList.add('active');
        loadCart(pizzaJson[i], pizzaSize, pizzaQuantity);
        togglePizzaCart();
    });
}

function toggleSizeOption(n) {
    let sizeOption = Array.from(document.querySelectorAll('.size-option'));

    sizeOption[n].classList.add('active');

    for (i in sizeOption) {
        if (i != n) {
            sizeOption[i].classList.remove('active');
        }
    }
}

function updateQuantity(operator, pizzaId, i) {
    let n = Number(document.querySelectorAll('.pizza-quantity')[i].innerHTML);
    if (operator == '+') {
        n++;
    } else {
        n--;
        if (n == 0) {
            pizzaCartBg.classList.remove('active');
            cartContents.splice(pizzaId, 1);
            pizzaIds.splice(i, 1)
            document.querySelector('.cart-pizza').removeChild(document.getElementById(`${pizzaId}`));      
            if (cartContents.length == 0) {
                document.querySelector('aside').classList.remove('active');
            }
            return;
        }
    }
    document.querySelectorAll('.pizza-quantity')[i].innerHTML = n;
    let price = pizzaJson[pizzaId - 1].price * n;
    document.querySelector('.price').innerHTML = price.toFixed(2);

    loadValue();
}


function loadCart(pizza, size, quantity) {
    let found = false;
    
    for (i in pizzaIds) {
        if (pizza.id == pizzaIds[i]) {
            let n = Number(document.querySelectorAll('.pizza-quantity')[i].innerHTML);
            document.querySelectorAll('.pizza-quantity')[i].innerHTML = `${n + 1}`;
            found = true;
        }
    }
    if (found == false) {
        pizzaIds.push(pizza.id);
        cartContents[pizza.id] = `
        <div id="${pizza.id}" class="cart-content d-flex justify-content-between"><div class="d-flex align-items-center">
        <img src="${pizza.img}" alt="${pizza.name}">
        
        <p>${pizza.name} (${size})</p>
        </div>
        
        <div class="quant cart">
        <button class="cart-minus-btn" onclick="updateQuantity('-', ${pizza.id}, ${cartContents.length + 1})">-</button>
        <span class="pizza-quantity">${quantity}</span>
        <button class="cart-plus-btn" onclick="updateQuantity('+', ${pizza.id}, ${cartContents.length + 1})">+</button>
        </div></div>`;
        
        
        document.querySelector('.cart-pizza').innerHTML += cartContents[cartContents.length - 1];
    }
    
    

    loadValue();
}

function loadValue() {
    let price = 0;
    let n = 0;
    let arr = Array.from(document.querySelectorAll('.pizza-quantity'));

    for (i of pizzaIds) {
        price += pizzaJson[i - 1].price;
    }
    for (let i = 1; i < arr.length; i++) {
        n += Number(arr[i].innerHTML);
    }

    let newPrice = price * n;

    document.querySelectorAll('.subtotal').innerHTML = 'R$ ' + newPrice.toFixed(2);
    let discount = newPrice / 10;
    document.querySelectorAll('.discount').innerHTML = 'R$ ' + discount.toFixed(2);
    document.querySelectorAll('.total').innerHTML = 'R$ ' + (newPrice - discount).toFixed(2);
}

document.querySelector('.theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});