import './scss/style.scss';
import $ from 'jquery';
import 'jquery-mousewheel';
import Slider from './js/main-slider';

import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import gsap from "gsap";  // Also works with TweenLite and TimelineLite: import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, gsap);

import SplitText from './js/splitText';

var controller = new ScrollMagic.Controller();

window.onload = function(){

    gsap.fromTo('.header', {x: 50, opacity: 0}, {x:0, opacity: 1, delay: 0.5});

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
if($('body').hasClass('info')){

    let infoPageTimeline = gsap.timeline();
    let infoSplitText = new SplitText('.info .head', {type: 'lines'});

    window.onload = function(){

        $('.wrapper').removeClass('o-0');
        infoPageTimeline
            .addLabel('only')
            .fromTo(
            '.header',
            {x: 50, opacity: 0},
            {x: 0, opacity: 1, duration: 1},
            'only'
            )
            .from(
                infoSplitText.lines,
                1,
                { y: '+=100', opacity: 0, stagger: 0.3, rotation: 5, ease: 'Power3.easeOut' },
                'only'
            );

        infoPageTimeline.eventCallback("onComplete", function(){
            $('.content').removeClass('o-0');

            document.querySelectorAll('.js-info-animate').forEach(function(element){
                let blockAnimate = gsap.timeline();

                blockAnimate
                    .addLabel('only')
                    .fromTo($(element).find('.block-1'), {x: -150, opacity: 0}, {x: 0, opacity: 1, duration: 0.3}, 'only')
                    .fromTo($(element).find('.block-2'), {x: 150, opacity: 0}, {x: 0, opacity: 1, duration: 0.3}, 'only');

                var contentSM = new ScrollMagic.Scene({
                    triggerElement: element,
                    triggerHook: 0.8
                })
                    .setTween(blockAnimate)
                    .addTo(controller);
            });


        });
    }
}
if($('body').hasClass('home')){

}


