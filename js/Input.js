Input = function() {
	// Handles key bindings for this input object; used to store keyCode and action bound to that key
	this.key_bindings = new Array();
	
	// Keeps track of key states for the last two frame updates 
	this.key_presses = new Array();
	
	// Function to add key-binding to input
	this.addKeyBinding = function(key, actn) {
		this.key_bindings.push( { key_code: key, action: actn } );
	};
	
	// Call this function at the beginning of the main update function; keeps track of key states
	this.update = function(e) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			this.key_presses[ this.key_bindings[i].key_code ].last_frame = this.key_presses[ this.key_bindings[i].key_code ].this_frame;
			if( global_keys_pressed[ this.key_bindings[i].key_code ] ) {
				this.key_presses[ this.key_bindings[i].key_code ].this_frame = true;
			}
			else {
				this.key_presses[ this.key_bindings[i].key_code ].this_frame = false;
			}
		}
	};
	
	// Returns true if the key bound to the requested action was just pressed
	this.isKeyPressed = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == false) && (this.key_presses[ this.key_bindings[i].key_code ].this_frame == true);
			}
		}
		return false;
	};
	
	// Returns true if the key bound to the requested action was just released
	this.isKeyReleased = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == true) && (this.key_presses[ this.key_bindings[i].key_code ].this_frame == false);
			}
		}
		return false;
	};
	
	// Returns true if the key bound to the requested action has been down for at least two updates
	this.isKeyLongDown = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == true) && (this.key_presses[ this.key_bindings[i].key_code ].this_frame == true);
			}
		}
		return false;
	};
	
	// Returns true if the key bound to the requested action has been up for at least two updates
	this.isKeyLongUp = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == false) && (this.key_presses[ this.key_bindings[i].key_code ].this_frame == false);
			}
		}
		return false;
	};
	
	// Returns true if the key bound to the requested action is down on this frame
	this.isKeyDown = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].this_frame == true);
			}
		}
		return false;
	};
	
	// Returns true if the key bound to the requested action is up on this frame
	this.isKeyUp = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].this_frame == false);
			}
		}
		return false;
	};
	
	// Call this function after binding all the desired keys
	this.init = function() {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			this.key_presses[ this.key_bindings[i].key_code ] = { last_frame: false, this_frame: false };
		}
	};
	
	// Creates a string with all the information about the Input object in its current state
	this.debugString = function() {
		debug_str = "*****Input Debug String*****\n\n";
		
		debug_str += "KEY BINDINGS:\n";
		debug_str += "key code, action\n";
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			debug_str += String(this.key_bindings[i].key_code) + ", " + String(this.key_bindings[i].action) + "\n";
		}
		debug_str += "\n";
		
		debug_str += "KEY PRESSES:\n";
		debug_str += "action, last frame, this frame\n";
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			debug_str += String(this.key_bindings[i].action) + ", " + String(this.key_presses[ this.key_bindings[i].key_code ].last_frame) + ", " + String(this.key_presses[ this.key_bindings[i].key_code ].this_frame) + "\n";
		}
		debug_str += "\n";
		
		debug_str += "GLOBAL KEYS PRESSED:\n";
		debug_str += "keycode, status\n";
		for( var i = 0; i < global_keys_pressed.length; ++i ) {
			if( typeof(global_keys_pressed[i]) != 'undefined' ) {
				debug_str += String(i) + ", " + String(global_keys_pressed[i]) + "\n";
			}
		}
		return debug_str;
	};
	
	// Creates an HTML-formatted string with all the information about the Input object in its current state
	this.debugHTML = function() {
		debug_str = "*****Input Debug String*****<br/><br/>";
		
		debug_str += "KEY BINDINGS:<br/>";
		debug_str += "key code, action<br/>";
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			debug_str += String(this.key_bindings[i].key_code) + ", " + String(this.key_bindings[i].action) + "<br/>";
		}
		debug_str += "<br/>";
		
		debug_str += "KEY PRESSES:<br/>";
		debug_str += "action, last frame, this frame<br/>";
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			debug_str += String(this.key_bindings[i].action) + ", " + String(this.key_presses[ this.key_bindings[i].key_code ].last_frame) + ", " + String(this.key_presses[ this.key_bindings[i].key_code ].this_frame) + "<br/>";
		}
		debug_str += "<br/>";
		
		debug_str += "GLOBAL KEYS PRESSED:<br/>";
		debug_str += "keycode, status<br/>";
		for( var i = 0; i < global_keys_pressed.length; ++i ) {
			if( typeof(global_keys_pressed[i]) != 'undefined' ) {
				debug_str += String(i) + ", " + String(global_keys_pressed[i]) + "<br/>";
			}
		}
		return debug_str;
	};
};

// Used to store the state of keyboard keys; necessary for the keyboard event listeners and multiple input objects
global_keys_pressed = new Array();

// Keyboard keydown event listener
function InputKeyDownListener(e) {
	global_keys_pressed[e.keyCode] = true;
}

// Keyboard keyup event listener
function InputKeyUpListener(e) {
	global_keys_pressed[e.keyCode] = false;
}