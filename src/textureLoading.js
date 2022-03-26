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

console.log(PIXI.utils.TextureCache);

//pixi manage texture by texure cache => PIXI.utils.TextureCache
let loader = new PIXI.Loader();
loader = PIXI.Loader.shared; //created instaitateion
// loader.onComplete.add(lc);

let img;

const loaderManager = () => {
	console.log(loader);
	let texture0 = loader.resources['mask'].texture;

	img = new PIXI.Sprite(texture0);
	img.anchor.x = 0.5;
	img.anchor.y = 0.5;
	app.stage.addChild(img);
	app.ticker.add(animate);
};

loader
	.add('mask', '/jpeg/mask.jpeg')
	.on('progress', (load, res) => console.log(load.progress + 'he'))
	.load(loaderManager);

const animate = () => {
	img.x = app.renderer.screen.width / 2;
	img.y = app.renderer.screen.height / 2;
	img.rotation += 0.1;
};
