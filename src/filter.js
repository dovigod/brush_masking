import * as PIXI from 'pixi.js';

const canvas = document.getElementById('webgl');

const app = new PIXI.Application({
	view: canvas,
	width: window.innerWidth,
	height: window.innerHeight * 3,
	resolution: window.devicePixelRatio
});
let scrollTop = 0;
const texture = PIXI.Texture.from('/jpeg/mask.jpeg');
const img = new PIXI.Sprite(texture);
img.x = app.screen.width / 2;
img.y = app.screen.height / 2;
img.anchor.x = 0.5;
img.anchor.y = 0.5;
console.dir(img);
img.transform.scale.set(3, 3);
const vertextShader = `
precision mediump float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat3 projectionMatrix;
varying vec2 vTextureCoord;
void main(void)
{
	gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
	vTextureCoord = aTextureCoord;
}
`;

const fragmentShader = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float delta;
void main(void){
    vec4 color = texture2D(uSampler , vTextureCoord);
    if (color.a != 0.0){
		color.r = color.r * delta;
		color.g =  color.g - delta;
		color.g = color.g + delta;
		color.b = color.b / delta;
		color.a = delta / 1000.0;
    }
    gl_FragColor = color * 1.0;
}       
`;
//진짜 세미콜론 조심하자 씨ㅣ씽이이ㅣ발
const uniforms = {
	delta: 0
};

//vShader = new PIXI.filters.AbstractFilter().vertexSrc;
const myFilter = new PIXI.Filter(vertextShader, fragmentShader, uniforms);

//img.filters = [new PIXI.filters.BlurFilter()];
img.filters = [myFilter]; //can add multiple filters in one obj

app.stage.addChild(img);

app.ticker.add(animate);

let delta = 0;
function animate() {
	delta += 0.05;
	img.position.x = app.renderer.screen.width / 2;
	img.position.y = app.renderer.screen.height / 2;

	const normalizeScroll = (5 * scrollTop) / document.scrollingElement.scrollHeight;
	console.log(normalizeScroll);
	uniforms.delta = Math.sin(normalizeScroll);
	// * 0.5 + Math.cos(normalizeScroll) * Math.sin(normalizeScroll);
	//img.rotation += 0.1;
}

document.addEventListener('scroll', (e) => {
	scrollTop = document.scrollingElement.scrollTop;
});
