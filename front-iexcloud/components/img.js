module.exports = function (data){
    let companyName = data.companyName;
    
    let img = document.createElement("img");
    img.setAttribute("src", src=`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${data.symbol}.png`);
    img.setAttribute("alt", companyName);

    return img;
}