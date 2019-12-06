$(document).ready(async function() {

    //calls the function that retrieves the json file and populates the indicated node
    await renderTemplate(
        './content/artists.json',
        $("#artists")[0]);

    //render slideshow

    //call the function that attaches eventListener for the slideshow to the UI controls
    attachEventListeners();

    //render slideshow
    displaySlide(slideIndex);
});