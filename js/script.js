var navContainer = document.querySelector('.navbar');
var navTabs = document.querySelectorAll('.nav-item');
var navTabSlider = document.querySelector('.nav-tab-slider');
var navContainerTop = document.querySelector('.nav-container--top');
var sections = document.querySelectorAll('section');

var navTabSliderWidth = navTabs[0].offsetWidth;
var navTabSliderLeft = navTabs[0].offsetLeft;
const windowH = this.window.innerHeight - 1

slideFunction = function() {
    navTabSliderWidth = this.offsetWidth;
    navTabSliderLeft = this.offsetLeft;
    navTabSlider.style.width = navTabSliderWidth + 'px';
    navTabSlider.style.left = navTabSliderLeft + 'px'; 
}

currentSection = function(){
    var current = '';
    sections.forEach(function(section){
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    return current
}

navTabs.forEach(function(navTab) {
    navTab.addEventListener('click', slideFunction);
});

window.addEventListener('scroll', function() {
    if (window.scrollY > windowH) {
        navContainer.classList.add('nav-container--top');
    } else {
        navContainer.classList.remove('nav-container--top');
    }
    var current = currentSection();
    if (current !== '' && current !== null) {
        var currentTab = document.querySelector('a[href="#' + current + '"]');
        navTabSlider.style.width = currentTab.offsetWidth + 'px';
        navTabSlider.style.left = currentTab.offsetLeft + 'px';
    }
});



galleryProjects = document.querySelector('.gallery-projects');
projects.addEventListener('click', function(e) {
    if (e.target.classList.contains('project')) {
        if (e.target.getAttribute('href') !== null) {
            window.open(e.target.getAttribute('href'), '_blank');
        } else {
            alert('Coming soon!');
        }
    }
});