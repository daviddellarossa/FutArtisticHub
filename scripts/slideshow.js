/*
The code in this script has been inspired by an example found on W3Schools
https://www.w3schools.com/howto/howto_js_slideshow.asp
 */

var slideIndex = 1;

//EventListener for the click event on the Forward button of the slideshow
function nextSlide() {
    displaySlide(slideIndex += 1);
}

//EventListener for the click event on the Back button of the slideshow
function prevSlide() {
    displaySlide(slideIndex -= 1);
}

// EventListener for the click event on the dots of the slideshow
function currentSlide(n) {
    displaySlide(slideIndex = n);
}

//function that displays the image number n on the slideshow and update the dots
function displaySlide(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        //reset the slides
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        //reset the dots
        dots[i].className = dots[i].className.replace(" active", "");
    }
    //set the current slide
    slides[slideIndex-1].style.display = "block";
    //set the current dot
    dots[slideIndex-1].className += " active";
}

//function that attaches the eventListener to the controls needed by the slideshow
//This has been added by me to remove all the inline javascript code of the original example
function attachEventListeners(){
    //attach eventListeners to the buttons prev and next
    $("#slideshow_next")[0].addEventListener('click', nextSlide);
    $("#slideshow_prev")[0].addEventListener('click', prevSlide);

    //attach eventListeners to the dots
    for(let i of $(".dot")){
        let value = parseInt(i.dataset.index) +1;
        let handleClick = (event) => currentSlide(value);
        i.addEventListener('click', handleClick);
    }
}