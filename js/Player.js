Player = function() {
	this.x = 0;						// The player's current x-position
	this.y = 0;						// The player's current y-position
	this.x_new = 0;					// The player's new x-position for the next frame, tested for collision before written as the definite x-position value
	this.y_new = 0;					// The player's new y-position for the next frame, tested for collision before written as the definite y-position value
	this.width = 0;					// The width of the player object
	this.height = 0;				// The height of the player object
	this.color = "#000000";			// The color of the player object (will be removed later when using an actual sprite image)
	this.walk_speed = 5;			// The speed the player can move left/right (walking)
	this.is_jumping = false;		// Flag to keep track if the player is jumping
	this.is_falling = true;			// Flag to keep track if the player is falling
	this.y_velocity = 0;			// The current y-velocity of the player; Used for jumping and falling velocity
	this.init_jump_speed = -12;		// Initial jump speed; When the player jumps the y-velocity is set to this value
	this.gravity = 1;				// Gravity constant used to update the y-velocity of the player when jumping and falling
	this.terminal_velocity = 7;		// The fastest velocity that y-velocity can reach; y-velocity is no longer incremented by gravity when this value is reached
	this.is_gliding = false;		// Flag to allow the player to glide in the air for a small duration when reaching the peak of the jump
	this.glide_timer = 0;			// Timer variable to count the time that has passed while gliding
	this.glide_delay = 5;			// Duration in which to glide during the jump
	
	
	this.init = function(x, y, w, h, c) {
		this.x = typeof(x) !== 'undefined' ? x : 0;
		this.y = typeof(y) !== 'undefined' ? y : 0;
		this.width = typeof(w) !== 'undefined' ? w : 0;
		this.height = typeof(h) !== 'undefined' ? h : 0;
		this.color = typeof(c) !== 'undefined' ? c : "#000000";
		
		this.x_new = x;
		this.y_new = y;
	};
	
	this.update = function(input) {
		this.checkInput(input);
		
		if( this.is_jumping ) this.jumpingAnimation();
		
		if( this.is_falling ) this.fallingAnimation();
	};
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	};
	
	this.checkInput = function(input) {
		// Player walks right when the 'right' button is down and the 'left' button isn't
		if( input.isKeyDown("right") && input.isKeyUp("left") ) {
			this.x_new = this.x + this.walk_speed;
		}
		
		// Player walks left when the 'left' button is down and the 'right' button isn't
		if( input.isKeyDown("left") && input.isKeyUp("right") ) {
			this.x_new = this.x - this.walk_speed;
		}
		
		/*
		// Player walks up when the 'up' button is down and the 'down' button isn't (for debug purposes)
		if( input.isKeyDown("up") && input.isKeyUp("down") ) {
			this.y_new = this.y - this.walk_speed;
		}
		
		// Player walks down when the 'down' button is down and the 'up' button isn't (for debug purposes)
		if( input.isKeyDown("down") && input.isKeyUp("up") ) {
			this.y_new = this.y + this.walk_speed;
		}
		*/
		
		// Player activates jump if 'jump' button was just pressed and if not already jumping/falling
		if( input.isKeyPressed("jump") && !this.is_jumping && !this.is_falling ) {
			this.is_jumping = true;
			this.y_velocity = this.init_jump_speed;
		}
	};
	
	this.jumpingAnimation = function() {
		this.y_new += this.y_velocity;
		
		if( this.y_velocity < 0 && this.y_velocity+this.gravity >= 0 ) {
			this.is_gliding = true;
			this.glide_timer = 0;
			this.y_velocity = 0;
		}
		
		if( this.is_gliding ) {
			if( this.glide_timer >= this.glide_delay ) {
				this.is_gliding = false;
			}
			else {
				this.glide_timer++;
			}
		}
		else if( this.y_velocity+this.gravity > this.terminal_velocity ) {
			this.y_velocity = this.terminal_velocity;
		}
		else {
			this.y_velocity += this.gravity;
		}
	};
	
	this.fallingAnimation = function() {
		this.y_new += this.y_velocity;
		
		if( this.y_velocity+this.gravity > this.terminal_velocity ) {
			this.y_velocity = this.terminal_velocity;
		}
		else {
			this.y_velocity += this.gravity;
		}
	};
	
	// Creates a string with all the information about the Player object in its current state
	this.debugString = function() {
		debug_str = "*****Player Debug String*****\n\n";
		
		debug_str += "(x, y) = (" + String(this.x) + ", " + String(this.y) + ")\n";
		debug_str += "(x_new, y_new) = (" + String(this.x_new) + ", " + String(this.y_new) + ")\n";
		debug_str += "(width, height) = (" + String(this.width) + ", " + String(this.height) + ")\n";
		debug_str += "color = " + String(this.color) + "\n";
		
		return debug_str;
	};
	
	// Creates an HTML-formatted string with all the information about the Player object in its current state
	this.debugHTML = function() {
		debug_str = "*****Player Debug String*****<br/><br/>";
		
		debug_str += "(x, y) = (" + String(this.x) + ", " + String(this.y) + ")<br/>";
		debug_str += "(x_new, y_new) = (" + String(this.x_new) + ", " + String(this.y_new) + ")<br/>";
		debug_str += "(width, height) = (" + String(this.width) + ", " + String(this.height) + ")<br/>";
		debug_str += "color = " + String(this.color) + "<br/>";
		
		return debug_str;
	};
	
};