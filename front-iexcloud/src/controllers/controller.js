const baseUrl = "http://localhost:3000/";
function action(action, symbol){
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

function refresh (symbol) {
    let stockQuote = `${baseUrl}stock?symbol=${symbol}`;
    if(symbol !== ""){
    fetch(stockQuote)
        .then(res => res.json())
        .then(data => add(data))
        .catch(error => console.log('error', error));
    }
}

function remove(item) {
    removeItemList(item);
    removeItemListLocalStorage(item);
}

function removeItemList(item) {
    let parent = item.parentElement;
    parent.removeChild(item);
}

function removeItemListLocalStorage(item) {
    let data = localStorage.getItem("search");
    if (data) {
        data = JSON.parse(data);
        let index = data.indexOf(item);
        data.splice(index);
        localStorage.setItem("search", data);
    }
}