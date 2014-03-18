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
	
	// Add key-binding to the input controller of this canvas
	this.addKeyBinding = function(key, actn) {
		this.input.addKeyBinding(key, actn);
	};
	
	// Start up the input controller for use
	this.startInputController = function() {
		this.input.init();
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
	};
	
	// Perform any draw functions for this canvas
	this.draw = function() {
		
	};
	
	this.debugString = function() {
		debug_str = "*****Canvas Debug String*****\n\n";
		
		debug_str += "width: " + this.width + "\n";
		debug_str += "height: " + this.height + "\n";
		
		debug_str += "\nInput Controller Info:\n\n";
		debug_str += this.input.debugString();
		
		return debug_str;
	};
	
	this.debugHTML = function() {
		debug_str = "*****Canvas Debug String*****<br/><br/>";
		
		debug_str += "width: " + this.width + "<br/>";
		debug_str += "height: " + this.height + "<br/>";
		
		debug_str += "<br/>Input Controller Info:<br/><br/>";
		debug_str += this.input.debugHTML();
		
		return debug_str;
	};
};