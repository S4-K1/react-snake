export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {

            // 1. Check that we're on a tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if (
                    // Check that move is inside the game area's height (y)
                    // Shouldn't go through the bottom area
                    !stage[y + player.pos.y + moveY] ||
                    // Check that move is inside the game area's width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // Check that the cell player is moving to isn't clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
    //If all above is false
    return false;
};