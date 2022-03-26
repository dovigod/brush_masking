import './style.scss';
import * as PIXI from 'pixi.js';

const canvas = document.getElementById('webgl');

const screenSize = {
	width: window.innerWidth,
	height: window.innerHeight
};
let brushWidth = 40;

canvas.width = screenSize.width;
canvas.height = screenSize.height;
const app = new PIXI.Application({
	view: canvas,
	width: screenSize.width / 2,
	height: screenSize.height / 2,
	resolution: window.devicePixelRatio
});

// const brush = new PIXI.Graphics();
// brush.beginFill(0xffffff);
// brush.drawCircle(0, 0, 50);
// brush.endFill();
const brushTexture = PIXI.Texture.from('/png/bristle1.png');
const brushTexture2 = PIXI.Texture.from('/png/bristle2.png');
const brush = new PIXI.Sprite(brushTexture);
const brush2 = new PIXI.Sprite(brushTexture2);

brush.width = brushWidth;
brush.height = 80;

brush2.width = brushWidth;
brush2.height = 80;

console.dir(brush);

const backgroundTexture = PIXI.Texture.from('/jpeg/mask.jpeg');

const background = new PIXI.Sprite(backgroundTexture);
background.x = app.renderer.screen.width / 2;
background.y = app.renderer.screen.height / 2;
background.anchor.x = 0.5;
background.anchor.y = 0.5;

const Mask = new PIXI.Sprite(PIXI.Texture.WHITE);
Mask.width = app.renderer.screen.width;
Mask.height = app.renderer.screen.height;
Mask.x = app.renderer.screen.width / 2;
Mask.y = app.renderer.screen.height / 2;
Mask.anchor.x = 0.5;
Mask.anchor.y = 0.5;

app.stage.addChild(background);

const renderTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height);

const renderTextureSprite = new PIXI.Sprite(renderTexture);
app.stage.addChild(renderTextureSprite);

background.mask = renderTextureSprite;

app.stage.interactive = true;
app.stage.on('pointerdown', pointerDown);
app.stage.on('pointerup', pointerUp);
app.stage.on('pointermove', pointerMove);

let dragging = false;
let bristle2Render = false;
function pointerMove(event) {
	if (dragging) {
		brush.position.copyFrom(event.data.global);
		// brushWidth += 0.5;
		// brush.width = brushWidth;

		if(!bristle2Render){
			setTimeout(()=> bristle2Render = true, 500);
		}
		

		app.renderer.render(brush, renderTexture, false, null, false);
		if(bristle2Render){
			brush2.position.copyFrom(event.data.global);
			app.renderer.render(brush2 , renderTexture , false ,null , false);
		}

		// if (brush.width === 100) {
		// 	dragging = false;
		// 	brushWidth = 0;
		// }
	}
}

function pointerDown(event) {
	dragging = true;
	pointerMove(event);
}

function pointerUp(event) {
	dragging = false;
	bristle2Render = false;
}
// let delta = 0;
// const animate = () => {
// 	delta += 0.01;
// };

// app.ticker.add(animate);
