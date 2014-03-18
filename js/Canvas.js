Canvas = function(canvasID) {

	// Keep a reference to the actual canvas DOM element
	this.DOM;
	
	// Extract the width and height of the canvas
	this.width;
	this.height;
	
	// Keep a reference to the 2d context for drawing onto the canvas
	this.context;
	
	// Input controller for this canvas
	this.input = new Input();
	
	// Player for this canvas
	this.player = new Player();
	
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
		this.player.init(x,y,w,h,c);
	};
	
	// Initialize the canvas object
	this.init = function(canvasID) {
		this.DOM = document.getElementById(canvasID);
		this.width = this.DOM.width;
		this.height = this.DOM.height;
		this.context = this.DOM.getContext("2d");
	};
	
	// Update this canvas
	this.update = function() {
		this.context.clearRect(0, 0, this.width, this.height);
		
		this.input.update();
		
		this.player.update(this.input);
		
		this.collision();
	};
	
	// Perform any draw functions for this canvas
	this.draw = function() {
		
		this.player.draw(this.context);
	};
	
	this.collision = function() {
	
		if( this.player.x_new < 0 ) {	// Collision with left wall
			this.player.x_new = 0;
		}
		else if( this.player.x_new > this.width-this.player.width ) {	// Collision with right wall
			this.player.x_new = this.width-this.player.width;
		}
		
		if( this.player.y_new < 0 ) {	// Collision with ceiling
			this.player.y_new = 0;
		}
		else if( this.player.y_new > this.height-this.player.height ) {	// Collision with the ground
			this.player.y_new = this.height-this.player.height;
		}
		
		// Set the player's position to the new position
		this.player.x = this.player.x_new;
		this.player.y = this.player.y_new;
	};
	
	this.debugString = function() {
		debug_str = "*****Canvas Debug String*****\n\n";
		
		debug_str += "(width, height) = (" + String(this.width) + ", " + String(this.height) + ")\n";
		
		debug_str += "\n";
		debug_str += this.input.debugString();
		
		debug_str += "\n";
		debug_str += this.player.debugString();
		
		return debug_str;
	};
	
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