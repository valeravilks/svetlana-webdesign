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

    if($('body').hasClass('work')){
        let timeline = gsap.timeline({
            onComplete: () => {
                document.querySelectorAll('.js-img-animate').forEach(function(element){
                    let blockAnimate = gsap.timeline();

                    blockAnimate
                        .fromTo($(element), {y: 50, opacity: 0}, {y: 0, opacity: 1, duration: 0.3})

                    var contentSM = new ScrollMagic.Scene({
                        triggerElement: element,
                        triggerHook: 0.8
                    })
                        .setTween(blockAnimate)
                        .addTo(controller);
                });

                document.querySelectorAll('.js-text-animate').forEach(function(element){
                    let blockAnimate = gsap.timeline();

                    blockAnimate
                        .fromTo($(element), {x: 50, opacity: 0}, {x: 0, opacity: 1, duration: 0.3})

                    var contentSM = new ScrollMagic.Scene({
                        triggerElement: element,
                        triggerHook: 0.8
                    })
                        .setTween(blockAnimate)
                        .addTo(controller);
                });

                document.querySelectorAll('.js-mob-animate').forEach(function(element){
                    let blockAnimate = gsap.timeline();

                    blockAnimate
                        .fromTo($(element).find('img'), {opacity: 0}, {stagger: 0.3, opacity: 1, duration: 0.3})

                    var contentSM = new ScrollMagic.Scene({
                        triggerElement: element,
                        triggerHook: 0.8
                    })
                        .setTween(blockAnimate)
                        .addTo(controller);
                });
            }
        });

        timeline
            .addLabel('s')
            .fromTo('.title',
                {x: 100, opacity: 0},
                {x: 0, opacity: 1}, 's+=0.6')
            .fromTo('.text',
                {x: 100, opacity: 0},
                {x: 0, stagger: 0.1, opacity: 1}, 's+=0.8')
            .fromTo('.js-link',
                {x: 100, opacity: 0},
                {x: 0, opacity: 1}, 's+=1')
            .fromTo('.content',
                {x: 100, opacity: 0},
                {x: 0, opacity: 1}, 's+=1.2')

    }

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
if($('body').hasClass('work')) {
    $('.work-footer .block-2').hover(() => {
        $('.work-footer .text-2:before').css('height', '100%')
    }, () => {

    })
}

if($('body').hasClass('to-index')){
    window.location.href = '/ru'
}

// Cursor

let cursorHtml = `
      <div class="cursor__ball cursor__ball--big ">
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
        </svg>
      </div>
      
      <div class="cursor__ball cursor__ball--small">
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
        </svg>
      </div>
`;

let nodeCursor = document.createElement('div');
nodeCursor.classList.add('cursor');
nodeCursor.innerHTML = cursorHtml;
document.body.appendChild(nodeCursor);

const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('a');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
    gsap.to($bigBall, .8, {
        x: e.pageX - 15,
        y: e.clientY - 15
    })
    gsap.to($smallBall, .1, {
        x: e.pageX - 5,
        y: e.clientY - 10
    })
}

// Hover an element
function onMouseHover() {
    gsap.to($bigBall, .3, {
        scale: 4
    })
}
function onMouseHoverOut() {
    gsap.to($bigBall, .3, {
        scale: 1
    })
}

