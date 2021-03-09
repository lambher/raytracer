export default class Ray {
    constructor(a, b) {
        this.a = [a.x, a.y, a.z];
        this.b = [b.x, b.y, b.z];
    }

    sub(point) {
        const a = this.a;
        return [a[0] - point[0], a[1] - point[1], a[2] - point[2]];
    }

    direction() {
        const a = this.a;
        const b = this.b;
        return [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    }
}