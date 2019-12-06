# FutArtisticHub
Final project for the course Web Development - BSc Computer Science, Machine Learning and Artificial Intelligence @ University of London

For more information see report.html

Technologies used:

Handlebars

After having studied Handlebars in this course (Web Development), which was a completely new topic for me, I was wondering how I could apply those concepts to a real case.
This project gave me the occasion of thinking in practical terms on how I could make good use of Handlebars, for not only a mere substitution of a few strings.

I imagined that the strings to be inserted in the Handelbars placeholders could come from a json file, instead of being hardcoded into the html file.

This is the behaviour I wanted to implement: calling one of the pages of the site, the page template (index.html, for example) would load in the browser.
On page load completion, a javascript call would retrieve the json document, containing the content for that page, from the web site.
Javascript would then feed Handlebar with the json document, which would finally replace the placeholders sparse through the page with their actual content.

With this idea in mind, I had to provide a way of retrieving such json documents.
Using a server side language to build a web api, to server such json documents, was out of scope for the project, therefore I had to desing a mechanism to read the files from the same web site using client-side code.
Again, Javascript had everything I needed to do the job. Of course, doing this way the json documents are static documents, already prepared and residing on the server. However, replacing these json files with a web service, which returns a json document dynamically built based on the content of a database, would make this mechanism much closer to a real case.

Asynchronous Javascript

While writing the javascript code to retrieve the json documents, I found an unexpected issue that needed to be solved.
It happened that I called the jQuery method $.get(...) to retrieve the json file and populate a variable called jsonContent. The following line in the code tried to access the content of jsonContent variable just (really?!) created by the previous line of code, but found it empty even though the $.get() call had not failed.

Debugging and inspecting what was happening, I realized that the jsonContent variable was not just empty, it was still empty. And it was empty because the previous call $.get() had not yet returned, being asynchronous. Therefore I had to find a way to wait for that call to return before executing the next line.

$.get() actually accepts two delegate functions, done() and fail() to manage the two cases, and these delegates are only called upon completion. Putting the execution of the next lines within the done() function would have solved the problem, but required some structural changes to my javascript code.

A second solution I found is using the async function declaration. A function that executes asynchronously can be declared asynchronous (async function asyncCall(){}).
To call the function and wait for it to complete, there is another instruction await, so that the call looks like this: await asyncCall();.
This indeed solved the problem.

The downside of this method is that it has been introduced in ECMAScript 2017 Language Specification, thus it is not supported by browsers prior 2017. Opting for the implementation of the done() and fail() delegates of the $.get() function, would have wider support from the browsers. However, I chose the method based on async/await because I am interested in expanding my knowledge about the language, using features i had never used before and, although browser compatibility is a problem that every web developer has to face, learning new aspects of the language is also equally important.

Sass and SCSS

I had heard that Sass and SCSS are helpful tools to manage css documents, but I had never tried them. This was the right occasion to do so.

The IDE I use for web development is JetBrain WebStorm. It supports Sass and SCSS, but requires an extension to be installed, necessary to compile the Sass/SCSS code into css on the fly. Following the instructions on the WebStorm website, I easily manage to have my IDE able to compile Sass/SCSS code.

Learning to use SCSS is very easy, as its syntax is compatible with css, but with a lot of useful additions, like variables, operators, functions, nested nodes and much more.

I found it effective and intuitive, especially when I was tweaking the colours to fulfill the accessibility requirements. Having defined variables for colours, I could just change the value of one colour once in one place and have it done, instead of searching and replacing everywhere, which takes time and is prone to errors. The same when I was choosing the right combination of fonts.
