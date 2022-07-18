// Up/down navigation
const width = $(window).width();
if ( width > 1024){
    $('html, body').animate({scrollTop: $('#section1').offset().top}, 1000);
}

const up = $('#up');
const down = $('#down');
const mobile = $('#menu-mobile');
const menuDescription = $('.menu__description');
let count = 1;

up.css({'opacity':'0'});

function isVisible(){
    count == 1 ? up.animate({opacity: 0},1000) : up.animate({opacity: 1},1000); 

    // count == 1 ? up.css({'opacity':'0'}) : up.css({'opacity':'1'}); 
}

function getDescription(){
    switch(count){
        case 1:
            menuDescription.html('Home');
            break;
        case 2:
            menuDescription.html('Projetos');
            break;
        case 3:
            menuDescription.html('Habilidades');
            break;
        case 4:
            menuDescription.html('Contato');
            break;
    }
}

down.click(() => {
    if ( count < 4){
        count++;
        
        setTimeout(isVisible,1000);
        setTimeout(getDescription,1000);
        $('html, body').animate({scrollTop: $('#section' + count).offset().top}, 1000);
    }
});

up.click(() => {
    if ( count > 1){
        count--;
        setTimeout(isVisible,1000);
        setTimeout(getDescription,1000);
        $('html, body').animate({scrollTop: $('#section' + count).offset().top}, 1000);
    }
});



// horizontal scroll
const simpleBar = new SimpleBar(document.getElementById('items'));
const slider = document.getElementById('items');
let isDown = false;
let startX, scrollLeft;

slider.addEventListener('mousedown',(e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    // scrollLeft = slider.scrollLeft;
    scrollLeft = simpleBar.getScrollElement().scrollLeft;
})

slider.addEventListener('mouseleave',() => {
    isDown = false;
})

slider.addEventListener('mouseup',() => {
    isDown = false;
})

slider.addEventListener('mousemove',(e) => {
    if(!isDown) return; // Parar a função
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    simpleBar.getScrollElement().scrollLeft = scrollLeft - walk ;
    // slider.scrollLeft = scrollLeft - walk;
    // console.log({startX,x, walk}); 
})

// menu-mobile
let active = false;
const menuMobile = $('.js-menu__mobile');
const menuIcon = $('.menu__icon');

mobile.click(() => {
    if ( active == false ){
        menuMobile.css('display','flex');
        menuIcon.attr("name","close");
        active = true;
    }
    else{
        menuMobile.css('display','none');
        menuIcon.attr("name","menu-outline");
        active = false;
    }
});

$('a[href*="#"]:not([href="#"]').on('click', function(event){     
    event.preventDefault();

    menuIcon.attr("name","menu-outline");

    menuMobile.css('display','none');
    active = false;

    count = Number((this.hash).slice(-1));
    setTimeout(isVisible,1000);
    setTimeout(getDescription,1000);
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
});