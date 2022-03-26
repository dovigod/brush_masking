import * as PIXI from 'pixi.js';

const canvas = document.getElementById('webgl');

const screenSize = {
	width: window.innerWidth,
	height: window.innerHeight
};
const app = new PIXI.Application({
	view: canvas,
	width: screenSize.width,
	height: screenSize.height,
	resolution: window.devicePixelRatio
});

let graphic = new PIXI.Graphics();
graphic.position.x = app.renderer.screen.width / 2;
graphic.position.y = app.renderer.screen.height / 2;
app.stage.addChild(graphic);
let rad = 50;

//
graphic.lineStyle(5, 0x00ff00);
graphic.beginFill(0xff00000);
// graphic.drawCircle(0, 0, 100);
// graphic.drawRect(0, 0, 100, 200);
// graphic.drawPolygon([new PIXI.Point(100, 100), new PIXI.Point(100, 200), new PIXI.Point(200, 100)]);

// graphic.moveTo(0, 0);
// graphic.lineTo(100, 100);
// graphic.lineTo(100, 200);
// graphic.lineTo(0, 200);
// graphic.bezierCurveTo(-200, 200, -200, 100, -100, 0);
// graphic.quadraticCurveTo()

graphic.arc(0, 0, rad, 0, Math.PI * 2);
graphic.closePath();
graphic.endFill();

let delta = 0;
const animate = () => {
	delta += 0.1;
	rad = 50 + Math.sin(delta) * 25;

	graphic.clear();
	graphic.beginFill(0xff0000);
	graphic.arc(0, 0, rad, 0, Math.PI * 2);
	// graphic.closePath();
	graphic.endFill();
};
app.ticker.add(animate);
