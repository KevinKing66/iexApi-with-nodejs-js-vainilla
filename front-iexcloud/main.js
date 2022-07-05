const baseUrl = "http://localhost:3000/";

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
    data = localStorage.getItem("search");
    dataList = [];

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
    let li = addObjectInList(data);
    ul.appendChild(li);
}

function addObjectInList(data) {
    li = document.createElement("li");
    li.setAttribute("id", data.symbol);
    li.setAttribute("class", "item")

    img = document.createElement("img");
    img.setAttribute("src", src=`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${data.symbol}.png`);
    li.appendChild(img);

    companyName = data.companyName;
    img.setAttribute("alt", companyName)
    p = document.createElement("p");
    p.innerText = companyName;
    li.appendChild(p);

    p = document.createElement("p");
    price = data.latestPrice;
    currency = data.currency;
    changeType = changeValue(data);
    p.innerHTML = `${price} ${currency} `;
    p.appendChild(changeType)
    li.appendChild(p);

    div = document.createElement("div");
    div.setAttribute("class", "options")

    svg = document.createElement("svg");
    svg.innerHTML = `<svg onclick="remove(${data.symbol})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>`
    div.appendChild(svg);

    svg = document.createElement("svg");
    svg.innerHTML = `<svg onclick="refresh(${data.symbol})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"/></svg>`
    div.appendChild(svg);

    li.appendChild(div);

    return li;
}

function changeValue(data) {
    priceDiferencce = data.latestPrice - data.iexOpen;
    changeType = document.createElement("span")
    if (priceDiferencce < 0) {
        changeType.innerHTML = "<span class='negative'>⩛</span>";
        return changeType;
    } else if (priceDiferencce > 0) {
        changeType.innerHTML = "<span class='positive'>⩚</span>";
        return changeType;
    } else {
        changeType.innerText = "=";
        return changeType;
    }
}

function remove(item) {
    removeItemList(item);
    removeItemListLocalStorage(item);
}

function removeItemList(item) {
    parent = item.parentElement;
    parent.removeChild(item);
}

function removeItemListLocalStorage(item) {
    data = localStorage.getItem("search");
    if (data) {
        data = JSON.parse(data);
        index = data.indexOf(item);
        data.splice(index);
        localStorage.setItem("search", data);
    }
}

function loadSearchesLocalStore() {
    data = localStorage.getItem("search");
    if (data) {
        data = JSON.parse(data);
        createNewList(data);
    }
}

function createNewList(list) {
    let ul = document.querySelector("body > main > ul");
    let newUl = document.createElement("ul");
    for (data of list) {
        li = addObjectInList(data);
        newUl.appendChild(li);
    }
    ul.parentElement.replaceChild(newUl, ul);
}

function refresh(symbol) {
    stockQuote = `${baseUrl}stock?symbol=${symbol}`;
    if(symbol === ""){
        return;
    }
    fetch(stockQuote)
        .then(res => res.json())
        .then(data => add(data))
        .catch(error => console.log('error', error));
}
window.onload = loadSearchesLocalStore();