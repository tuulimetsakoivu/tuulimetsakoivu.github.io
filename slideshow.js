var slides = null;

var showLength = 0;

var slidesHtml = [];

var pausePressed = false;

var slideIndex = (localStorage.getItem('slideIndex') === null ? 0 : localStorage.getItem('slideIndex'));

window.onload = function() {
    $.getJSON("https://metsakt1.firebaseio.com/.json", function( data ) {
        slides = data.articles;
        bringSlides(slides);
        showSlide();
        console.log(slideIndex);
    });
$('#previous').click('click', function(e){ 
    previousSlide();
}
);

$('#next').click('click', function(e){
    nextSlide();
}
);
    
$('#pause').click('click', function(e){
    window.clearInterval();
    pausePressed = true;
});
    
$(document).ready(function(e) {
    window.setInterval(function(e){
    if (pausePressed == false){nextSlide();
     console.log(slideIndex);}
}, 5000);
});
    
};

function bringSlides(contents) {
        for(var j = 0; j < contents.length; j++) {
          slidesHtml.push('<article class="slideText" id="text-'+j+'"><h2 id="textTitle-'+j+'">'+contents[j].article.title+'</h2><p id="textDate-'+j+'">'+contents[j].article.date+'</p><p id="textContent-'+j+'">'+contents[j].article.content+'</p></article><img  class="slidePic" id="picture-'+j+'" src="extras/picture-'+j+'.jpg" style="width:100%">');
        };
         $("#slidesAction").append(slidesHtml);
         for(var j = 0; j < slidesHtml.length; j++) {
            $('#text-'+j).hide();
            $('#picture-'+j).hide();
         }; 
};

function showSlide() {
    
    for(var j = 0; j < slidesHtml.length; j++) {
            $('#text-'+j).hide();
            $('#picture-'+j).hide();
         }; 
    $('#text-'+slideIndex).fadeIn(2000);
   $('#picture-'+slideIndex).fadeIn(500);
};

function nextSlide() {
    slideIndex++;
    if(slideIndex >= slidesHtml.length){
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slidesHtml.length - 1;
    };
    localStorage.setItem('slideIndex', slideIndex);
    showSlide();
    
};

function previousSlide() {
    slideIndex--;
    if(slideIndex >= slidesHtml.length){
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slidesHtml.length - 1;
    };
    localStorage.setItem('slideIndex', slideIndex);
    showSlide();
};

