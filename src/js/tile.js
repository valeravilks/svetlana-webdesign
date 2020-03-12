import './pixi.min.js';
let img = require('./../img/ripple.png');
let img2 = require('./../img/main-page/artguide.jpg');

export default class {
    constructor(el) {
        var app = new PIXI.Application(el.offsetWidth, el.offsetHeight);
        el.parentElement.appendChild(app.view);
        el.remove();

        app.stage.interactive = true;
        var posX, displacementSprite, displacementFilter, bg, vx;
        var container = new PIXI.Container();
        app.stage.addChild(container);

        PIXI.loader.add(img).add(img2).load(setup);

        function setup() {
            posX = app.renderer.width / 2;
            displacementSprite = new PIXI.Sprite(PIXI.loader.resources[img].texture);
            displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
            displacementSprite.anchor.set(0.5);
            displacementSprite.x = app.renderer.width / 2;
            displacementSprite.y = app.renderer.height / 2;
            vx = displacementSprite.x;

            // To finish off the ‘setup’ function, the displacement filter scale is set and the background positioned.
            // Notice the scale is ‘0’ for the displacement, that’s because it will be set to a height as soon as the mouse moves.

            app.stage.addChild(displacementSprite);
            container.filters = [displacementFilter];
            displacementFilter.scale.x = 0;
            displacementFilter.scale.y = 0;
            bg = new PIXI.Sprite(PIXI.loader.resources[img2].texture);
            bg.width = app.renderer.width;
            bg.height = app.renderer.height;
            container.addChild(bg);
            app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove);
            loop();
        }

        function onPointerMove(eventData) {
            posX = eventData.data.global.x;
        }

        function loop() {
            requestAnimationFrame(loop);
            vx += (posX - displacementSprite.x) * 0.045;
            displacementSprite.x = vx;
            var disp = Math.floor(posX - displacementSprite.x);
            if (disp < 0) disp = -disp;
            var fs = map(disp, 0, 500, 0, 120);
            disp = map(disp, 0, 500, 0.1, 0.6);
            displacementSprite.scale.x = disp;
            displacementFilter.scale.x = fs;
        }

        let map = function(n, start1, stop1, start2, stop2) {
            var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
            return newval;
        };
    }
}