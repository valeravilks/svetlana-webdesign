import $ from 'jquery';
import 'jquery-mousewheel';

export default class{
    constructor(option) {
        this.option = option;
        this.currentSlide = 0;
        this.animation = false;
        this.slideLenght = $(option.entry).find('.slide').length;
        this.slide = $(this.option.entry).find('.slide');

        $(option.entry).ready(function () {
            $(option.entry).css('opacity', 1);
            $(option.entry).find('.slide:first-child').addClass('show');
        });
    }
    next(){
        let nextSlide;

        if(this.slideLenght > this.currentSlide + 1){
            nextSlide = this.currentSlide + 1;
        } else {
            nextSlide = this.currentSlide + 1 - this.slideLenght;
        }
        this.slide.eq(this.currentSlide).removeClass('show');
        this.slide.eq(nextSlide).addClass('show');

        this.currentSlide = nextSlide;
    };
    prev(){
        let prevSlide;

        if(this.currentSlide !== 0){
            prevSlide = this.currentSlide - 1;
        } else {
            prevSlide = this.currentSlide - 1 + this.slideLenght;
        }
        this.slide.eq(this.currentSlide).removeClass('show');
        this.slide.eq(prevSlide).addClass('show');
        console.log(prevSlide)

        this.currentSlide = prevSlide;
    }
}