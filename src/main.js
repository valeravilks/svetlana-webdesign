import './scss/style.scss';
import $ from 'jquery';
import 'jquery-mousewheel';
import Slider from './js/main-slider';
import ProgressScroll from './js/progress-scroll';
import Hammer from 'hammerjs';

import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import gsap from "gsap";  // Also works with TweenLite and TimelineLite: import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import * as PIXI from "pixi.js";

ScrollMagicPluginGsap(ScrollMagic, gsap);

// import SplitText from './js/splitText';

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
            .set('.work', {opacity: 1})
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
    // let infoSplitText = new SplitText('.info .head', {type: 'lines'});

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
                '.info .head',
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
const $hoverables2 = document.querySelectorAll('[data-cursor-hover]');
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables2.length; i++) {
    $hoverables2[i].addEventListener('mouseenter', onMouseHover);
    $hoverables2[i].addEventListener('mouseleave', onMouseHoverOut);
}

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

$('[data-to-work]').click( function(){
    let elem = document.createElement('div');
    elem.classList.add('nextLoader');
    elem.style.position = 'fixed';
    elem.style.left = '0';
    elem.style.top = '0';
    elem.style.bottom = '0';
    elem.style.zIndex = '1';
    elem.style.width = '0';
    elem.style.backgroundColor = 'red';

    document.body.appendChild(elem);

    let timelineToWork = gsap.timeline({
        onComplete: () => {
            let href = window.location.href.split('/');
            if(href[href.length - 1]){
                window.location.href = window.location.href + '/' + $(this).attr('data-to-work');
            } else {
                window.location.href = window.location.href + $(this).attr('data-to-work');
            }

            // window.location.href = window.location.href + $(this).attr('data-to-work');
        }
    });

    timelineToWork.fromTo('body', {opacity: 1}, {opacity: 0, duration: 0.3});
});

$('[data-to-work2]').click( function(){
    let elem = document.createElement('div');
    elem.classList.add('nextLoader');
    elem.style.position = 'fixed';
    elem.style.left = '0';
    elem.style.top = '0';
    elem.style.bottom = '0';
    elem.style.zIndex = '1';
    elem.style.width = '0';
    elem.style.backgroundColor = 'red';

    document.body.appendChild(elem);

    let timelineToWork = gsap.timeline({
        onComplete: () => {
            let loc = window.location.origin;
            console.log(loc + $(this).attr('data-to-work'));
            window.location.href = window.location.origin + $(this).attr('data-to-work2');
        }
    });

    timelineToWork.fromTo('body', {opacity: 1}, {opacity: 0, duration: 0.3});
});

$('.link').click( function(e){
    e.preventDefault();
    let elem = document.createElement('div');
    elem.classList.add('nextLoader');
    elem.style.position = 'fixed';
    elem.style.left = '0';
    elem.style.top = '0';
    elem.style.bottom = '0';
    elem.style.zIndex = '1';
    elem.style.width = '0';
    elem.style.backgroundColor = 'red';

    document.body.appendChild(elem);

    let timelineToWork = gsap.timeline({
        onComplete: () => {
            window.location.href = $(this).attr('href');
        }
    });

    timelineToWork.fromTo('body', {opacity: 1}, {opacity: 0, duration: 0.3});
});

let pScroll = new ProgressScroll();

var mc = new Hammer(document.body);

// listen to events...
mc.on("panleft panright tap press", (ev) => {
    if(ev.type == 'panleft'){
        slider.next();
    }
    if(ev.type == 'panright'){
        slider.prev();
    }
    // document.body.textContent = ev.type +" gesture detected.";
});
//
// window.onload = function() {
//     if (window.innerWidth < 400) {
//         var mvp = document.getElementById('vp');
//         mvp.setAttribute('content','user-scalable=no,width=450');
//     }
// }


let element = document.getElementById('image');

let app = new PIXI.Application({
    width: element.offsetWidth,
    height: element.offsetHeight
});
app.stage.interactive = true;
let imgg = element.getAttribute('data-src');
console.log(imgg);
element.appendChild(app.view);
let iim = require('img/main-page/displ.png');

let container = new PIXI.Container();
app.stage.addChild(container);

const displacementSprite = PIXI.Sprite.from(imgg);
container.addChild(displacementSprite);

app.loader.add(iim).load(()=>{
    const displacementSprite2 = PIXI.Sprite.from(iim);
    displacementSprite2.width = element.offsetWidth * 2;
    displacementSprite2.height = element.offsetHeight * 2;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite2);
    displacementFilter.scale.x = 1;
    displacementFilter.scale.y = 1;
    app.stage.addChild(displacementSprite2);

    container.filters = [displacementFilter];

    app.stage
        .on('mouseover', onMouseOver)
        .on('mouseout', onMuseOut);

    function onMouseOver(event){
        console.log(displacementSprite2);
        let t1 = gsap.timeline();
        t1.addLabel('st')
          .to(displacementFilter.scale, 0.2, {x: 50}, "st")
          .to(displacementSprite2.position, 0.4, {x: -150}, 'st')
          .to(displacementFilter.scale, 0.2, {x: 1}, 'st+=0.2')
    }
    function onMuseOut(event){
        gsap.to(displacementFilter.scale, {x: 0})
        gsap.to(displacementSprite2.position, {x: 0})
    }
});



