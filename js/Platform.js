Platform = function() {
	this.x = 0;
	this.y = 0;
	this.x_new = 0;
	this.y_new = 0;
	this.width = 0;
	this.height = 0;
	this.color = "#000000";
	
	this.scroll_speed = 0;
	this.DIRECTION = {
		STATIC: 0,
		UP: 1,
		DOWN: 2,
		LEFT: 3,
		RIGHT: 4
	};
	this.dir = this.DIRECTION.STATIC;
	
	this.img;
	
	this.init = function(x, y, w, h, c, platform_theme, dir, spd) {
		this.x = typeof(x) !== 'undefined' ? x : 0;
		this.y = typeof(y) !== 'undefined' ? y : 0;
		this.width = typeof(w) !== 'undefined' ? w : 0;
		this.height = typeof(h) !== 'undefined' ? h : 0;
		this.color = typeof(c) !== 'undefined' ? c : 0;
		
		if( typeof(platform_theme) !== 'undefined' ) {
			this.img = new Image();
			this.img.src = platform_theme;
		}
		
		if( typeof(dir) !== 'undefined' ) {
			if( (typeof(dir) == 'string' && dir == 'up') || (typeof(dir) == 'number' && dir == 0) ) {
				this.dir = this.DIRECTION.UP;
			}
			else if( (typeof(dir) == 'string' && dir == 'down') || (typeof(dir) == 'number' && dir == 1) ) {
				this.dir = this.DIRECTION.DOWN;
			}
			else if( (typeof(dir) == 'string' && dir == 'left') || (typeof(dir) == 'number' && dir == 2) ) {
				this.dir = this.DIRECTION.LEFT;
			}
			else if( (typeof(dir) == 'string' && dir == 'right') || (typeof(dir) == 'number' && dir == 3) ) {
				this.dir = this.DIRECTION.RIGHT;
			}
			else {
				this.dir = this.DIRECTION.STATIC;
			}
		}
		this.scroll_speed = typeof(spd) !== 'undefined' ? spd : 0;
		
		this.x_new = this.x;
		this.y_new = this.y;
	};
	
	this.update = function() {
		switch(this.dir) {
			case this.DIRECTION.UP:
				this.y_new = this.y - this.scroll_speed;
				break;
			case this.DIRECTION.DOWN:
				this.y_new = this.y + this.scroll_speed;
				break;
			case this.DIRECTION.LEFT:
				this.x_new = this.x - this.scroll_speed;
				break;
			case this.DIRECTION.RIGHT:
				this.x_new = this.x + this.scroll_speed;
				break;
			case this.DIRECTION.STATIC:
			default:
				break;
		}
	};
	
	this.draw = function(context) {
		if( this.img != null ) {
			for( var i = 0; i < (this.width/25); ++i) {
				context.drawImage(this.img,(i*25) + this.x,this.y,25,this.height);
			}
		}
		else {
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.width, this.height);
		}
	};
};