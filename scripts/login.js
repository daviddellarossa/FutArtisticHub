
//this function manages the Login and Register partials, based on the user action.
//initially it renders register first which contains a link-button (goto_login) whose eventListener invokes the same function.
//The second time it is called, the function renders login.
//This is an async function because it invokes setPartial which is async
//If this function were not async, it would return from setPartial before it to complete and it would not find
//the #goto_register control because not yet created.
//using the async/await pattern the function setPartial returns only when its execution is complete.
async function toggleLoginRegister(){
    if($("#goto_login")[0]){    //if there is a control named #got_login, load login.hbs
        await setPartial('./partials/includes/login.hbs', $("body>main"));
        $("#goto_register")[0].addEventListener("click", toggleLoginRegister);
    }
    else //otherwise load register.hbs
    {
        await setPartial('./partials/includes/register.hbs', $("body>main"))
        $("#goto_login")[0].addEventListener("click", toggleLoginRegister);
    }
}

$(document).ready(async function() {

    //calls the function that retrieves the json file and populates the indicated node
    await renderTemplate(
        './content/login.json',
        null);

    await toggleLoginRegister();
});
