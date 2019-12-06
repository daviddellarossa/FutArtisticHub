//Extract the name-value containing the page-id from the queryString and retrieve the content of the script
//The content will be found in a variable called 'jsonContent'

//These functions all use the pattern async\await because they perform some asynchronous calls (via jQuery) and
//need them to complete before proceeding further.
//Calling an asynchronous function using the await keyword make the calling function wait for the called function
//to complete. The use of await requires the calling function to be declared as async.

let jsonContent; //Contains the content of the json file

//Function that retrieves the proper json file from the folder 'folder' (articles, artists)
//The file name to be retrieved is in the parameter 'page' in the querystring
//This function reads the file name from the querystring, builds the path concatenating that with the folder
//and calls the setJsonContent that retrieves the file by path
async function setJsonContentFromQueryString(folder){
    let page; //contains the page-id to load
    //extract the name-value from the querystring
    if(URLSearchParams) {
        let queryStringValues = new URLSearchParams(window.location.search);
        page = queryStringValues.get('page');
    }
    else{
        //for browsers not supporting URLSearchParams
        let getUrlParameter = function (name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            let results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };
        page = getUrlParameter('page');
    }
    //if there is not a 'page' parameter then redirect to pageNotFound
    if(!page){
        window.location.href = './pageNotFound.html';
    }
    let path = './content/' + folder + (folder?'/':'') + page + '.json';
    //load the content for the page
    return await setJsonContent(path);
}

//This function retrieves a json file from the path 'path' and assigns its content to the variable jsonContent
//If it does not find the file, or something else fails, it redirects to pageNotFound.
async function setJsonContent(path){
    //let jsonContent;
    await $.get(path)
        .done(function(script, textStatus){
            console.log(script);
            //console.log(textStatus);
            jsonContent = script;
        })
        .fail(function(jqxhr, settings, exception){
            $(location).attr('href', './pageNotFound.html');
        });
}

//Retrieve the partial from 'path', process it with Handlebar and put the output at 'targetNode'
//It is async because it invokes get, which is async.
async function setPartial(path, targetNode){
    await $.get(path)
        .done(function(data, textStatus){
             //console.log(data);
            let template=Handlebars.compile(data);
            targetNode.html(template(jsonContent));
            //console.log(textStatus);
        })
        .fail(function(jqxhr, settings, exception){
            $(location).attr('href', './pageNotFound.html');
        });
}

//this function calls _renderTemplateCommon passing as input the function setJsonContent
//It is used by the pages that do not need a querystring value to be rendered, like index.html, artists.html,...
async function renderTemplate(jsonContentRelativePath, targetNode){

    await _renderTemplateCommon(jsonContentRelativePath, targetNode, setJsonContent);

}

//this function calls _renderTemplateCommon passing as input the function setJsonContentFromQueryString
//It is used by the pages that need a querystring value to be rendered, like artist.html or article.html
async function renderTemplateFromQueryString(folder, targetNode){

    await _renderTemplateCommon(folder, targetNode, setJsonContentFromQueryString);

}

//This function calls the proper function (passed in the parameter 'extractJsonContentFunction') to retrieve the json file
//and passes the content of the file to Handlebar to be compiled.
//It is necessary to wait for the completion of the method extractJsonContentFunction, before proceeding further,
//otherwise Handlebars would find the variable jsonContent empty. This is why the function is defined async
//and the call to extractJsonContentFunction is defined await.
async function _renderTemplateCommon(location, targetNode, extractJsonContentFunction){
    await  extractJsonContentFunction(location);

    //populates the tag head->title
    document.title = (Handlebars.compile(document.title))(jsonContent);

    //populates the tag head->description
    let node = $("head>meta[name='description']")[0];
    if(!node){
        node = document.createElement('meta');
        node.setAttribute('name', 'description');
        node.setAttribute('content', '{{head.description}}');
        document.head.appendChild(node);
    }
    node.content = (Handlebars.compile(node.content))(jsonContent);

    //populates the tag head->keywords
    node = $("head>meta[name='keywords']")[0];
    if(!node){
        node = document.createElement('meta');
        node.setAttribute('name', 'keywords');
        node.setAttribute('content', '{{head.keywords}}');
        document.head.appendChild(node);
    }
    node.content = (Handlebars.compile(node.content))(jsonContent);

    //populates the tag body->header
    setPartial('./partials/includes/header.hbs', $("body>header"));

    //populates the tag body->footer
    setPartial('./partials/includes/footer.hbs', $("body>footer"));

    if(targetNode)
        targetNode.innerHTML = (Handlebars.compile(targetNode.firstElementChild.innerHTML))(jsonContent);
}