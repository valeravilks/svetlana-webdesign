import gsap from 'gsap';

export default class{
    constructor() {
        this.animation = false
        this.elem = document.createElement('div');
        this.elem.style.position = "fixed";
        this.elem.style.top = '0';
        // elem.style.height = '2px';
        this.elem.style.left = '0';
        this.elem.style.right = '0';
        // this.elem.style.backgroundColor = 'red';


        document.body.appendChild(this.elem);

        this.progress = document.createElement('div');
        this.progress.style.backgroundColor = '#8e5199';
        this.progress.style.width = '0%';
        this.progress.style.height = '3px';
        this.progress.style.transition = 'width .5s ease';
        this.progressWidth;

        this.elem.appendChild(this.progress);

        window.addEventListener('scroll', () => {
            let rez = (window.pageYOffset * 100) / (document.body.clientHeight - window.innerHeight);
            if(!this.animation && this.progressWidth !== rez) {
                this.progressWidth = rez;
                this.progress.style.width = rez + '%';
                // gsap.to(this.progress, {width: rez + '%', duration: 2,
                //     onStart: () => {
                //         this.animation = true
                //     },
                //     onComplete: () => {
                //         this.animation = false;
                //     }});
            }

        });
    }



}