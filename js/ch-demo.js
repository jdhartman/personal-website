(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var philImage = new Image();
philImage.src = "./images/Phil/ChickenSheet.png"



function sprite (options) {
				
    var that = {},
            startFrame = options.startFrame || 0,
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function() {
        
        if (player.velY < 0) {
            startFrame = 4;
            numberOfFrames = 1;   
        }
        else {
            if (player.velX == 0) {
                startFrame = 0;
                numberOfFrames = 2;
            }
            else {
                startFrame = 2;
                numberOfFrames = 2;
            }   
        }

    	tickCount += 1;

        if (tickCount > ticksPerFrame) {

			tickCount = 0;
			
            // If the current frame index is in range
            if (numberOfFrames > 1 && frameIndex < numberOfFrames + startFrame - 1) {	
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = startFrame;
            }
        }
    }

    that.render = function () {

        that.width = numberOfFrames * 64;

    	that.context.clearRect(0,0,width,height);
        // Draw the animation
        that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    player.x,
		    player.y,
		    that.width / numberOfFrames,
		    that.height);
    };

    return that;
}
 
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = $(window).width(),
    height = 230,
    player = {
    	sprite : sprite({
		    context: canvas.getContext("2d"),
		    width:  2 * 64,
		    height: 64,
		    image: philImage,
		    numberOfFrames: 2,
            startFrame: 2,
			ticksPerFrame: 14
		}),
		x : width/2,
		y : height - 5,
		width : 64,
		height : 64,
		speed: 8,
		jumpSpeed: 7.5,
		velX: 0,
		velY: 0,
		jumping: false
    },
    keys = [],
    friction = 0.75,
    gravity = 0.2;
 
canvas.width = width;
canvas.height = height;
 
function update(){
	player.sprite.render();
    player.sprite.update();
  // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
      if(!player.jumping){
       player.jumping = true;
       player.velY = -player.jumpSpeed -Math.abs(player.velX * .03);
      }
    }
    if (keys[39]) {
        philImage.src = "./images/Phil/ChickenSheet.png"
        // right arrow
        if (player.velX < 0) {
        	player.velX += 1.25;
        }
        else if (player.velX < player.speed) {             
            player.velX += .25;         
        }     
    }     
    else if (keys[37]) {         
        // left arrow  
        philImage.src = "./images/Phil/ChickenSheet-flip.png"
        if (player.velX > 0) {
        	player.velX -= 1.25;
        }       
        else if (player.velX > -player.speed) {
            player.velX -= .25;
        }
    }
    else {
    	if (player.velX > 0) {
    		if (player.velX < .26) {
    			player.velX = 0;
    		} 
    		player.velX -= friction;	
    	}
    	else if (player.velX < 0) {
    		if (player.velX > -.26) {
    			player.velX = 0;
    		} 
    		player.velX += friction;
    	}
    	
    }
 
    player.velY += gravity;
 
    player.x += player.velX;
    player.y += player.velY;
 
    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {         
        player.x = 0;     
    }    
  
    if(player.y >= height-player.height){
        player.y = height - player.height;
        player.jumping = false;
    }
 
  //player.sprite.context.fillStyle = "red";
  //player.sprite.context.fillRect(player.x, player.y, player.width, player.height);
 
  requestAnimationFrame(update);
}
 
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    e.preventDefault();
});
 
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    e.preventDefault();
});
 
window.addEventListener("load",function(){
    update();
});