$(document).ready(async function() {

    //calls the function that retrieves the json file and populates the indicated node
    await renderTemplate(
        './content/pageNotFound.json',
        $("section")[0]);
});