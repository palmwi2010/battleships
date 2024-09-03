export default function Banner() {

    function render() {
        const banner = document.createElement("div");
        banner.className = "top-banner";
    
        const header = document.createElement("h1");
        header.className = "header-text";
        header.textContent = "battleships"
        // header.src = trialHeader;

        // const header = document.createElement("img");
        // header.className = "battleships-header";
        // header.src = trialHeader;
    
        banner.appendChild(header);
        return banner;
    }

    return { render }
}