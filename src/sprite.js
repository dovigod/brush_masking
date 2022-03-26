import './style.scss';

import * as PIXI from 'pixi.js';

const canvas = document.getElementById('webgl');
const screenSize = {
	width: window.innerWidth,
	height: window.innerHeight
};

const app = new PIXI.Application({
	view: canvas,
	width: screenSize.width,
	height: screenSize.height
});

const texture = PIXI.Texture.from('/jpeg/mask.jpeg');
const texture1 = PIXI.Texture.from('/svg/goog.svg');

let sprite1, sprite2, sprite3;

const img = new PIXI.Sprite(texture);
img.x = app.renderer.screen.width / 2;
img.y = app.renderer.screen.height / 2;
img.anchor.x = 0.5;
img.anchor.y = 0.5;

//root gropuing object
let container = new PIXI.Container();
app.stage.addChild(container);

sprite1 = new PIXI.Sprite(texture1);
sprite1.y = 100;

sprite1.position.set(app.renderer.screen.width / 2, app.renderer.screen.height / 2);
sprite2 = new PIXI.Sprite(texture1);
sprite2.x = 100;
sprite2.y = 100;
sprite2.tint = 0xff0000;
sprite2.alpha = 0.6;

sprite3 = new PIXI.Sprite(texture1);
sprite3.x = 200;
sprite3.y = 100;
// sprite3.anchor.set(0.5);
sprite3.pivot.set(300, 0); //pivot중심으로

container.addChild(sprite1);
container.addChild(sprite2);
container.addChild(sprite3);
app.stage.addChild(img);

let delta = 0;
const animate = () => {
	delta += 0.1;
	sprite1.y = 100 + Math.sin(delta) * 100;
	// sprite1.alpha = Math.sin(delta);
	sprite2.x = 100 + Math.sin(delta) * 100;
	sprite3.scale = new PIXI.Point(0.5, 0.5);
	sprite3.rotation += 0.1;

	img.blendMode = PIXI.BLEND_MODES.ADD;
	// sprite1.visible

	sprite1.interactive = true;
	sprite1.buttonMode = true;

	// sprite1.mask = img;
};

app.ticker.add(animate);
