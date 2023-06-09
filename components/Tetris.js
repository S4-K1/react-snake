import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers'

// Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//Custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer); 

    console.log('re-render');

    const movePlayer = dir => {
        // If not colliding, make the move
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const startGame = () => {
        // Reset everything
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    };

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false});
        } else {
            // Game Over
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!")
                setGameOver(true);
                setDropTime(true);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true});
        }
    };

    const dropPlayer = () => {
        drop();
    };

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 65) { //A
                movePlayer(-1);
            } else if (keyCode === 68) { //D
                movePlayer(1);
            } else if (keyCode === 83) { //S
                dropPlayer();
            } else if (keyCode === 69) { //E
                playerRotate(stage, 1);
            } else if (keyCode === 81) { //Q
                playerRotate(stage, -1);
            }
        }
    };

    return (
        <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text='Game Over' />
                    ) : (
                        <div>
                            <Display text='Game Start' />
                            {/* <Display text='Score' />
                            <Display text='Rows' />
                            <Display text='Level' /> */}
                        </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris