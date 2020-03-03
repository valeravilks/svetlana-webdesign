import './scss/style.scss';
import $ from 'jquery';
import 'jquery-mousewheel';
import Slider from './js/main-slider'
//
// $('.slide').addClass('hide');

window.onload = function(){
    // $('.slider').removeClass('hide');
    // $('.slide:first-child').removeClass('hide');


    $('body').on('mousewheel', function(event) {
        console.log(event.deltaX, event.deltaY, event.deltaFactor);
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




