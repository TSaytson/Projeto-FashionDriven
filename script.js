const URL_API = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';

const models = [{
        name: 't-shirt',
        image: './Images/tshirt.png'
    },
    {
        name:'top-tank',
        image:'./Images/Camiseta.png'
    },
    {
        name: 'long',
        image:'./Images/Mangalonga.png'
    }
]

const collars = [{
        name: 'v-neck',
        image: './Images/GolaV.png'
    },
    {
        name: 'round',
        image: './Images/GolaRedonda.png'
    },
    {
        name: 'polo',
        image: './Images/GolaPolo.png'
    }
]

const cloths = [{
        name: 'silk',
        image:'./Images/Seda.png'
    },
    {
        name: 'cotton',
        image: './Images/Algodão.png'
    },
    {
        name: 'polyester',
        image: './Images/Poliester.png'
    }
]

let model;
let neck;
let material;
let owner = prompt('Digite seu nome: ');
let author = owner;

let lastOrders = [];

function showLastOrders() {
    const promise = axios.get(URL_API);
    promise.then((promise) => {
        lastOrders = promise.data
        const lastOrdersList = document.querySelector('.last-orders ul');
        lastOrdersList.innerHTML = '';
        for (let i = 0; i < lastOrders.length; i++) {
            lastOrdersList.innerHTML += `
            <li onclick="confirmLastOrder(this)" id=${lastOrders[i].id}>
                <img src=${lastOrders[i].image}>
                <h1>Criador: <a>${lastOrders[i].owner}</a></h1>
            </li>`
        }
    })
    promise.catch(() => console.log('erro no axios.get'));
}


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


function confirmOrder() {
    const stringURL = verifyURL();
    if (stringURL) {
        const postBody = {
            model: model,
            neck: neck,
            material: material,
            image: stringURL,
            owner: owner,
            author: author
        }
        const promise = axios.post(URL_API, postBody);
        promise.then(() => {
            alert('Encomenda confirmada');
            showLastOrders();
        });
        //promise.catch(alert('Ops, não conseguimos processar sua encomenda'));
    }
    
}

function confirmLastOrder(selector) {
    const selectorId = selector.getAttribute('id');
    for (let i = 0; i < lastOrders.length; i++){
        if (lastOrders[i].id == selectorId) {
            const postBody = {
                model: lastOrders[i].model,
                neck: lastOrders[i].neck,
                material: lastOrders[i].material,
                image: lastOrders[i].image,
                owner: lastOrders[i].owner,
                author: lastOrders[i].owner
            }
            confirm('Deseja encomendar este modelo?');
            axios.post(URL_API, postBody);
            break;
        }
        
    }
    showLastOrders();
    showLastOrders();
}

function verifyURL() {
    const input = document.querySelector('input');
    try {
        let url = new URL(input.value);
        return input.value;
    } catch (err) {
        input.placeholder = 'Preencha com um link de imagem válido';
        return false;
    }

}

function verifySelected() {
    const selected = document.querySelectorAll('.li-selected');
    if (selected.length === 3) {
        const button = document.querySelector('button');
        button.classList.add('button-selected');
        verifyURL();
        button.setAttribute('onclick', `confirmOrder()`);
    }

}

function switchSelected(seletor, cases, variable, array) {
    switch (seletor.nextElementSibling.innerText) {
        case cases[0]:
            variable = array[0].name;
            break;
        case cases[1]:
            variable = array[1].name;
            break;
        case cases[2]:
            variable = array[2].name;
            break;
    }
    return variable;
}

function selectModel(seletor) {
    const liElements = document.querySelectorAll('.choose-model .li-selected');
    if (!liElements.length)
        seletor.classList.add('li-selected');
    else {
        liElements[liElements.length - 1].classList.remove('li-selected');
        seletor.classList.add('li-selected');
    }

    const cases = ['T-shirt', 'Camiseta', 'Manga longa'];
    model = switchSelected(seletor, cases, model, models);
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

    const cases = ['Gola V', 'Gola Redonda', 'Gola polo'];
    neck = switchSelected(seletor, cases, neck, collars);
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
    const cases = ['Seda', 'Algodão', 'Poliéster'];
    material = switchSelected(seletor, cases, material, cloths);
    verifySelected();
}

showLastOrders();