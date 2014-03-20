Player = function() {
	this.x = 0;						// The player's current x-position
	this.y = 0;						// The player's current y-position
	this.x_new = 0;					// The player's new x-position for the next frame, tested for collision before written as the definite x-position value
	this.y_new = 0;					// The player's new y-position for the next frame, tested for collision before written as the definite y-position value
	this.width = 0;					// The width of the player object
	this.height = 0;				// The height of the player object
	this.color = "#000000";			// The color of the player object (will be removed later when using an actual sprite image)
	this.walk_speed = 5;			// The speed the player can move left/right when walking
	this.top_run_speed = 10;		// The top speed the player can move left/right when running
	this.is_running = false;		// Flag to keep track if the player is running
	this.run_speedup_timer = 0;		// The timer used in the running speed-up animation
	this.run_speedup_delay = 5;		// The delay in which to allow the player to speed up when running
	this.x_velocity = 5;			// The current x-velocity of the player; Used for walking and running
	this.is_jumping = false;		// Flag to keep track if the player is jumping
	this.is_falling = true;			// Flag to keep track if the player is falling
	this.y_velocity = 0;			// The current y-velocity of the player; Used for jumping and falling velocity
	this.init_jump_speed = -12;		// Initial jump speed; When the player jumps the y-velocity is set to this value
	this.gravity = 1;				// Gravity constant used to update the y-velocity of the player when jumping and falling
	this.terminal_velocity = 7;		// The fastest velocity that y-velocity can reach; y-velocity is no longer incremented by gravity when this value is reached
	this.is_gliding = false;		// Flag to allow the player to glide in the air for a small duration when reaching the peak of the jump
	this.glide_timer = 0;			// Timer variable to count the time that has passed while gliding
	this.glide_delay = 5;			// Duration in which to glide during the jump
	
	this.is_dashing = false;		// Flag to keep track if the player is dashing
	this.DASHDIR = { 				// Enumerated set to specify which direction the dashing is being performed
		UP: 0,
		DOWN: 1,
		LEFT: 2,
		RIGHT: 3
		};
	this.dashing_dir = -1;			// The current dashing direction
	this.dashing_up_speed = 10;		// The speed of an up dash
	this.dashing_side_speed = 20;	// The speed of a side dash
	this.dashing_timer = 0;			// Timer variable to count the time that has passed since dashing
	this.dashing_up_delay = 50;		// Delay until the next up dash move can be performed
	this.dashing_side_delay = 5;	// Delay until the next side dash move can be performed
	
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
		
		if( this.is_running ) this.runningAnimation();
		
		if( this.is_dashing ) this.dashingAnimation();
		
		if( this.is_jumping ) this.jumpingAnimation();
		
		if( this.is_falling ) this.fallingAnimation();
	};
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	};
	
	this.checkInput = function(input) {
		// Player can activate running when moving left/right after a long press of the 'run' button and not in the air
		if( input.isKeyLongDown("run") && (input.isKeyDown("right") ? input.isKeyUp("left") : input.isKeyDown("left")) && !this.is_running && !this.is_jumping && !this.is_falling ) {
			this.is_running = true;
			this.run_speedup_timer = 0;
		}
		
		// Player changed direction so restart running build up
		else if( this.is_running && ( (input.isKeyDown("right") && input.isKeyDown("left")) || (input.isKeyPressed("right") && input.isKeyReleased("left")) || (input.isKeyPressed("left") && input.isKeyReleased("right")) ) ) {
			this.is_running = false;
			this.x_velocity = this.walk_speed;
		}
		
		// Player stopped moving a direction so deactivate running
		else if( this.is_running && input.isKeyUp("right") && input.isKeyUp("left") ) {
			this.is_running = false;
			this.x_velocity = this.walk_speed;
		}
		
		// Player can deactivate running when the 'run' button is released and not in the air
		else if( input.isKeyUp("run") && !this.is_jumping && !this.is_falling ) {
			this.is_running = false;
			this.x_velocity = this.walk_speed;
		}
	
		// Player moves right when the 'right' button is down and the 'left' button isn't
		if( input.isKeyDown("right") && input.isKeyUp("left") ) {
			this.x_new = this.x + this.x_velocity;
		}
		
		// Player moves left when the 'left' button is down and the 'right' button isn't
		if( input.isKeyDown("left") && input.isKeyUp("right") ) {
			this.x_new = this.x - this.x_velocity;
		}
		
		if( input.isKeyPressed("dashRight") && input.isKeyUp("dashLeft") && !this.is_dashing ) {
			this.is_dashing = true;
			this.dashing_dir = this.DASHDIR.RIGHT;
			this.dashing_timer = 0;
		}
		
		if( input.isKeyPressed("dashLeft") && input.isKeyUp("dashRight") && !this.is_dashing ) {
			this.is_dashing = true;
			this.dashing_dir = this.DASHDIR.LEFT;
			this.dashing_timer = 0;
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
		else if( input.isKeyPressed("jump") && !this.is_dashing ) {
			this.is_dashing = true;
			this.dashing_dir = this.DASHDIR.UP;
			this.dashing_timer = 0;
		}
	};
	
	this.runningAnimation = function() {
		if( this.run_speedup_timer >= this.run_speedup_delay ) {
			this.run_speedup_timer = 0;
			if( this.x_velocity >= this.top_run_speed ) {
				this.x_velocity = this.top_run_speed;
			}
			else {
				this.x_velocity++;
			}
		}
		else {
			this.run_speedup_timer++;
		}
	};
	
	this.dashingAnimation = function() {
		switch(this.dashing_dir) {
			case this.DASHDIR.UP:
				if( this.dashing_timer == 0 ) {
					this.y_velocity = -this.dashing_up_speed;
					this.dashing_timer++;
				}
				else {
					if( this.dashing_timer >= this.dashing_up_delay ) {
						this.is_dashing = false;
					}
					else {
						this.dashing_timer++;
					}
				}
				break;
			case this.DASHDIR.DOWN:
				break;
			case this.DASHDIR.LEFT:
				document.getElementById("hello").innerHTML = "hello";
				if( this.dashing_timer >= this.dashing_side_delay ) {
					this.is_dashing = false;
				}
				else {
					this.dashing_timer++;
					this.x_new = this.x - this.dashing_side_speed;
				}
				break;
			case this.DASHDIR.RIGHT:
				if( this.dashing_timer >= this.dashing_side_delay ) {
					this.is_dashing = false;
				}
				else {
					this.dashing_timer++;
					this.x_new = this.x + this.dashing_side_speed;
				}
				break;
			default:
				break;
		};
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