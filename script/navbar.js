const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', function () {
    navbarLinks.classList.toggle("active");
    toggleButton.classList.toggle("active");
});


for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener("mouseover", function(){
        this.classList.add("selected");
    });

    lis[i].addEventListener("mouseout", function(){
        this.classList.remove("selected")
    });

    lis[i].addEventListener("click", function(){
        this.classList.toggle("done");
    });
}