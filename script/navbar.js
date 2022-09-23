window.addEventListener('load', async () => {

    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];

    toggleButton.addEventListener('click', function (event) {
        event.preventDefault();
        navbarLinks.classList.toggle("active");
        console.log("HEJ")
        toggleButton.classList.toggle("active");
    });

});
