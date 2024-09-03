export default function Banner() {

    function render() {
        const banner = document.createElement("div");
        banner.className = "top-banner";
    
        const header = document.createElement("h1");
        header.className = "header-text";
        header.textContent = "battleships"
 
        banner.appendChild(header);
        return banner;
    }

    return { render }
}