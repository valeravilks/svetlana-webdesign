import './scss/style.scss';
import $ from 'jquery';
import 'jquery-mousewheel';
import Slider from './js/main-slider';
import TweenMax from 'gsap';
import SplitText from './js/splitText';

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


// Animate
let infoPage = TweenMax.timeline();

infoPage.set(ch, {opacity: 0})

let st = new SplitText('.head', {type: 'lines'});
let ch = st.lines;
window.onload = function(){
    $('.o-0').removeClass('o-0');
    infoPage.fromTo('.header', {x: 50, opacity: 0}, {x: 0, opacity: 1, duration: 1});
    infoPage.from(ch, 1, { y: '+=100', opacity: 0, stagger: 0.3, rotation: 5, ease: 'Power3.easeOut' });
    infoPage.from('.an-1', {y: 100, opacity: 0, ease: 'Power3.easeOut'})
    infoPage.from('.an-2', {y: 100, opacity: 0, ease: 'Power3.easeOut'})

}

