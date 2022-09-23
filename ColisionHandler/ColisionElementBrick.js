import ColisionDetector from "../ColisionDetector.js";

export default {
    handleColision(brick, element) {
        if (ColisionDetector.isColision(brick, element)) {
            brick.destroyed = true;
            element.dy = -element.dy;
        }
    }
}