$(document).ready(function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.setAttribute("id", "canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);
    
    var keysDown = {};
    var counter = 0;
    
    window.addEventListener('keydown', function(e) {
        keysDown[e.keyCode] = true;
    });
    
    window.addEventListener('keyup', function(e) {
        delete keysDown[e.keyCode];
    });
    
    canvas.addEventListener('click', function(e) {
        var x = e.clientX;
        var y = e.clientY;
        for(i = 0; i < enemies.length; i++) {
            if (x >= enemies[i].x - half && x <= enemies[i].x + half && y >= enemies[i].y - half && y <= enemies[i].y + half) {
                enemies.splice(i, 1);
            };
        };
        if (x >= 350 && x < 375 && y >= 0 && y <= 20) {
            changeSpeed(3, "faster");
        } else if (x >= 375 && x <= boardSize && y >= 0 && y <= 20) {
            changeSpeed(3, "slower");
        }
    });
    
    function resetGame() {
        reset();
        resetEnemies();
        counter = 0;
    }
    
    var render = function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = '#33F0E0';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          drawControls(ctx);
          if (counter % 30 === 0) {
              changeDirections();
          }
          drawAll(ctx);
          draw(ctx);
      if (player.speed === 0) {
          drawGameOver(ctx);
      }
    };
    
    function update() {
        if (37 in keysDown) {
            movePlayer('left');
        }
        if (38 in keysDown) {
            movePlayer('up');
        }
        if (39 in keysDown) {
            movePlayer('right');
        }
        if (40 in keysDown) {
            movePlayer('down');
        }
        if (32 in keysDown) {
            resetGame();
        }
        for (var i = 0; i < enemies.length; i++) {
            move(enemies[i]);
        }
    };
    
    function main() {
        if (counter === 0) {
            createAll(6, ctx);
        }
        update();
        render();
        counter ++;
        requestAnimationFrame(main);
    };
    
    main();
    
});
    