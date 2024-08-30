import battleshipsHeader from "../assets/battleshipsHeader.webp";

export default function Banner() {

    function render() {
        const banner = document.createElement("div");
        banner.className = "top-banner";
    
        const header = document.createElement("img");
        header.className = "battleships-header";
        header.src = battleshipsHeader;
    
        banner.appendChild(header);
        return banner;
    }

    return { render }
}