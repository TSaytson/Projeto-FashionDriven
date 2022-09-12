const URL_API = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';

const model = [{
        name: 'T-shirt',
        image: './Images/tshirt.png'
    },
    {
        name:'Camiseta',
        image:'./Images/Camiseta.png'
    },
    {
        name: 'Manga longa',
        image:'./Images/Mangalonga.png'
    }
]

const collar = [{
        name: 'Gola V',
        image: './Images/GolaV.png'
    },
    {
        name: 'Gola Redonda',
        image: './Images/GolaRedonda.png'
    },
    {
        name: 'Gola polo',
        image: './Images/GolaPolo.png'
    }
]

const cloth = [{
        name: 'Seda',
        image:'./Images/Seda.png'
    },
    {
        name: 'Algodão',
        image: './Images/Algodão.png'
    },
    {
        name: 'Poliéster',
        image: './Images/Poliester.png'
    }
]

let lastOrders = [];

function showLastOrders() {
    const lastOrdersList = document.querySelector('.last-orders ul');
    lastOrdersList.innerHTML = '';
    for (let i = 0; i < lastOrders.length; i++) {
        lastOrdersList.innerHTML += `
        <li>
            <img src=${lastOrders[i].image}>
            <h1>Criador: <a>${lastOrders[i].owner}</a></h1>
        </li>`
    }
}

const promise = axios.get(URL_API);
promise.then((promise) => {
    lastOrders = promise.data;
    showLastOrders();
});
promise.catch()
/*function showOptions(optionName) {
    const divOption = document.querySelector(`.choose-${optionName}`);
    divOption.innerHTML = `
        <h1>Escolha o modelo</h1>
        <ul>
            <div class="model">
                <li class="default-li" onclick="selectModel(this)">
                </li>
                <p>
                    T-shirt
                </p>
            </div>
            <div class="model">
                <li class="default-li" onclick="selectModel(this)">
                </li>
                <p>
                    Camiseta
                </p>
            </div>
            <div class="model">
                <li class="default-li" onclick="selectModel(this)">
                </li>
                <p>
                    Manga longa
                </p>
            </div>
        </ul >`
        ;


}*/


function verifyURL() {
    const inputValue = document.querySelector('input').value;
    console.log();
    try {
        let url = new URL(inputValue);
        console.log("Valid URL!");
    } catch (err) {
        alert("Link da imagem de referência inválido!");
    }
    confirmOrder();
}

function confirmOrder() {
    
}


function verifySelected() {
    const selected = document.querySelectorAll('.li-selected');
    if (selected.length === 3) {
        const URL = document.querySelector('input').value;
        console.log(URL);
        const button = document.querySelector('button');
        button.classList.add('button-selected');
        button.setAttribute('onclick', `verifyURL()`);
    }

}

function selectModel(seletor) {
    const liElements = document.querySelectorAll('.choose-model .li-selected');
    if (!liElements.length)
        seletor.classList.add('li-selected');
    else {
        liElements[liElements.length - 1].classList.remove('li-selected');
        seletor.classList.add('li-selected');
    }
    verifySelected();
}

function selectCollar(seletor) {
    const liElements = document.querySelectorAll('.choose-collar .li-selected');
    if (!liElements.length)
        seletor.classList.add('li-selected');
    else {
        liElements[liElements.length - 1].classList.remove('li-selected');
        seletor.classList.add('li-selected');
    }
    verifySelected();
}

function selectCloth(seletor) {
    const liElements = document.querySelectorAll('.choose-cloth .li-selected');
    if (!liElements.length)
        seletor.classList.add('li-selected');
    else {
        liElements[liElements.length - 1].classList.remove('li-selected');
        seletor.classList.add('li-selected');
    }
    verifySelected();
}

//showLastOrders();