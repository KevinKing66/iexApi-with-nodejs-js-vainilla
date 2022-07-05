import liComponent from "../components/liComponent.js";
import Services  from "../service/Services.js";
const baseUrl = "http://localhost:3000/";

let button = document.querySelector("body > nav > button");
button.addEventListener("click", find);
 if(true){
    let data = await Services.findShare("aapl");
    console.log(data)
 }

const action = function (action, symbol) {
    switch (action) {
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

async function refresh(symbol) {
    let data = await Services.findShare(symbol);
    console.log(data);
    add(data);
}

function remove(item) {
    removeItemList(item);
    removeItemListLocalStorage(item);
}

function removeItemList(item) {
    let element = document.getElementById(item);
    element.remove();
}

function removeItemListLocalStorage(symbol) {
    let data = localStorage.getItem("search");
    data = JSON.parse(data);
    data = data.filter(item => item.symbol !== symbol)
    data = JSON.stringify(data);
    localStorage.setItem("search", data);
}

async function find() {
    let symbol = document.getElementById("symbol").value;
    if (symbol === "") {
        return;
    }
    let data = await Services.findShare(symbol);
    console.log(data);
    add(data);
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
    if (data == null) {
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

window.action = action;
window.onload = loadSearchesLocalStore();