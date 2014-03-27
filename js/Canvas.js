// Create theme objects
Theme = function(background_src, player_src, platform_src) {
	this.background = background_src;
	this.player = player_src;
	this.platform = platform_src;
}

Canvas = function() {

	// Keep a reference to the actual canvas DOM element
	this.DOM;
	
	// Keep a reference to the stage DOM element (used to display background image)
	this.stageDOM;
	
	// Theme of the level
	this.theme;
	
	// Extract the width and height of the canvas
	this.width;
	this.height;
	
	// Keep a reference to the 2d context for drawing onto the canvas
	this.context;
	
	// Input controller for this canvas
	this.input = new Input();
	
	// Player for this canvas
	this.player = new Player();
	
	// Platforms for this canvas
	this.platforms = new Array();
	
	// Add key-binding to the input controller of this canvas
	this.addKeyBinding = function(key, actn) {
		this.input.addKeyBinding(key, actn);
	};
	
	// Start up the input controller for use
	this.startInputController = function() {
		this.input.init();
	};
	
	// Create player for canvas
	this.initializePlayer = function(x, y, w, h, c) {
		if( this.theme != null ) {
			this.player.init(x,y,w,h,c,this.theme.player);
		}
		else {
			this.player.init(x,y,w,h,c);
		}
	};
	
	// Initialize the canvas object
	this.init = function(canvasDOM, stageDOM, theme, level) {
		this.DOM = canvasDOM;
		this.stageDOM = stageDOM;
		
		this.theme = typeof(theme) !== 'undefined' ? theme : null;
		if( this.theme != null ) {
			var img = new Image();
			img.onload = function() {
				stageDOM.style.backgroundImage = "url(" + this.src + ")";
			};
			img.src = this.theme.background;
		}
		
		this.width = this.DOM.width;
		this.height = this.DOM.height;
		this.context = this.DOM.getContext("2d");
		
		if( typeof(level) !== 'undefined' ) {
			// READ LEVEL FILE
		}
		else {
			for( var i = 0; i < 5; ++i ) {
				p = new Platform();
				p.init(Math.floor(Math.random()*300)+100, Math.floor(Math.random()*400)+200, Math.floor(Math.random()*5+1) * 25, Math.floor(Math.random()*2+1) * 25, "#0000ff", this.theme.platform, 'static', Math.random()*5+1);
				this.platforms.push(p);
			}
		}
	};
	
	// Update this canvas
	this.update = function() {
		this.input.update();
		
		this.player.update(this.input);
		
		for( var i = 0; i < this.platforms.length; ++i ) {
			this.platforms[i].update();
		}
		
		this.collision();
	};
	
	// Perform any draw functions for this canvas
	this.draw = function() {
		this.context.clearRect(0, 0, this.width, this.height);
	
		this.player.draw(this.context);
		
		for( var i = 0; i < this.platforms.length; ++i ) {
			this.platforms[i].draw(this.context);
		}
	};
	
	this.isOverlap = function(x, y, p) {
		if( x < p.x+p.width && x+this.player.width > p.x ) {
			if( y < p.y+p.height && y+this.player.height > p.y ) {
				return true;
			}
		}
		
		return false;
	};
	
	this.onLedge = function(x, p) {
		return ( x < p.x+p.width && x+this.player.width > p.x );
	};
	
	this.offLedge = function(x, p) {
		return ( x+this.player.width <= p.x || x >= p.x+p.width );
	};
	
	this.collision = function() {
	
		// Check if the new player's x-position will cause the player to move off screen
		if( this.player.x_new < 0 ) {	// Collision with left wall
			this.player.x_new = 0;
			this.player.x_velocity = 0;
		}
		else if( this.player.x_new > this.width-this.player.width ) {	// Collision with right wall
			this.player.x_new = this.width-this.player.width;
			this.player.x_velocity = 0;
		}
		
		// Check if the new player's y-position will cause the player to move off screen
		if( this.player.y_new < 0 ) {	// Collision with ceiling
			this.player.y_new = 0;
		}
		else if( this.player.y_new > this.height-this.player.height ) {	// Collision with the ground
			this.player.y_new = this.height-this.player.height;
			this.player.is_jumping = false;
			this.player.is_falling = false;
			this.player.platform_standing_on = -1;
		}
		
		var dx = this.player.x_new-this.player.x;
		var dy = this.player.y_new-this.player.y;
		if( dx == 0 && dy == 0 ) {}
		else if (Math.abs(dx) >= Math.abs(dy)) {
			var ddx = this.player.x;
			var ddy = this.player.y;
			var x_incr, y_incr;
			if( dx > 0 ) {
				x_incr = 1;
			}
			else {
				x_incr = -1;
			}
			if( dy == 0 ) {
				y_incr = 0;
			}
			else if( dy > 0 ) {
				y_incr = Math.abs(dy)/Math.abs(dx);
			}
			else {
				y_incr = -Math.abs(dy)/Math.abs(dx);
			}
			for (var i = 0; i < this.platforms.length; ++i) {
				for (ddx; ddx != this.player.x_new; ddx += x_incr, ddy += y_incr) {
					if (this.isOverlap(ddx+x_incr, Math.floor(ddy + y_incr ), this.platforms[i]) ) {
						if( Math.floor(ddy)+this.player.height == this.platforms[i].y && this.onLedge(ddx,this.platforms[i]) ) {			// player landed on top of a platform
							this.player.x_new = ddx;
							this.player.y_new = Math.floor(ddy);
							this.player.is_jumping = false;
							this.player.is_falling = false;
							this.player.platform_standing_on = i;
						}
						else if( Math.floor(ddy) == this.platforms[i].y+this.platforms[i].height && this.onLedge(ddx,this.platforms[i]) ) {	// player hit the bottom of a platform
							this.player.x_new = ddx;
							this.player.y_new = Math.floor(ddy);
							this.player.is_jumping = false;
							this.player.is_falling = true;
							this.player.y_velocity = 0;
						}
						else {
							this.player.x_new = ddx;
							if( this.player.y_velocity+this.player.crash_velocity_deduction <= 0 ) {
								this.player.y_velocity += this.player.crash_velocity_deduction;
							}
						}
						break;
					}
				}
			}
		}
		else {
			var ddx = this.player.x;
			var ddy = this.player.y;
			var x_incr, y_incr;
			if( dx == 0 ) {
				x_incr = 0;
			}
			else if( dx > 0 ) {
				x_incr = Math.abs(dx)/Math.abs(dy);
			}
			else {
				x_incr = -Math.abs(dx)/Math.abs(dy);
			}
			if( dy > 0 ) {
				y_incr = 1;
			}
			else {
				y_incr = -1;
			}
			for (var i = 0; i < this.platforms.length; ++i) {
				for (ddy; ddy != this.player.y_new; ddx += x_incr, ddy += y_incr) {
					if (this.isOverlap( Math.floor(ddx+x_incr), ddy + y_incr, this.platforms[i]) ) {
						if( ddy+this.player.height == this.platforms[i].y && this.onLedge(Math.floor(ddx),this.platforms[i]) ) {			// player landed on top of a platform
							this.player.x_new = Math.floor(ddx);
							this.player.y_new = ddy;
							this.player.is_jumping = false;
							this.player.is_falling = false;
							this.player.platform_standing_on = i;
						}
						else if( ddy == this.platforms[i].y+this.platforms[i].height && this.onLedge(Math.floor(ddx),this.platforms[i]) ) {	// player hit the bottom of a platform
							this.player.x_new = Math.floor(ddx);
							this.player.y_new = ddy;
							this.player.is_jumping = false;
							this.player.is_falling = true;
							this.player.y_velocity = 0;
						}
						else {
							this.player.x_new = Math.floor(ddx);
							if( this.player.y_velocity+this.player.crash_velocity_deduction <= 0 ) {
								this.player.y_velocity += this.player.crash_velocity_deduction;
							}
						}
						break;
					}
				}
			}
		}
		
		// Check if the player walked off the ledge it was standing on
		if( dy == 0 && !this.player.is_jumping ) {
			if( this.player.platform_standing_on >= 0 && this.offLedge(this.player.x_new, this.platforms[this.player.platform_standing_on]) ) {
				this.player.platform_standing_on = -1;
				this.player.is_falling = true;
				this.player.y_velocity = 0;
			}
		}
		
		// Set the player's position to the new position
		this.player.x = this.player.x_new;
		this.player.y = this.player.y_new;
		
		// Set the platform positions to the new position
		for( var i = 0; i < this.platforms.length; ++i ) {
			this.platforms[i].x = this.platforms[i].x_new;
			this.platforms[i].y = this.platforms[i].y_new;
		}
	};
	
	// Creates a string with all the information about the Canvas object in its current state
	this.debugString = function() {
		debug_str = "*****Canvas Debug String*****\n\n";
		
		debug_str += "(width, height) = (" + String(this.width) + ", " + String(this.height) + ")\n";
		
		debug_str += "\n";
		debug_str += this.input.debugString();
		
		debug_str += "\n";
		debug_str += this.player.debugString();
		
		return debug_str;
	};
	
	// Creates an HTML-formatted string with all the information about the Canvas object in its current state
	this.debugHTML = function() {
		debug_str = "*****Canvas Debug String*****<br/><br/>";
		
		debug_str += "(width, height) = (" + String(this.width) + ", " + String(this.height) + ")<br/>";
		
		debug_str += "<br/>";
		debug_str += this.input.debugHTML();
		
		debug_str += "<br/>";
		debug_str += this.player.debugHTML();
		
		return debug_str;
	};
};