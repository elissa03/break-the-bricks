# Breakout-Style Game Project

## Overview
This project is a JavaScript-based game similar to the classic Breakout. The game features a ball, a paddle, and bricks that the player must break by bouncing the ball off the paddle. 

## Features
- A paddle controlled by the player to bounce the ball.
- Bricks of various colors that break when hit by the ball.
- Score tracking based on the number of bricks broken.
- Lives system where the player loses a life if the ball misses the paddle.
- Powerups that appear randomly when bricks are broken.

## Classes and Functionality
### Game Class
- Manages the game canvas, score, lives, and game sprites.
- Handles game updates and draws the game state on the canvas.
- Resets the game when all bricks are broken or lives are lost.

### Sprite Class
- Base class for all game objects.

### Brick Class
- Represents the bricks to be broken by the ball.
- Handles brick color and break status.

### Ball Class
- Represents the ball object.
- Handles ball movement, collision with walls, paddle, and bricks.

### Paddle Class
- Represents the paddle controlled by the player.
- Handles paddle movement based on keyboard input.

### Powerup Class
- Appears randomly when bricks are broken.
- Provides temporary enhancements when caught by the paddle.

### Bullet Class
- Represents bullets fired during certain powerups.
- Handles bullet movement and collision with bricks.

## Setup
To run the game, load the HTML file with the canvas element (`<canvas id="myCanvas"></canvas>`) in a web browser. Ensure that the JavaScript file containing the game code is properly linked.

## Controls
- Use the Left and Right arrow keys to move the paddle.
- The ball will automatically launch and bounce off the paddle and walls.

## Development
Developers can modify the game by altering the JavaScript classes. This includes changing game mechanics, adding new powerups, or altering the appearance and behavior of game objects.

Enjoy this modern twist on a classic game!
