import odinImg from "../assets/odin_project.png";

export default function render() {

    const container = document.createElement("footer");
    container.className = "credits";

    const img = document.createElement("img");
    img.className = "odin-img";
    img.src = odinImg;
    img.alt = "The Odin Project";

    const span = document.createElement("span");
    span.textContent = "© palmwi2010 as part of The Odin Project"

    container.appendChild(img);
    container.appendChild(span);

    document.body.appendChild(container);
}