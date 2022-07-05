export default function spanComponent(data) {
    let priceDiferencce = data.latestPrice - data.iexOpen;
    let span = document.createElement("span")
    if (priceDiferencce < 0) {
        span.innerHTML = "<span class='negative'>⩛</span>";
        return span;
    } else if (priceDiferencce > 0) {
        span.innerHTML = "<span class='positive'>⩚</span>";
        return span;
    } else {
        span.innerText = "=";
        return span;
    }
}