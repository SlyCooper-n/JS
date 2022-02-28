let pizzaGrid = document.querySelector('.pizza-grid');
let pizzaCartBg = document.querySelector('.pizza-cart-bg');

let pizzaSize, pizzaQuantity;

(function renderPizzas(pizzaJson) {
    pizzaGrid.innerHTML = '';

    for (var i of pizzaJson) {
        pizzaGrid.innerHTML += `
        <div id="${i.id}" class="pizza-model">
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
                                <button onclick="updateQuantity('-', ${pizza.id})">-</button>
                                <span class="pizza-quantity">1</span>
                                <button onclick="updateQuantity('+', ${pizza.id})">+</button>
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
        pizzaQuantity = document.querySelector('.pizza-quantity').textContent;
    }, 500);


    document.querySelector('.add-cart').addEventListener('click', () => {
        document.querySelector('aside').classList.toggle('active');
        loadCart(pizzaJson[i], pizzaSize, pizzaQuantity);
        togglePizzaCart();
    });
}

function toggleSizeOption(n) {
    let sizeOption = Array.from(document.querySelectorAll('.size-option'));

    sizeOption[n].classList.toggle('active');

    for (i in sizeOption) {
        if (i != n) {
            sizeOption[i].classList.remove('active');
        }
    }
}

function updateQuantity(operator, pizzaId) {
    let n = Number(document.querySelector('.pizza-quantity').innerHTML);
    if (operator == '+') {
        n++;
    } else {
        n--;
        if (n == 0) {
            togglePizzaCart();
        }
    }
    document.querySelector('.pizza-quantity').innerHTML = n;
    let price = pizzaJson[pizzaId - 1].price * n;
    document.querySelector('.price').innerHTML = price.toFixed(2);
}

function loadCart(pizza, size, quantity) {
    let cartContent = `
    <div class="d-flex align-items-center">
                    <img src="${pizza.img}" alt="${pizza.name}">
                    
                    <p>${pizza.name} (${size})</p>
                </div>

                <div class="quant">
                    <button>-</button>
                    <span>${quantity}</span>
                    <button>+</button>
                </div>`

    document.querySelector('.cart-pizza').innerHTML = cartContent;  
    document.querySelector('.aside').classList.toggle('active');
    console.log('ta funfano?') 
}

document.querySelector('.theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});