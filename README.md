# break-the-bricks

This is a game implemented using JavaScript and HTML5 canvas. The game consists of breaking bricks by bouncing a ball off a paddle. The player has three lives to complete the game. The Game class is the main class that handles updating and rendering of the game, and it keeps track of the score, lives, sprites, and time. The Sprite class is the base class for all game objects, and it provides the update() and draw() methods that are used by the Game class. The Brick and Ball classes are subclasses of Sprite and provide the behavior for the bricks and the ball. When a brick is hit by the ball, it breaks and disappears from the canvas. There is also a 25% chance of creating a powerup when a brick is hit. The Game class keeps track of all the sprites and handles collision detection. The game is reset when all the bricks are broken or the player loses all their lives.
