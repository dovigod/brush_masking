import './style.scss';
import * as PIXI from 'pixi.js';
const app = new PIXI.Application({
	width: 800,
	height: 600,
	backgroundColor: 0x1099bb,
	resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

app.loader.add('bg_grass', '/jpeg/mask.jpeg').load(build);

function build() {
	// Create a new texture
	const texture = app.loader.resources.bg_grass.texture;

	// Create the simple plane
	const verticesX = 10;
	const verticesY = 10;
	const plane = new PIXI.SimplePlane(texture, verticesX, verticesY);

	console.dir(plane);
	plane.x = 100;
	plane.y = 100;

	app.stage.addChild(plane);

	// Get the buffer for vertice positions.
	const buffer = plane.geometry.getBuffer('aVertexPosition');

	console.dir(plane.geometry);

	// Listen for animate update
	app.ticker.add((delta) => {
		// Randomize the vertice positions a bit to create movement.
		for (let i = 0; i < buffer.data.length; i++) {
			buffer.data[i] = buffer.data[i] + 0.4 * (Math.random() - 0.5);
		}
		buffer.update();
	});
}
