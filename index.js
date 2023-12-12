window.scrollTo(0, 0);

//preloader DIV
const preloader = document.querySelector('.preloader');

//content wrapper DIV
const contentWrapper = document.querySelector('.content-wrapper')


//values to keep track of the number of letters typed, which quote to use, etc. 

var i = 0,
    a = 0;
    
    
var pTagArray = [];


var textArray = [
    "sudo apt-get install newhire       ",
    "                                   ", 
    "loading image files................",
    "loading script files...............",
    "loading static content.............",
    "loading style sheets...............",
    "loading user preferences...........",
    "generating user experience.........",
    "creating document object model.....",
    "authenticating user profile........"
];

//typing speed

var speedForward = 20,
    speedBetweenLines = 400;

function hidePreloader() {
    preloader.style.display = "none";
}    


function PreloaderFadeOut() {

    const fadeOutEffect = setInterval(() => {
        if (!preloader.style.opacity) {
          preloader.style.opacity = 1;
        }
        if (preloader.style.opacity > 0) {
          preloader.style.opacity -= 0.1;
        } else {
          clearInterval(fadeOutEffect);
        }
    }, 300);

}

function mainContentFadeIn() {
    contentWrapper.style.opacity = 0;
    const fadeInEffect = setInterval(() => {
        
        if (contentWrapper.style.opacity < 1) {
          contentWrapper.style.opacity = parseFloat(contentWrapper.style.opacity) + 0.1;

        } else {
          clearInterval(fadeInEffect);
        }
    }, 300);

}

function typeWriter(id, ar) {
    var element = $("#" + id),    
    eParagraph = element.children("#line" + [a]);
    
    currentString = ar[a];
    
    setTimeout(() => {
        
        eParagraph.text(eParagraph.text() + currentString.charAt(i));
        i++;
        if (i < currentString.length){
            typeWriter(id, ar);
        } else {
            
            pTagArray[a].classList.remove('cursor');
            i = 0;
            a++;
            newLine();
            setTimeout(() => {typeWriter(id, ar);}, speedBetweenLines);
            if (a === textArray.length) {
                hidePreloader();
                mainContentFadeIn();
            }
        }
    }, speedForward);
}   

function newLine() {
    pTagArray[a] = document.createElement("p");
    pTagArray[a].setAttribute('id', 'line' + a );
    pTagArray[a].setAttribute('class', 'cursor');
    document.getElementById("output").appendChild(pTagArray[a]);
    if (a == 0 ) {
        pTagArray[a].innerHTML = '<span>root@root:~# </span>';
    } else if ( a == 1 ) {
        pTagArray[a].innerHTML = '<span>[sudo] password for root: </span>';
    }
}

//window.addEventListener('load', function(){hidePreloader();})

newLine();

//run the loop
typeWriter("output", textArray);

