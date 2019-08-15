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
        
        //console.log(obstacles);
        that.context.fillStyle = "red";
        //that.context.fillRect(window.width * .2 - 148, window.width * .2 + 100 , obstacles[0].width, obstacles[0].height );

        //that.context.fillRect(window.width * .38, window.width * .2 + 152, obstacles[1].width - 45, obstacles[1].height  );

        if(!player.isPressed) {
            that.context.font = '15px Quicksand';
            that.context.fillStyle = 'white';
            that.context.fillText("Press the arrow keys!", player.x - 30, player.y);
        }
    };

    return that;
}
 
var canvas = document.getElementById("ch-canvas"),
    chOffset = 68,
    ctx = canvas.getContext("2d"),
    width = document.getElementById("ch-canvas").getBoundingClientRect().width,
    height = document.getElementById("ch-canvas").getBoundingClientRect().height,
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
		x : width * .75,
		y : height - 5,
		width : 64,
		height : 64,
		speed: 8,
		jumpSpeed: 7.5,
		velX: 0,
		velY: 0,
        jumping: false,
        isPressed: false
    },
    obstacles = [],
    keys = [],
    friction = 0.75,
    gravity = 0.2;

canvas.width = width;
canvas.height = height;

console.log(canvas.width);
 
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
      player.isPressed = true;
    }
    if (keys[39]) {
        philImage.src = "./images/Phil/ChickenSheet.png"
        // right arrow
        if(rightCollision()) {
            player.velX = 0;
        }
        else if (player.velX < 0) {
        	player.velX += 1.25;
        }
        else if (player.velX < player.speed) {             
            player.velX += .25;         
        } 
        player.isPressed = true;    
    }     
    else if (keys[37]) {         
        philImage.src = "./images/Phil/ChickenSheet-flip.png"
        // left arrow  
        if(leftCollision()) {
            player.velX = 0;
        }
        else if (player.velX > 0) {
        	player.velX -= 1.25;
        }       
        else if (player.velX > -player.speed) {
            player.velX -= .25;
        }
        player.isPressed = true;
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

    if(bottomCollision()) {
        player.velY = 0;
        player.jumping = false;
    }

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

function rightCollision() {
    //window.width * .38, 238, obstacles[1].width - 45, obstacles[1].height 
    //window.width * .2 - 148, 180, obstacles[0].width, obstacles[0].height
    if(
        player.y + player.height > window.width * .2 + 152 &&
        player.x + player.width > window.width * .38 &&
        player.x < window.width * .38 + obstacles[1].width - 45
    ) {
        player.x = window.width * .38 - player.width - 1;
        console.log("right");
        return true;
    }
    else if(
        player.y + player.height > window.width * .2 + 100 &&
        player.x + player.width > window.width * .2 - 148 &&
        player.x < window.width * .2 - 148 + obstacles[0].width
    )  {
        player.x = window.width * .2 - 149 - player.width;
        console.log("right2");
        return true;
    }
    else {
        return false;
    }
}

function leftCollision() {
    if(
        player.y + player.height > window.width * .2 + 152 &&
        player.x + player.width > window.width * .38 &&
        player.x < window.width * .38 + obstacles[1].width - 45
    )
    {
        console.log("left");
        player.x = window.width * .38 + obstacles[1].width - 44;
        return true;
    }
    else if(
        player.y + player.height > window.width * .2 + 100 &&
        player.x + player.width > window.width * .2 - 148 &&
        player.x < window.width * .2 - 148 + obstacles[0].width
    ) {
        console.log("left");
        player.x = window.width * .2 - 148 + obstacles[0].width;
        return true;
    }
    else {
        return false;
    }
}

function bottomCollision() {
    if(
        player.y + player.height > window.width * .2 + 144 && 
        player.x < window.width * .38 + obstacles[1].width - 45 &&
        player.x + player.width > window.width * .38
    ) {
        player.y = window.width * .2 + 144 - player.height;
        return true;
    }
    else if(
        player.y + player.height > window.width * .2 + 90 && 
        player.x + player.width > window.width * .2 - 148 &&
        player.x < window.width * .2 - 148 + obstacles[0].width
    ) {
        player.y = window.width * .2 + 90 - player.height;
        return true;
    }
    else {
        return false;
    }
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
    obstacles[0] = document.getElementById("yard-yarn").querySelector("img").getBoundingClientRect();
    obstacles[1] = document.getElementById("nort").querySelector("img").getBoundingClientRect();
    this.console.log(obstacles);
    update();
});

$(window).resize(function(){
    canvas.width = document.getElementById("ch-canvas").getBoundingClientRect().width;
    canvas.height = document.getElementById("ch-canvas").getBoundingClientRect().height; 
    ctx = canvas.getContext("2d");
    width = document.getElementById("ch-canvas").getBoundingClientRect().width;
    height = document.getElementById("ch-canvas").getBoundingClientRect().height;
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
		x : width * .75,
		y : height - 5,
		width : 64,
		height : 64,
		speed: 8,
		jumpSpeed: 7.5,
		velX: 0,
		velY: 0,
		jumping: false
    };
    keys = [];
    friction = 0.75;
    gravity = 0.2;
    obstacles[0] = document.getElementById("yard-yarn").querySelector("img").getBoundingClientRect();
    obstacles[1] = document.getElementById("nort").querySelector("img").getBoundingClientRect();
});