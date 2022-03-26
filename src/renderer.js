import * as PIXI from 'pixi.js';

const screenSize = {
	width: window.innerWidth,
	height: window.innerHeight
};

const init = () => {
	const canvas = document.getElementById('webgl');

	const renderer = new PIXI.Renderer({
		view: canvas,
		width: screenSize.width,
		height: screenSize.height,
		resolution: window.devicePixelRatio,
		autoDensity: true
	});

	const stage = new PIXI.Container();
	const texture = PIXI.Texture.from('/jpeg/mask.jpeg');
	const img = new PIXI.Sprite(texture);

	img.x = renderer.width / 4;
	img.y = renderer.height / 4;

	img.anchor.x = 0.5;
	img.anchor.y = 0.5;
	stage.addChild(img);
	const animate = () => {
		img.x = renderer.screen.width / 2;
		img.y = renderer.screen.height / 2;
		img.rotation += 0.1;
		renderer.render(stage);
	};

	const ticker = new PIXI.Ticker();
	ticker.add(animate);
	ticker.start();

	window.addEventListener('resize', () => {
		screenSize.width = window.innerWidth;
		screenSize.height = window.innerHeight;

		renderer.resize(screenSize.width, screenSize.height);
	});
};

export default init;
