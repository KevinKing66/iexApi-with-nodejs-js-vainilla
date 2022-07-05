import liComponent from "../components/liComponent.js";
const baseUrl = "http://localhost:3000/";

let button = document.querySelector("body > nav > button");
button.addEventListener("click", find);

const action = function(action, symbol){
    switch(action){
        case "delete":
            remove(symbol);
            break;
        case "update":
            refresh(symbol);
            break;
        default:
            break;
    }
}
window.action = action;

function refresh (symbol) {
    let stockQuote = `${baseUrl}stock?symbol=${symbol}`;
    if(symbol !== ""){
    fetch(stockQuote)
        .then(res => res.json())
        .then(data => add(data))
        .catch(error => console.log('error', error));
    };
}

function remove(item) {
    removeItemList(item);
    removeItemListLocalStorage(item);
}

function removeItemList(item) {
    let element = document.getElementById(item);
    element.remove();
}

function removeItemListLocalStorage(item) {
    let data = localStorage.getItem("search");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
        if (data[i].symbol === item) {
            data = data.slice(i);
            console.log(data);
            data = JSON.stringify(data);
            localStorage.setItem("search", data);
            break;
        }
    }
}

function find() {
    let symbol = document.getElementById("symbol").value;
    if(symbol === ""){
        return;
    }
    let stockQuote = `${baseUrl}stock?symbol=${symbol}`;
    fetch(stockQuote)
        .then(res => res.json())
        .then(data => add(data))
        .catch(error => console.log('error', error));
    console.log(symbol);
}

function add(data) {
    let id = document.getElementById(data.symbol)
    if (id == null) {
        addToList(data);
        addLocalStorage(data);
    };
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
    let li = liComponent(data);
    ul.appendChild(li);
}

function loadSearchesLocalStore() {
    let data = localStorage.getItem("search");
    if(data == null){
        return;
    }
    if (data) {
        data = JSON.parse(data);
        createNewList(data);
    }
}

function createNewList(list) {
    let ul = document.querySelector("body > main > ul");
    let newUl = document.createElement("ul");
    for (let data of list) {
        let li = liComponent(data);
        newUl.appendChild(li);
    }
    ul.parentElement.replaceChild(newUl, ul);
}

window.onload = loadSearchesLocalStore();