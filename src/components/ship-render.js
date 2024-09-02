import destroyerImg from "../assets/destroyer.webp";
import frigateImg from "../assets/frigate.webp";
import galleyA from "../assets/galley-a.webp";
import fisherImg from "../assets/fisher.webp";

export default function ShipRender() {

    const shipMap = {
        2: {img:fisherImg, class: "fisher-gallery", holes: 2},
        3: {img:galleyA, class: "galley-gallery", holes:3},
        4: {img:frigateImg, class: "frigate-gallery", holes: 4},
        5: {img:destroyerImg, class: "destroyer-gallery", holes:5},
    }

    function renderImage(holes) {
        const obj = shipMap[holes];
        const img = document.createElement("img");
        img.src = obj.img;
        img.alt = `Image of a ship with ${obj.holes} holes.`
        img.setAttribute("data-ship", obj.holes);
        img.className = "boat-gallery";
        img.classList.add(obj.class);
        return img;
    }

    return { renderImage }
}