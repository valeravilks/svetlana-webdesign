import * as PIXI from "pixi.js";
let imgg = require('./../img/gradient4.png');
import {ReflectionFilter} from '@pixi/filter-reflection';

export default class{
    constructor(id) {
        let posX = 0;



        let objImage = document.getElementById(id);
        let urlImage = objImage.src;
        console.log(urlImage);
        let app = new PIXI.Application({
            width: objImage.offsetWidth,
            height: objImage.offsetHeight
        });

        let el = objImage.parentNode.appendChild(app.view);

        objImage.remove();

        el.addEventListener('mousemove', (e) => {
            posX = e.offsetX;
        });

        app.loader.add("image", urlImage).add("image2", 'img/gradient4.png').load((loader, resources) => {
            console.log('load finish')
            let displacementSprite = new PIXI.Sprite(resources.image.texture);
            let img2 = new PIXI.Sprite.from(resources.image2.texture);

            let displacementFilter = new ReflectionFilter();
            displacementFilter.mirror = false;
            displacementFilter.animation = true;
            displacementFilter.boundary = 0;
            displacementFilter.amplitude = [1,1];
            displacementFilter.amplitude.waveLength = [50, 50];
            displacementSprite.filters = [displacementFilter];
            app.stage.addChild(displacementSprite);

            app.ticker.add(()=> {
                if(displacementFilter.time == 20){
                    displacementFilter.time = 0;
                } else {
                    displacementFilter.time += 0.05;
                }


            });
        });
    }
}