export default function imgComponent (data){
    let companyName = data.companyName;
    
    let img = document.createElement("img");
    img.setAttribute("src", `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${data.symbol}.png`);
    img.setAttribute("alt", companyName);

    return img;
}