export default function pComponent (text, child){
    let p = document.createElement("p");
    p.innerText = text;
    if(child != null){   
    p.appendChild(child);
    }
    return p;
}