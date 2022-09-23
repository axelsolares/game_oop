import ColisionDetector from "../ColisionDetector.js";

export default {
    handleColision(paddle, element) {
        if (ColisionDetector.isColision(paddle, element)) {
            element.dy = -element.dy;
        }
    }
}