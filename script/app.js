const lvlTimer = document.querySelector('.header__timer-extra');

let i = 0;
let time = 0;

function Timer() {
    lvlTimer.innerHTML = i;

    i++;

    i >= 50 ? time = 100 : time = 50;

    if (i <= 100) {
        setTimeout(() => {
            Timer();
        }, time);
    }
}

Timer()

const product = {
    plainBurger: {
        name: 'PlainBurger',
        price: 10000,
        calories: 305,
        extra: [false, false, false],
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        },
        get totalCalories() {
            return this.calories * this.amount
        }
    },
    freshBurger: {
        name: 'FreshBurger',
        price: 20500,
        calories: 430,
        extra: [false, false, false],
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        },
        get totalCalories() {
            return this.calories * this.amount
        }
    },
    freshCombo: {
        name: 'FreshCombo',
        price: 31900,
        calories: 312,
        extra: [false, false, false],
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        },
        get totalCalories() {
            return this.calories * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.main__product-btn'),
    productReceipt = document.querySelector('.receipt'),
    productReceiptOpen = document.querySelector('.button'),
    productReceiptOut = document.querySelector('.receipt__window-out'),
    productReceiptPay = document.querySelector('.receipt__window-btn'),
    totalSum = document.querySelector('.receipt__window-cost span'),
    totalCalories = document.querySelector('.receipt__window-calories span');
    extraProductCheck = document.querySelectorAll('.main__product-label'),


productReceiptOpen.addEventListener('click', () => {
    productReceiptOut.innerHTML = '';

    for (const key in product) {
        const { name, amount, calories, totalSum, totalCalories } = product[key];
        let extraOne, extraTwo, extraThree;

        if (product[key].extra[0] === true) {
            extraOne = 'есть';
        } else {
            extraOne = 'нет'
        }

        if (product[key].extra[1] === true) {
            extraTwo = 'есть';
        } else {
            extraTwo = 'нет'
        }

        if (product[key].extra[2] === true) {
            extraThree = 'есть';
        } else {
            extraThree = 'нет'
        }

        if (product[key].amount) {
            productReceipt.classList.add('active');

            productReceiptOut.innerHTML += `
            <div class="receipt__window-item">
                <p class="receipt__window-info">
                    <span class="receipt__window-name"> ${name} -  ${amount} шт.</span>
                    <span>Двойной майонез: ${extraOne}</span>
                    <span>Салатный лист: ${extraTwo}</span>
                    <span>Сыр: ${extraThree}</span>
                </p>
                <p class="receipt__window-totalProduct">
                    <span>${totalSum} сум</span>
                    <span>${totalCalories} калорий</span>
                </p>
            </div>
            `

        }
        product[key].amount = 0;
        product[key].extra[0] = false;
        product[key].extra[1] = false;
        product[key].extra[2] = false;
    
        const productAmount = document.querySelectorAll('.main__product-num');
        productAmount.forEach(i => {
            i.innerHTML = 0;
        })
    
        const productTotalPrice = document.querySelectorAll('.main__product-price span');
        productTotalPrice.forEach(i => {
            i.innerHTML = 0;
        })
        
        const productTotalCalories = document.querySelectorAll('.main__product-call span');
        productTotalCalories.forEach(i => {
            i.innerHTML = 0;
        })
    }
})

productReceiptPay.addEventListener('click', () => {
    productReceipt.classList.remove('active')
})

extraProductCheck.forEach(check => {
    check.addEventListener('click', function () {
        addExtraProduct(this)
    })
})

productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        addAndRemoveProduct(this);
    })
})

function addAndRemoveProduct(btn) {
    let parent = btn.closest('.main__product');
    let parentId = parent.getAttribute('id');

    if (btn.dataset.symbol == '+') {
        product[parentId].amount++;
    } else {
        if (product[parentId].amount) {
            product[parentId].amount--;
        }
    }

    renderProduct(parent, parentId)
}

function addExtraProduct(element) {
    let parent = element.closest('.main__product');
    let parentId = parent.getAttribute('id');
    let parentExtra = element.querySelector('.main__product-checkbox');
    let parentData = parentExtra.getAttribute('data-extra');

    if (parentData === 'doubleMayonnaise') {
        product[parentId].extra[0] = true;
    }
    if (parentData === 'lettuce') {
        product[parentId].extra[1] = true;
    }
    if (parentData === 'cheese') {
        product[parentId].extra[2] = true;
    }
}

function renderProduct(parent, parentId) {
    for (const key in product) {
        const productAmount = parent.querySelector('.main__product-num');
        productAmount.innerHTML = product[parentId].amount;

        const productTotalPrice = parent.querySelector('.main__product-price span');
        productTotalPrice.innerHTML = product[parentId].totalSum;

        const productTotalCalories = parent.querySelector('.main__product-call span');
        productTotalCalories.innerHTML = product[parentId].totalCalories;

        totalSum.innerHTML = totalSumProduct();
        totalCalories.innerHTML = totalCaloriesProduct();
    }
}


function totalSumProduct() {
    let total = 0;

    for (const key in product) {
        total += product[key].totalSum;
    }

    return total;
}

function totalCountProduct() {
    let total = 0;

    for (const key in product) {
        total += product[key].amount;
    }

    return total;
}

function totalCaloriesProduct() {
    let total = 0;

    for (const key in product) {
        total += product[key].totalCalories;
    }

    return total;
}