import Scene from "./scene.js"
import Ray from "./ray.js"
import Color from "./color.js"

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const width = 500;
const height = 500;



class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Raytracer {

    constructor(ctx) {
        this.imageData = ctx.createImageData(width, height);
        this.scene = new Scene();
        this.scene.addSphere();

        for (let i = 0; i < this.imageData.data.length; i += 4) {
            const line = Math.trunc(i / 4 / width);
            const column = Math.trunc(i / 4);

            this.imageData.data[i + 0] = 0;
            this.imageData.data[i + 1] = 0;
            this.imageData.data[i + 2] = 0;
            this.imageData.data[i + 3] = 255;
        }

        const color = new Color(0, 255, 0, 255);
        this.setColor(0, 0, color);
    }


    refreshRaycasting() {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.refreshPixel(x, y);
            }
        }
        console.log("finish");
    }

    refreshPixel(x, y) {
        const camPosition = new Point(0, 0, 0);
        const pixelPosition = new Point(camPosition.x - width / 2 + x, camPosition.y - height / 2 + y, width);
        const ray = new Ray(camPosition, pixelPosition);
        const color = this.scene.getColor(ray);
        this.setColor(x, y, color);
    }

    setColor(x, y, color) {
        const curs = y * width * 4 + x * 4;
        this.imageData.data[curs + 0] = color.r;
        this.imageData.data[curs + 1] = color.g;
        this.imageData.data[curs + 2] = color.b;
        this.imageData.data[curs + 3] = color.a;
    }


    draw(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(this.imageData, 0, 0);
    }

    click(x, y, ctx) {
        this.refreshRaycasting();
        // const color = new Color(0, 255, 0, 255);
        // this.setColor(x, y, color);
    }
}

const raytracer = new Raytracer(ctx);

function update(progress) {

}

function draw() {
    raytracer.draw(ctx);
}

function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);

canvas.addEventListener('click', onCanvasClick, false);

function onCanvasClick(ev) {
    var x = ev.clientX;
    var y = ev.clientY;

    raytracer.click(x, y, ctx);
}