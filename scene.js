import Color from "./color.js";

class Object {

    constructor() {
        this.color = new Color(255, 0, 0, 255);
    }

    colides(ray) {
        throw new Error('Not implemented');
    }
}

class Sphere extends Object {
    constructor(x, y, z, rayon, color) {
        super();
        this.center = [x, y, z];

        this.rayon = rayon;
        this.color = color;
    }

    colides(ray) {
        const oc = ray.sub(this.center);

        const a = math.dot(ray.direction(), ray.direction());
        const b = 2.0 * math.dot(oc, ray.direction());
        const c = math.dot(oc, oc) - this.rayon * this.rayon;
        const delta = b * b - 4 * a * c;


        return delta >= this.rayon;
    }
}

export default class Scene {
    constructor() {
        this.objects = [];
    }

    addObject(object) {
        this.objects.push(object);
    }

    addSphere() {
        const red = new Color(255, 0, 0, 255);
        const green = new Color(0, 255, 0, 255);
        this.objects.push(new Sphere(0, 0, 1000, 100, red));
        this.objects.push(new Sphere(0, 100, 1000, 100, green));
    }

    getColor(ray) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].colides(ray)) {
                return this.objects[i].color;
            }
        }

        return new Color(0, 0, 0, 255);
    }

}
