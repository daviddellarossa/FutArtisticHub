$(document).ready(async function() {

    //calls the function that retrieves the json file
    await renderTemplate(
        './content/about.json',
        null);

});