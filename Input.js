Input = function() {
	this.key_bindings = new Array();
	this.key_presses = new Array();
	this.addKeyBinding = function(key, actn) {
		new_key_binding = [ key_code: key, action: actn ];
		key_bindings.push(new_key_binding);
	};
	this.update = function(e) {
		for( var i = 0; i < key_bindings.length; ++i ) {
			key_presses[ key_bindings[i].key_code ].last_frame = key_presses[ key_bindings[i].key_code ].this_frame;
			if( global_keys_pressed[ key_bindings[i].key_code ] ) {
				key_presses[ key_bindings[i].key_code ].this_frame = true;
			}
			else {
				key_presses[ key_bindings[i].key_code ].this_frame = false;
			}
		}
	};
	this.keyPressed = function(actn) {
		for( var i = 0; i < key_bindings.length; ++i ) {
			if( actn == key_bindings[i].action ) {
				return (key_presses[ key_bindings[i].key_code ].last_frame == false) && (key_presses[ key_bindings[i].key_code ].first_frame == true);
			}
		}
		return false;
	};
	this.keyReleased = function(actn) {
		for( var i = 0; i < key_bindings.length; ++i ) {
			if( actn == key_bindings[i].action ) {
				return (key_presses[ key_bindings[i].key_code ].last_frame == true) && (key_presses[ key_bindings[i].key_code ].first_frame == false);
			}
		}
		return false;
	};
	this.keyDown = function(actn) {
		for( var i = 0; i < key_bindings.length; ++i ) {
			if( actn == key_bindings[i].action ) {
				return (key_presses[ key_bindings[i].key_code ].last_frame == true) && (key_presses[ key_bindings[i].key_code ].first_frame == true);
			}
		}
		return false;
	};
	this.keyUp = function(actn) {
		for( var i = 0; i < key_bindings.length; ++i ) {
			if( actn == key_bindings[i].action ) {
				return (key_presses[ key_bindings[i].key_code ].last_frame == false) && (key_presses[ key_bindings[i].key_code ].first_frame == false);
			}
		}
		return false;
	};
	this.init = function() {
		default_key_press = [ last_frame: false, this_frame: false ];
		for( var i = 0; i < key_bindings.length; ++i ) {
			key_presses[ key_bindings[i].key_code ] = default_key_press;
		}
	};
	this.debugString = function() {
		debug_str = "*****Input Debug String*****\n\n";
		
		debug_str += "KEY BINDINGS: \n";
		debug_str += "key code, action\n";
		for( var i = 0; i < key_bindings.length; ++i ) {
			debug_str += String(key_bindings[i].key_code) + ", " + String(key_bindings[i].actn) + "\n";
		}
		debug_str += "\n";
		
		debug_str += "KEY PRESSES: \n";
		debug_str += "last frame, this frame\n";
		for( var i = 0; i < key_presses.length; ++i ) {
			debug_str += String(key_presses[i].last_frame) + ", " + String(key_presses[i].this_frame) + "\n";
		}
		debug_str += "\n";
		
		return debug_str;
	};
};

global_keys_pressed = new Array();

function InputkeyDownListener(e) {
	global_keys_pressed[e.keyCode] = true;
}

function InputkeyUpListener(e) {
	global_keys_pressed[e.keyCode] = false;
}