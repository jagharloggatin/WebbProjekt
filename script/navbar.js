const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

let navbarAnchor = document.querySelectorAll(".navbar-links ul li a");
let navbarLi = document.querySelectorAll(".navbar-links ul li");

toggleButton.addEventListener('click', function () {
    navbarLinks.classList.toggle("active");
    toggleButton.classList.toggle("active");
});

for (let i = 0; i < navbarAnchor.length; i++) {
    navbarLi[i].addEventListener("mouseover", function(){
        navbarAnchor[i].style.color = "white";
    });

    navbarLi[i].addEventListener("mouseout", function(){
        navbarAnchor[i].style.color = "#444040";
    });


}