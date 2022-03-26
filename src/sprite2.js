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

const img = new PIXI.Sprite(texture);
app.stage.addChild(img);

const container = new PIXI.Container();
app.stage.addChild(container);

let sprites = [];
for (let i = 0; i < 10; i++) {
	let sprite = new PIXI.Sprite(texture1);
	sprite.x = Math.random() * app.renderer.screen.width;
	sprite.y = Math.random() * app.renderer.screen.height;
	sprite.anchor.set(0.5);
	sprite.tint = Math.random() * 0xffffff;

	container.addChild(sprite);
}

let delta = 0;
const animate = () => {
	delta += 0.1;
};

app.ticker.add(animate);
