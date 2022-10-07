import { canvas, context } from '../canvas.js';
import Element from '../Element.js';
import Brick from '../Brick.js';

export default {
    build(configuration) {
        if(!configuration) {
            return false;
        }

        let bricks = [];
        let balls = [];

        let bricksPerLine = configuration.bricks[0].length;
        let bricksLines = configuration.bricks.length;
        let brickWidth = Math.floor(canvas.width / (bricksPerLine + 1));
        let brickHeight = Math.floor((canvas.height / 2) / (bricksLines + 1));

        for(let i = 0; i < bricksLines; i++) {
            let brickLine = configuration.bricks[i];

            for(let j = 0; j < bricksPerLine; j++) {
                if(!brickLine[j]) {
                    continue;
                }

                let brick = new Brick(context, canvas, { x: brickWidth * j, y: brickHeight * i, h: brickHeight, w: brickWidth });

                bricks.push(brick);
            }
        }

        for(let i = 0; i < configuration.ballAmount; i++) {
            let x = Math.floor(Math.random() * (canvas.width - 20)) + 10;
            let y = Math.floor(Math.random() * (canvas.height - 300)) + 280;
            let ball = new Element(context, canvas, { x: x, y: y, r: 10 });

            balls.push(ball);
        }

        return { bricks, balls };
    }
}