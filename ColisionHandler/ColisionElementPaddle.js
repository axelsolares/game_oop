import ColisionDetector from "../colisionDetector.js";

export default {
    handleColision(paddle, element) {
        if (ColisionDetector.isColision(paddle, element)) {
            element.dy = -element.dy;
        }
    }
}