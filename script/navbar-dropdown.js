window.addEventListener('load', async () => {

    let dropdownLink = document.getElementById("albumLinks");
    let dropdownMenu = document.getElementById("dropdown-menu")

    dropdownMenuShow();

    function dropdownMenuShow() {
        dropdownLink.addEventListener("mouseover", function () {
            // dropdownMenu.style.opacity = "1";
            // dropdownMenu.classList.add("active");
        });

        dropdownLink.addEventListener("mouseleave", function () {
            // dropdownMenu.style.opacity = "0";
            // dropdownMenu.classList.remove("active");
        });
    }
});








