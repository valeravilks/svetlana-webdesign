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
                    {opacity: 0, x: -50},
                    {opacity: 1, x:0});
        });

    }
    next(){
        this.slide.hasClass('load') ? this.slide.removeClass('load') : '';
        if(!this.animation && this.start){
            this.animation = true;
            let nextSlide;

            if(this.slideLenght > this.currentSlide + 1){
                nextSlide = this.currentSlide + 1;
            } else {
                nextSlide = this.currentSlide + 1 - this.slideLenght;
            }
            // this.slide.eq(this.currentSlide).removeClass('show');
            // this.slide.eq(nextSlide).addClass('show');

            let nextTimeline = gsap.timeline();
            nextTimeline
                .addLabel('title')
                .fromTo(this.slide.eq(this.currentSlide).find('.title'), {x: 0}, {x: 50, opacity: 0, duration: 0.5}, 'title')
                .fromTo(this.slide.eq(nextSlide).find('.title'), {x: -50}, {x: 0, opacity: 1, duration: 0.5, delay: 0.5}, 'title')

            this.currentSlide = nextSlide;
            setTimeout(() => {
                this.animation = false
            }, 1000);
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