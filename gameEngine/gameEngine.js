// Game class
class Game {

    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.sprites = [];
        this.score = 0; //initialize score to 0
        this.lives = 3; //initialize lives to 3
        this.currentInterval;
        this.startTime;
    }

    update() {
        var bricksLeft = false;
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];
            sprite.update(this.sprites);
            if (sprite instanceof Brick && !sprite.isBroken) {
                bricksLeft = true;
            }
        }
        if (!bricksLeft) {
            this.reset();
        }
    }

    draw() {
        //clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draw the sprites
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].draw(this.ctx);
        }

        //draw the score and lives
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "blue";
        this.ctx.fillText("Score: " + this.score, 8, 20);
        this.ctx.fillText("Lives: " + this.lives, this.canvas.width - 65, 20);
    }

    addSprite(pSprite) {
        this.sprites.push(pSprite);
    }

    removeSprite(pSprite) {
        const index = this.sprites.indexOf(pSprite);
        if (index > -1) {
            this.sprites.splice(index, 1);
        }
    }

    incrementScore() {
        this.score++; //increment the score by 1
    }

    loseLife() {
        this.lives--; //decrement the lives by 1

        if (this.lives === 0) {
            this.reset();
        }
        else {
            //reset the position of ball and paddle and continue game
            var paddle = this.sprites[0];
            var ball = this.sprites[1];
            paddle.x = this.canvas.width / 2 - 50;
            ball.x = this.canvas.width / 2;
            ball.y = this.canvas.height - 30;
            ball.vx = ball.speed;
            ball.vy = -ball.speed;
        }


        //iterate through sprites and keep those that are not bullets or powerups
        var toDelete = [];
        for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i] instanceof Bullet || this.sprites[i] instanceof Powerup)
                toDelete.push(this.sprites[i]);
        }
        for (var i = 0; i < toDelete.length; i++) {
            var index = this.sprites.indexOf(toDelete[i]);
            this.sprites.splice(index, 1);
        }
    }

    reset() {
        //reset score and lives to initial value
        this.score = 0;
        this.lives = 3;

        //reposition the paddle and ball to initial position
        var paddle = this.sprites[0];
        var ball = this.sprites[1];
        this.sprites = [];
        this.addSprite(paddle);
        this.addSprite(ball);
        paddle.x = this.canvas.width / 2 - 50;
        ball.x = this.canvas.width / 2;
        ball.y = this.canvas.height - 30;
        ball.vx = ball.speed;
        ball.vy = -ball.speed;
        createBricks();


    }

}

// Sprite class
class Sprite {
    constructor() {

    }

    update() {

    }

    draw(ctx) {

    }
}

// Brick class
class Brick extends Sprite {
    constructor(x, y, width, height, color) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isBroken = false;
    }

    update() {

    }

    draw(ctx) {
        if (!this.isBroken) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    hit() {
        if (!this.isBroken) {
            this.isBroken = true;

            // 25% chance of creating a powerup
            if (Math.random() < 0.25) {
                var powerup = new Powerup(this.x + this.width / 2, this.y + this.height / 2, 10, "green", 1);
                myGame.addSprite(powerup);
            }

            myGame.removeSprite(this);
        }
    }
}

// Ball class
class Ball extends Sprite {
    constructor(x, y, radius, color, speed) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.vx = speed;
        this.vy = -speed;
    }

    update(sprites) {
        this.x += this.vx;
        this.y += this.vy;

        //check for collision with the walls
        if (this.x - this.radius < 0 || this.x + this.radius > myGame.canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y - this.radius < 0) {
            this.vy = -this.vy;
        }
        //check for collision with the bottom of canvas
        if (this.y + this.radius > myGame.canvas.height) {
            myGame.loseLife(); // lose a life
        }

        //check for collision with the paddle
        var paddle = sprites[0];
        if (this.y + this.radius > paddle.y && this.x > paddle.x && this.x < paddle.x + paddle.width) {
            if (this.vy > 0)
                this.vy = -this.vy;
        }

        //check for collision with the bricks
        for (var i = 2; i < sprites.length; i++) {
            if (!(sprites[i] instanceof Brick))
                continue;
            var brick = sprites[i];
            if (!brick.isBroken && this.y - this.radius < brick.y + brick.height && this.x > brick.x && this.x < brick.x + brick.width) {
                brick.hit();
                this.vy = -this.vy;
                myGame.incrementScore();
                break;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// Paddle class
class Paddle extends Sprite {
    constructor(x, y, width, height, color, speed) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    update() {
        if (myGame.keys && myGame.keys[37]) {
            //left arrow key
            this.x -= this.speed;
            if (this.x < 0) {
                this.x = 0;
            }
        }
        if (myGame.keys && myGame.keys[39]) {
            //right arrow key
            this.x += this.speed;
            if (this.x + this.width > myGame.canvas.width) {
                this.x = myGame.canvas.width - this.width;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Powerup extends Sprite {

    constructor(x, y, radius, color, speed) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.vy = speed;
    }

    update(sprites) {
        this.y += this.vy;
        if (this.y - this.radius > myGame.canvas.height) {
            myGame.removeSprite(this);
            return;
        }
        //check for collision with the paddle
        var paddle = sprites[0];
        if (this.y + this.radius > paddle.y && this.x > paddle.x && this.x < paddle.x + paddle.width) {
            myGame.removeSprite(this); //remove the powerup sprite

            //add bullet sprite to the game
            clearInterval(myGame.currentInterval);
            myGame.addSprite(new Bullet(paddle.x + paddle.width / 2, paddle.y));
            myGame.startTime = Date.now(); //save start time
            myGame.currentInterval = setInterval(() => {
                myGame.addSprite(new Bullet(paddle.x + paddle.width / 2, paddle.y));
                if (Date.now() - myGame.startTime >= 2500) {
                    clearInterval(myGame.currentInterval);
                }
            }, 250); //end interval after 0.25s
        }
    }


    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Bullet extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 15;
        this.speed = 3;
    }

    update(sprites) {
        this.y -= this.speed;

        //check for collisions
        for (var i = 2; i < sprites.length; i++) {
            if (!(sprites[i] instanceof Brick))
                continue;
            var brick = sprites[i];
            if (!brick.isBroken && this.y < brick.y + brick.height && this.x > brick.x && this.x < brick.x + brick.width) {
                myGame.removeSprite(this);
                brick.hit();
                myGame.incrementScore();
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}


var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

//game
var myGame = new Game();

//create the paddle
var paddle = new Paddle(myGame.canvas.width / 2 - 50, myGame.canvas.height - 20, 100, 10, "blue", 7);
myGame.addSprite(paddle);

//create the ball
var ball = new Ball(myGame.canvas.width / 2, myGame.canvas.height - 30, 10, "red", 4);
myGame.addSprite(ball);

//create the bricks
var brickRows = 6;
var brickCols = 10;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 20;


function createBricks() {
    for (var c = 0; c < brickCols; c++) {
        for (var r = 0; r < brickRows; r++) {
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            var brickColor = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
            var brick = new Brick(brickX, brickY, brickWidth, brickHeight, brickColor);
            myGame.addSprite(brick);
        }
    }
}

//keyboard input
myGame.keys = [];
document.addEventListener("keydown", function (e) {
    myGame.keys[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
    myGame.keys[e.keyCode] = false;
});

//game loop
createBricks();
function gameEngineLoop() {
    myGame.update();
    myGame.draw();
    requestAnimFrame(gameEngineLoop);
}

gameEngineLoop();
