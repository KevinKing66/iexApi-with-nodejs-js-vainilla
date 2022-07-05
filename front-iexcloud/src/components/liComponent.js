import  imgComponent from "./imgComponent.js";
import  pComponent from "./pComponent.js";
import  divComponent from "./divComponent.js";
import spanComponent from "./spanComponent.js";
export default function liComponent(data) {

    let li = document.createElement("li");
    li.setAttribute("id", data.symbol);
    li.setAttribute("class", "item")

    let img = imgComponent(data);
    li.appendChild(img);

    let companyName = data.companyName;
    let p = pComponent(companyName, null);
    li.appendChild(p);

    p = createdPWithMoreData(data);
    li.appendChild(p);

    let div = divComponent(data);
    li.appendChild(div);

    return li;
}

function createdPWithMoreData(data) {
    let price = data.latestPrice;
    let currency = data.currency;
    let span = spanComponent(data);
    let text = `${price} ${currency}`;
    let p = pComponent(text, span);
    return p;
}
