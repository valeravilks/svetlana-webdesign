import './scss/style.scss';
import $ from 'jquery';
import 'jquery-mousewheel';
import Slider from './js/main-slider';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

//
// $('.slide').addClass('hide');

window.onload = function(){
    // $('.slider').removeClass('hide');
    // $('.slide:first-child').removeClass('hide');
    $('header').removeClass('hide');

    $('body').on('mousewheel', function(event) {
        if(event.deltaY < 0){
            slider.next();
        } else {
            slider.prev();
        }
    });

    $('.b-next').click(function(){
        slider.next();
    });
    $('.b-prev').click(function(){
        slider.prev();
    });
};

let slider = new Slider({
    entry: '.slider'
});
