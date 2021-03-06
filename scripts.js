
var pages = ['home', 'more-info', '404']; // Define pages available
var pagesContent = {}; // Do not touch

function preLoadPages() { // Preload pages
    pages.forEach(page => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET","pages/"+page+".html",false);
        xmlHttp.send(null);
        pagesContent[page] = xmlHttp.responseText;
    });
}

function loadPage(page) { // Put page content into the body
    var pageHolder = document.querySelector("body div#content");
    document.querySelector("body").id = page;
    pageHolder.innerHTML = pagesContent[page];
    document.body.id = page;
}

function pageLoaded(page) {
    // Do additional stuff for each page to make buttons work etc.
    switch (page) {
        case 'home':
            document.querySelector("body#home #content > button").onclick = function() {
                goTo('more-info');
            }
            break;
        case 'more-info':
            document.querySelector("body#more-info #content > button:nth-child(1)").onclick = function() {
                var win = window.open('https://github.com/Hattorius/simple-javascript-routing', '_blank');
                win.focus();
            }
            document.querySelector("body#more-info #content > button:nth-child(3)").onclick = function() {
                goTo('home');
            }
        case '404':
            document.querySelector("body#404 #content > button").onclick = function() {
                goTo('home');
            }
    }
}

function goTo(page) { // Pushing states, if page not found show 404
    window.history.pushState({}, '', page);
    if (pages.includes(page)) {
        loadPage(page);
        pageLoaded(page);
    } else {
        loadPage('404');
        pageLoaded('404');
    }
}

document.body.onload = function() { // Whenever body is ready, get url and load page
    preLoadPages()
    var sPath = window.location.pathname;
    if (typeof sPath !== "undefined" && sPath != "/") {
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        goTo(sPage)
    } else {
        goTo('home')
    }
}

window.onpopstate = function() { // If user clicks back, also update page
    var sPath = window.location.pathname;
    if (typeof sPath !== "undefined" && sPath != "/") {
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
        goTo(sPage)
    } else {
        goTo('home')
    }
}
