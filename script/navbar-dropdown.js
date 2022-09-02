window.addEventListener('load', async () => {

    let dropdownLink = document.getElementById("albumLinks");
    let dropdownMenu = document.getElementById("dropdown-menu")

    dropdownMenuShow();

    function dropdownMenuShow() {
        dropdownLink.addEventListener("mouseover", function () {
            dropdownMenu.style.opacity = "1";
        });

        dropdownLink.addEventListener("mouseleave", function () {
            dropdownMenu.style.opacity = "0";
        });
    }
});








