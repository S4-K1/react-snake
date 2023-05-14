import { useState, useCallback } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }));
    };

    const rotate = (tetro, dir) => {
        // Make the rows become columns
        const rotatedTetro = tetro.map((_, index) => 
            tetro.map(col => col[index]));
        // Reverse each row
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage, dir) => {
        const playerClone = JSON.parse(JSON.stringify(player));
        playerClone.tetromino = rotate(playerClone.tetromino, dir);

        //Prevents the rotated tetromino from rotating outside of the game area
        const pos = playerClone.pos.x;
        let offset = 1;

        //Wiggles the clone left and right to check for any potential collisions
        while(checkCollision(playerClone, stage, { x: 0, y: 0})) {
            playerClone.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1: -1));
            if (offset > playerClone.tetromino[0].length) {
                rotate(playerClone.tetromino, -dir);
                playerClone.pos.x = pos;
                return;
            }
        };

        setPlayer(playerClone);
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        });
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}