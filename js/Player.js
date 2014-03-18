Player = function() {
	this.x = 0;
	this.y = 0;
	this.x_new = 0;
	this.y_new = 0;
	this.width = 0;
	this.height = 0;
	this.color = "#000000";
	
	this.walk_speed = 5;
	
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
		if( input.isKeyDown("right") && input.isKeyUp("left") ) {
			this.x_new = this.x + this.walk_speed;
		}
		
		if( input.isKeyDown("left") && input.isKeyUp("right") ) {
			this.x_new = this.x - this.walk_speed;
		}
		
		if( input.isKeyDown("up") && input.isKeyUp("down") ) {
			this.y_new = this.y - this.walk_speed;
		}
		
		if( input.isKeyDown("down") && input.isKeyUp("up") ) {
			this.y_new = this.y + this.walk_speed;
		}
	};
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
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