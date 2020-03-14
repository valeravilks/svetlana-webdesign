import $ from 'jquery';
import 'jquery-mousewheel';
import gsap from 'gsap';

export default class{
    constructor(option) {
        this.option = option;
        this.currentSlide = 0;
        this.slideLenght = $(option.entry).find('.slide').length;
        this.slide = $(this.option.entry).find('.slide');
        this.timeline = gsap.timeline();
        this.animation = false;
        this.start = false;

        $(option.entry).ready(() => {
            $(option.entry).css('opacity', 1);
            let firstSlide = $(option.entry).find('.slide:first-child');
            let startTimeline = gsap.timeline({
                onComplete: () => {
                    this.start = true
                }
            });
            startTimeline
                .fromTo(firstSlide.find('.title'),
                {opacity: 0, x: -50},
                {opacity: 1, x:0})
                .fromTo(firstSlide.find('.num'),
                    {opacity: 0, x: -50},
                    {opacity: 1, x:0})
                .fromTo(firstSlide.find('hr'),
                    {opacity: 0, width: '0'},
                    {opacity: 1, width: '100%'})
                .fromTo(firstSlide.find('.text-1'),
                    {opacity: 0, x: -50},
                    {opacity: 1, x:0})
                .fromTo(firstSlide.find('.text-2'),
                    {opacity: 0, x: -50},
                    {opacity: 1, x:0})
                .fromTo(firstSlide.find('.text-3'),
                    {opacity: 0, x: -50},
                    {opacity: 1, x:0})
                .fromTo(firstSlide.find('.block-2'),
                    {opacity: 0},
                    {opacity: 1})
                .fromTo(firstSlide.find('.block-2 .img-cover'),
                    {width: '100%', right: 0},
                    {width: '0', ease: 'Power4.easeIn'});
        });

    }
    next(){
        this.slide.hasClass('load') ? this.slide.removeClass('load') : '';
        if(!this.animation && this.start) {
            this.animation = true;
            let nextSlide;

            if (this.slideLenght > this.currentSlide + 1) {
                nextSlide = this.currentSlide + 1;
            } else {
                nextSlide = this.currentSlide + 1 - this.slideLenght;
            }
            // this.slide.eq(this.currentSlide).removeClass('show');
            // this.slide.eq(nextSlide).addClass('show');

            let nextTimeline = gsap.timeline({
                onComplete: () => {
                    this.animation = false
                }
            });

            let currentSlideDom = this.slide.eq(this.currentSlide);
            let nextSlideDom = this.slide.eq(nextSlide);

            nextTimeline
                .addLabel('Start')
                .fromTo(currentSlideDom.find('.title'), {x: 0}, {
                    x: 50,
                    opacity: 0,
                    duration: 0.5
                }, 'Start')
                .fromTo(nextSlideDom.find('.title'), {x: -50}, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5
                }, 'Start+=0.7')
                .set(currentSlideDom.find('.block-2 .img-cover'),
                    {right: ''}, 'Start+=0.3')
                .fromTo(currentSlideDom.find('.block-2 .img-cover'),
                    {width: '0'},
                    {width: '100%', ease: 'Expo.easeIn', duration: 0.5}, 'Start+=0.3')
                .set(currentSlideDom.find('.block-2'), {opacity: 0}, 'Start+=1')
                .set(nextSlideDom.find('.block-2'), {opacity: 1}, 'Start+=1')
                .set(nextSlideDom.find('.block-2 .img-cover'),
                    {right: 0}, 'Start+=1')
                .fromTo(nextSlideDom.find('.block-2 .img-cover'),
                    {width: '100%'},
                    {width: '0', ease: 'Expo.easeIn', duration: 0.5}, 'Start+=1.1')
                .fromTo(currentSlideDom.find('.text-1'),
                    {x: 0},
                    {
                    x: 0,
                    opacity: 0,
                    duration: 0.5,
                }, 'Start+=0.3')
                .fromTo(nextSlideDom.find('.text-1'), {x: 0}, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5
                }, 'Start+=0.8')
                .fromTo(currentSlideDom.find('.text-2'), {x: 0}, {
                    x: 0,
                    opacity: 0,
                    duration: 0.5,
                }, 'Start+=0.3')
                .fromTo(nextSlideDom.find('.text-2'), {x: 0}, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5
                }, 'Start+=0.8')
                .fromTo(currentSlideDom.find('.text-3'), {x: 0}, {
                    x: 0,
                    opacity: 0,
                    duration: 0.5,
                }, 'Start+=0.3')
                .fromTo(nextSlideDom.find('.text-3'), {x: 0}, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5
                }, 'Start+=0.8')
                .fromTo(currentSlideDom.find('hr'), {width: '100%'}, {
                    width: '0%',
                    opacity: 0,
                    duration: 0.5
                }, 'Start+=0.3')
                .fromTo(nextSlideDom.find('hr'), {width: '0%'}, {
                    opacity: 1,
                    width: '100%',
                    duration: 0.5,
                    delay: 0.5
                }, 'Start+=0.8')
                .fromTo(currentSlideDom.find('.num'), {x: 0}, {
                    x: 0,
                    opacity: 0,
                    duration: 0.5
                }, 'Start+=0.3')
                .fromTo(nextSlideDom.find('.num'), {x: -50}, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: 1
                }, 'Start+=0.8')

            this.currentSlide = nextSlide;
        }
    };
    prev(){
        // this.slide.hasClass('load') ? this.slide.removeClass('load') : '';
        // if(!this.animation){
        //     this.animation = true;
        //     let prevSlide;
        //
        //     if(this.currentSlide !== 0){
        //         prevSlide = this.currentSlide - 1;
        //     } else {
        //         prevSlide = this.currentSlide - 1 + this.slideLenght;
        //     }
        //     this.slide.eq(this.currentSlide).removeClass('show');
        //     this.slide.eq(prevSlide).addClass('show');
        //     console.log(prevSlide)
        //
        //     this.currentSlide = prevSlide;
        //     setTimeout(() => {
        //         this.animation = false
        //     }, 1000);
        // }

    }
}