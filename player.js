var boardSize = 400
var phalf = 20

var fishImage = new Image();
fishImage.src = "fishsalmon_parts.png";

var player = {
      x: boardSize/2,
      y: boardSize/2,
      w: 2*phalf,
      h: 2*phalf,
      speed: 7,
      health: 5
    };

var spriteWidth = 225;
var spriteHeight = 89;

var rows = 2;
var cols = 5;

var trackRight = 1;
var trackLeft = 0;

var fWidth = spriteWidth/cols;
var fHeight = spriteHeight/rows;

var curFrame = 0;
var frameCount = 5;

var srcX = 0;
var srcY = 0;

var left = false;
var right = true;

function updateFrame(){
    curFrame = ++curFrame % frameCount;
    srcX = curFrame*fWidth;
    
    if (left) {
        srcY = trackLeft * fHeight;
    }
    
    if (right) {
        srcY = trackRight * fHeight;
    }
}

function draw(context) {
    var x = player.x - (player.w/2);
    var y = player.y - (player.h/2);
    
    context.drawImage(fishImage, srcX, srcY, fWidth, fHeight, x, y, fWidth, fHeight);
};

function movePlayer(direction) {
        switch (direction) {
            case "left":
                player.x -= player.speed;
                if (player.x < (player.w/2)){
                    player.x = (player.w/2)
                }
                left = true;
                right = false;
                updateFrame();
                break;
            case "up":
                player.y -= player.speed;
                if (player.y < (player.h/2)){
                    player.y = (player.h/2)
                }
                updateFrame();
                break;
            case "right":
                player.x += player.speed;
                if (player.x > 400 - (player.w/2)){
                    player.x = 400 - (player.w/2)
                }
                right = true;
                left = false;
                updateFrame();
                break;
            case "down":
                player.y += player.speed;
                if (player.y > 400 - (player.h/2)){
                    player.y = 400 - (player.h/2)
                }
                updateFrame();
                break;
        }
}

function changeSpeed(amount, type) {
        switch (type) {
            case "faster":
                player.speed = player.speed + amount
                break;
            case "slower":
                player.speed = player.speed - amount
                if (player.speed < 1) {
                    player.speed = 1;
                }
                break;
        }
}

function drawControls(context) {
    var xf = 350;
    var y = 0;
    var xs = 375;
    var w = 25;
    var h = 20;
    context.fillStyle = '#FFFFFF';
    context.fillRect(
        xf,
        y,
        w,
        h
    );
    context.fillStyle = '#000000';
    context.fillRect( 
        xs,
        y,
        w,
        h
    );
    context.font = '20px Verdana';
    context.fillStyle = '#FFFFFF';
    context.fillText("-", 383, 15);
    context.font = '20px Verdana';
    context.fillStyle = '#000000';
    context.fillText("+", 355, 15);
    
};

function drawGameOver(context) {
    context.fillStyle = '#33C8E0';
    context.fillRect(
        100,
        100,
        200,
        100
    );
    context.font = '30px Verdana';
    context.fillStyle = '#FFFFFF';
    context.fillText("Game Over", 117, 155);
}

function reset() {
    player.x = canvas.width/2,
    player.y = canvas.height/2,
    player.w = 40,
    player.h = 40,
    player.speed = 8
}
