Input = function() {
	this.key_bindings = new Array();
	this.key_presses = new Array();
	this.addKeyBinding = function(key, actn) {
		this.key_bindings.push( { key_code: key, action: actn} );
	};
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
		//document.getElementById("hello").innerHTML = String(this.key_presses[65].last_frame)+" "+String(this.key_presses[65].this_frame)+",  "+String(this.key_presses[68].last_frame)+" "+String(this.key_presses[68].this_frame);
	};
	this.keyPressed = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == false) && (this.key_presses[ this.key_bindings[i].key_code ].first_frame == true);
			}
		}
		return false;
	};
	this.keyReleased = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == true) && (this.key_presses[ this.key_bindings[i].key_code ].first_frame == false);
			}
		}
		return false;
	};
	this.keyDown = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == true) && (this.key_presses[ this.key_bindings[i].key_code ].first_frame == true);
			}
		}
		return false;
	};
	this.keyUp = function(actn) {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			if( actn == this.key_bindings[i].action ) {
				return (this.key_presses[ this.key_bindings[i].key_code ].last_frame == false) && (this.key_presses[ this.key_bindings[i].key_code ].first_frame == false);
			}
		}
		return false;
	};
	this.init = function() {
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			this.key_presses[ this.key_bindings[i].key_code ] = { last_frame: false, this_frame: false };
		}
	};
	this.debugString = function() {
		debug_str = "*****Input Debug String*****\n\n";
		
		debug_str += "KEY BINDINGS: \n";
		debug_str += "key code, action\n";
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			debug_str += String(this.key_bindings[i].key_code) + ", " + String(this.key_bindings[i].action) + "\n";
		}
		debug_str += "\n";
		
		debug_str += "KEY PRESSES: \n";
		debug_str += "action, last frame, this frame\n";
		for( var i = 0; i < this.key_bindings.length; ++i ) {
			debug_str += String(this.key_bindings[i].action) + ", " + String(this.key_presses[ this.key_bindings[i].key_code ].last_frame) + ", " + String(this.key_presses[ this.key_bindings[i].key_code ].this_frame) + "\n";
		}
		debug_str += "\n";
		
		debug_str += "GLOBAL KEYS PRESSED: \n";
		debug_str += "keycode, status\n";
		for( var i = 0; i < global_keys_pressed.length; ++i ) {
			if( typeof(global_keys_pressed[i]) != 'undefined' ) {
				debug_str += String(i) + ", " + String(global_keys_pressed[i]) + "\n";
			}
		}
		return debug_str;
	};
};

global_keys_pressed = new Array();

function InputKeyDownListener(e) {
	global_keys_pressed[e.keyCode] = true;
}

function InputKeyUpListener(e) {
	global_keys_pressed[e.keyCode] = false;
}