

var enemies = [];
var half = 20

var baddieImage = new Image();
baddieImage.src = "fishbaddies_parts.png";

var spriteWidth = 215;
var spriteHeight = 87;

var rowsB = 2;
var colsB = 5;

var trackRightB = 1;
var trackLeftB = 0;

var fWidthB = spriteWidth/cols;
var fHeightB = spriteHeight/rows;

var curFrameB = 0;
var frameCountB = 5;

var srcXB = 0;
var srcYB = 0;

var leftB = false;
var rightB = true;

function updateFrameB(){
    curFrameB = ++curFrameB % frameCountB;
    srcXB = curFrameB*fWidthB;
    
    if (leftB) {
        srcYB = trackLeftB * fHeightB;
    }
    
    if (rightB) {
        srcYB = trackRightB * fHeightB;
    }
}


function drawEnemy(context, i) {
    var xB = enemies[i].x - (enemies[i].w/2);
    var yB = enemies[i].y - (enemies[i].h/2);
    context.drawImage(baddieImage, srcXB, srcYB, fWidthB, fHeightB, xB, yB, fWidthB, fHeightB);
};

function getRandom(min, max) {
    return Math.floor(Math.random() * max + min);
};

function create() {
    var X = getRandom(20, 400 - 40);
    var Y = getRandom(20, 400 - 40);
    var SPEED = getRandom(1, 4);
    var DIRECTION = getRandom(0, 4);
    var enemy = {
      x: X,
      y: Y,
      w: 2*half,
      h: 2*half,
      speed: SPEED,
      direction: DIRECTION
    };

    var overlap = false;
    
    if (enemies.length > 0) {
        for(var i = 0; i < enemies.length ; i ++){
            if(enemy.x <= enemies[i].x + enemies[i].w && enemy.x + enemy.w >= enemies[i].x && enemy.y <= enemies[i].y + enemies[i].h && enemy.y + enemy.h >= enemies[i].y || 
               (enemy.x <= player.x + player.w && enemy.x + enemy.w >= player.x && enemy.y <= player.y + player.h && enemy.y + enemy.h >= player.y)) {
                overlap = true;
            };
        };
    };
    if(overlap) {
        create();
    } else {
        enemies.push(enemy);
    };
};

function createAll(amount,ctx) {
    for(i = 0; i < amount; i++ ) {
        create();
        drawEnemy(ctx, i);
    };
};

function drawAll(ctx) {
    for(i = 0; i < enemies.length; i++ ) {
        drawEnemy(ctx, i);
    };
}

function changeDirections() {
    for(i = 0; i < enemies.length; i++ ) {
        enemies[i].direction = getRandom(0,4);
    };
}

function changeToOpposite(direction) {
    switch(direction) {
        case 0:
            return 2;
            break;
        case 1:
            return 3;
            break;
        case 2:
            return 0;
            break;
        case 3:
            return 1;
            break;
    }
}

function isCollapse(enemy, context) {
    for(i = 0; i < enemies.length; i++ ) {
        if (enemy.x === enemies[i].x && enemy.y === enemies[i].y) {
        } else if (enemy.x + half >= enemies[i].x - half && enemy.x - half <= enemies[i].x + half && enemy.y + half >= enemies[i].y - half && enemy.y - half <= enemies[i].y + half) {
            enemy.direction = changeToOpposite(enemy.direction);
            enemies[i].direction = changeToOpposite(enemies[i].direction);
        } else if (enemy.x + half >= player.x - phalf && enemy.x - half <= player.x + phalf && enemy.y + half >= player.y - phalf && enemy.y - half <= player.y + phalf) {
                player.speed = 0;
        }
    };
}

function move(enemy) {
        switch (enemy.direction) {
            case 0:
                enemy.x -= enemy.speed
                if (enemy.x < (enemy.w/2)){
                    enemy.x = (enemy.w/2)
                } 
                leftB = true;
                rightB = false;
                updateFrameB();
                break;
            case 1:
                enemy.y -= enemy.speed
                if (enemy.y < (enemy.h/2)){
                    enemy.y = (enemy.h/2)
                }
                updateFrameB();
                break;
            case 2:
                enemy.x += enemy.speed
                if (enemy.x > canvas.width - (enemy.w/2)){
                    enemy.x = canvas.width - (enemy.w/2)
                }
                leftB = false;
                rightB = true;
                updateFrameB();
                break;
            case 3:
                enemy.y += enemy.speed
                if (enemy.y > canvas.height - (enemy.h/2)){
                    enemy.y = canvas.height - (enemy.h/2)
                }
                updateFrameB();
                break;
        };
        isCollapse(enemy);
    
};

function resetEnemies() {
    enemies.empty;
}

