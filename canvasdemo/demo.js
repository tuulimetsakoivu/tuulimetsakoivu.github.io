$(document).ready(function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);
    
    var player = {
      x: 200,
      y: 200,
      w: 40,
      h: 40,
      speed: 8
    };
    
    function drawPlayer(context) {
        var x = player.x - (player.w/2);
        var y = player.y - (player.h/2);
        context.fillStyle = '#FFFFFF';
        context.fillRect(
            x, 
            y, 
            player.w,
            player.h);
    }
    
    var keysDown = {};
    
    function movePlayer(direction) {
        switch (direction) {
            case "left":
                player.x -= player.speed
                if (player.x < (player.w/2)){
                    player.x = (player.w/2)
                }
                break;
            case "up":
                player.y -= player.speed
                if (player.y < (player.h/2)){
                    player.y = (player.h/2)
                }
                break;
            case "right":
                player.x += player.speed
                if (player.x > canvas.width - (player.w/2)){
                    player.x = canvas.width - (player.w/2)
                }
                break;
            case "down":
                player.y += player.speed
                if (player.y > canvas.height - (player.h/2)){
                    player.y = canvas.height - (player.h/2)
                }
                break;
        }
    }
    
    window.addEventListener('keydown', function(e) {
        keysDown[e.keyCode] = true;
    });
    
    window.addEventListener('keyup', function(e) {
        delete keysDown[e.keyCode]
    });
    
    var render = function() {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      drawPlayer(ctx);
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
    };
    
    function main() {
        update();
        render();
        requestAnimationFrame(main);
    };
    
    main();
    
})