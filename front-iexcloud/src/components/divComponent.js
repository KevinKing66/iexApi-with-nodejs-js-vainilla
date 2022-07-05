import { svgComponentRemove, svgComponentRefresh } from "./svgComponent.js";

export default function divComponent (data) {
    let div = document.createElement("div");
    div.setAttribute("class", "options");

    let svg = svgComponentRemove(data);
    div.appendChild(svg);

    svg = svgComponentRefresh(data);
    div.appendChild(svg);

    return div;
}