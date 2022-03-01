const g = el => document.querySelector(el);
const gall = el => document.querySelectorAll(el);

let pizzaContainer, pizzaContainerQt, containerKey;
let cart = [];

function changeTheme() {
    document.body.classList.toggle('dark');
}

// listagem das pizzas
pizzaJson.map((el, i) => {
    let pizza = g('.models .pizza-model').cloneNode(true);

    pizza.setAttribute('data-key', i);
    pizza.querySelector('.pizza-img img').src = `${el.img}`;
    pizza.querySelector('.pizza-img img').alt = `${el.name}`;
    pizza.querySelector('.pizza-price').innerHTML = `R$ ${el.price.toFixed(2)}`;
    pizza.querySelector('.pizza-name').innerHTML = `${el.name}`;
    pizza.querySelector('.pizza-desc').innerHTML = `${el.description}`;
    // abre o container da pizza
    pizza.querySelectorAll('.pizza-img, .add-pizza').forEach((item) => {
        item.addEventListener('click', (el) => {
    
        pizzaContainerQt = 1;    
    
        g('.pizza-container-bg').classList.toggle('active');
        setTimeout(() => {g('.pizza-container-bg').style.opacity = 1}, 100);
        
        let key = el.target.closest(".pizza-model").getAttribute('data-key');
        containerKey = key;
        
        pizzaContainer = g('.models .pizza-container-details').cloneNode(true);
    
        pizzaContainer.querySelector('.pizza-photo img').src = `${pizzaJson[key].img}`;
        pizzaContainer.querySelector('.pizza-photo img').alt = `${pizzaJson[key].name}`;
        pizzaContainer.querySelector('.details h2').innerHTML = `${pizzaJson[key].name}`;
        pizzaContainer.querySelectorAll('.size-option span').forEach((size, x) => {
            pizzaContainer.querySelectorAll('.size-option')[x].classList.remove('active');
            pizzaContainer.querySelectorAll('.size-option')[x].setAttribute('data-key', x);
            if (x == 2) {
                pizzaContainer.querySelectorAll('.size-option')[x].classList.add('active');
            }
            size.innerHTML = `${pizzaJson[key].sizes[x]}`;
        });
        pizzaContainer.querySelector('.price').innerHTML = `${pizzaJson[key].price.toFixed(2)}`;
        pizzaContainer.querySelector('.pizza-quantity').innerHTML = pizzaContainerQt;

        // seleciona o tamanho 
        pizzaContainer.querySelectorAll('.size-option').forEach((size, i) => {
            size.setAttribute('onclick', `selectSize(${i})`);
        });
    
        // muda a quantidade
        pizzaContainer.querySelectorAll('.quant button').forEach((btn, x) => {
            btn.setAttribute('onclick', `updateQuantity(${x}, ${key})`);
        });
    
        // adiciona pizza ao carrinho
        pizzaContainer.querySelector('.buttons .add-cart').addEventListener('click', () => {
            addPizzaToCart(pizzaJson[containerKey].id, pizzaContainerQt);
        });
    
        // fecha o container
        pizzaContainer.querySelector('.buttons .cancel').addEventListener('click', closePizzaContainer);
      
        g('.pizza-container').appendChild(pizzaContainer);
    });
    });
        
    g('.pizza-grid').append(pizza);
});

function selectSize(i) {
    gall('.size-option')[i].classList.toggle('active');

    gall('.size-option').forEach((el, x) => {
        if (i != x) {
            el.classList.remove('active');
        }
    });
}

function updateQuantity(operator, id) {
    // cartCounter = cartCounter || 0;
    if (operator == 0) {
        // subtract
        pizzaContainerQt--;

        if (pizzaContainerQt == 0) {
            closePizzaContainer();
            return;
        }

    } else {
        // add
        pizzaContainerQt++;
    }
    g('.pizza-quantity').innerHTML = pizzaContainerQt;
    let price = pizzaJson[id].price;
    g('.price').innerHTML = (price * pizzaContainerQt).toFixed(2);
}

function addPizzaToCart(id, quantity) {
    let pizzaSize = g('.size-option.active').getAttribute('data-key');

    // let tamanhoTa = false;
    // let idTaAqui = false;

    // cart.forEach((el) => {
    //     if (id == el.id) {
    //         console.log('tá aqui já');
    //         idTaAqui = true;
            
    //         if (Number(pizzaSize) == el.size) {
    //             tamanhoTa = true;
    //             el.qt++;
    //         }
    //     }     
    // });
    // if (tamanhoTa == false) {
    //     idTaAqui = false;
    // }
    // if (tamanhoTa == false && idTaAqui == false) {
    //     console.log('tá aqui não');
    //     cart.push({
    //         id: id,
    //         size: Number(pizzaSize),
    //         qt: quantity
    //     });
    // }

    let identifier = id + '%' + pizzaSize;

    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    if (key != -1) {
        cart[key].qt++;
    } else {
        cart.push({
            identifier,
            id: id,
            size: Number(pizzaSize),
            qt: quantity
        });
    }
    
    closePizzaContainer();
    g('aside').classList.add('active');
    renderCart(cart);
}

function closePizzaContainer() {
    g('.pizza-container-bg').style.opacity = 0;
    setTimeout(() => {g('.pizza-container-bg').classList.remove('active')}, 300);
    
    g('.pizza-container').innerHTML = '';
}

function renderCart(cartArray) {
    g('.cart-pizzas').innerHTML = '';
    let priceTotal = 0;

    cartArray.forEach((el, cartIndex) => {
        let cartContent = g('.cart-content').cloneNode(true);
    
        cartContent.querySelector('.mini-photo').src = pizzaJson[(el.id) - 1].img;
        cartContent.querySelector('.mini-photo').alt = pizzaJson[(el.id) - 1].name;
        cartContent.querySelector('p').innerHTML = `${pizzaJson[el.id - 1].name} (${pizzaJson[el.id - 1].sizes[el.size]})`;
        cartContent.querySelectorAll('.quant button').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                updateCartQuantity(i, el, cartIndex);
            });
        });
        cartContent.querySelector('.pizza-quantity').innerHTML = el.qt;
    
        g('.cart-pizzas').append(cartContent);

        priceTotal += pizzaJson[(el.id) - 1].price * el.qt;
    });

    // atualiza os valores
    g('.subtotal').innerHTML = `R$ ${priceTotal.toFixed(2)}`;
    g('.discount').innerHTML = `R$ ${(priceTotal / 10).toFixed(2)}`;
    g('.total').innerHTML = `R$ ${(priceTotal - (priceTotal / 10)).toFixed(2)}`;
}

function updateCartQuantity(operator, pizza, i) {
    if (operator == 0) {
        pizza.qt--;

        if (pizza.qt == 0) {
            cart.splice(i, 1);
            if (cart.length == 0) {
                g('aside').classList.remove('active');
            }
        }
    } else {
        pizza.qt++;
    }
    renderCart(cart);
}

g('.finish').addEventListener('click', () => {
    cart = [];
    renderCart(cart);
    g('aside').classList.remove('active');
    setTimeout(() => {
        alert('Seu pedido está sendo preparado... OH YEAHHH!');
    }, 300);
});