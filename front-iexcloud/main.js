import liCreate from "./src/components/liComponent.js";
// import action from "./src/controllers/controller.js";

function find() {
    let symbol = document.getElementById("symbol").value;
    if(symbol === ""){
        return;
    }
    stockQuote = `${baseUrl}stock?symbol=${symbol}`;
    fetch(stockQuote)
        .then(res => res.json())
        .then(data => add(data))
        .catch(error => console.log('error', error));
    console.log(symbol)
}

function add(data) {
    id = document.getElementById(data.symbol)
    if (!id) {
        addToList(data);
        addLocalStorage(data);
    }
}

function addLocalStorage(item) {
    let data = localStorage.getItem("search");
    let dataList = [];

    if (data) {
        dataList = JSON.parse(data);
    }
    if ((data && !data.includes(item)) || !data) {
        dataList.push(item);
        createNewList(dataList);
    }

    localStorage.setItem("search", JSON.stringify(dataList));
}

function addToList(data) {
    let ul = document.querySelector("body > main > ul");
    let li = liCreate(data);
    ul.appendChild(li);
}

function loadSearchesLocalStore() {
    let data = localStorage.getItem("search");
    if (data) {
        data = JSON.parse(data);
        createNewList(data);
    }
}

function createNewList(list) {
    console.log(list);
    let ul = document.querySelector("body > main > ul");
    let newUl = document.createElement("ul");
    for (let data of list) {
        let li = liCreate(data);
        newUl.appendChild(li);
    }
    ul.parentElement.replaceChild(newUl, ul);
}

window.onload = loadSearchesLocalStore();