// Overlay
//
// @author Adam Brewer
// ================================
//
//
//
;var Shmoverlay = function (args) {

	//
	// Private Methods
	// =======================
	//

	args = args || {};
	var overlay = this;



	/**
	 * An extend function to merg our default arguments
	 * with a passed in from the user
	 *
	 * @param  {object} obj    The default settings
	 * @param  {object} extObj Arguments from the user
	 * @return {object}        A merged object
	 *
	 */
	function extend (obj, extObj) {
		if (arguments.length > 2) {
			var a = 1;
			for (a; a < arguments.length; a++) {
				extend(obj, arguments[a]);
			}
		} else {
			for (var i in extObj) {
				obj[i] = extObj[i];
			}
		}
		return obj;
	}


	/**
	 * These are the default settings for our carousel
	 *
	 */
	var defaultArgs = {
		speed: 200,

		// the class that's appended to the overlay
		// after it has opened
		'class': 'overlay-open'
	};

	// merging passed in arguments with our own
	this.args = args = extend(defaultArgs, args);



	/**
	 *
	 *
	 */
	function _setup (args) {

		// DOM elements
		this.el = args.el;
		this.inner = args.inner;

		// Speeds, dimentions and numbers
		this.speed = args.speed;
		this['class'] = args['class'];

	}



	/**
	 *
	 *
	 */
	function _bindEvents (args) {

		var overlay = this;

		// Key events
		$(document).on('keydown', function (evt) {
			var keycode = evt.keyCode || false;
			if (keycode !== false) {

				switch (keycode) {
					case 27: if (overlay.isOpen) overlay.close(); break;
				}

			}
		});

		// the close button
		this.el.on('click', '[data-action="close"]', function (evt) {
			var target = evt.target,
				remove = ( target.getAttribute('data-remove') ==='true' ) ? true : false;
			if (target.href && target.href.length) {
				evt.preventDefault();
			}
			overlay.close(remove);
		});

	}


	//
	// Public Methods
	// =======================
	//
	this.init = function (args) {

		_setup.call(this, args);
		_bindEvents.call(this, args);

	};


	/**
	 *
	 *
	 */
	this.close = function (remove) {
		this._animateOut(remove);
		return this;
	};

	this.open = function () {
		this._animateIn();
		return this;
	};




	/**
	 * Animations
	 *
	 * TODO
	 * allow options to control if these are
	 * governed by JS or CSS
	 *
	 */
	this._animateIn = function () {
		this.el.fadeIn(this.speed, function () {
			overlay._afterIn.call(overlay);
		});
		return this;
	};
	this._animateOut = function (remove) {
		this.el.fadeOut(this.speed, function () {
			overlay._afterOut.call(overlay, remove);
		});
		return this;
	};



	/**
	 * Clean-ups
	 *
	 * Used to add/remove states after the animations have finished running
	 *
	 */
	this._afterIn = function () {
		this.isOpen = true;
		this.el.addClass(this['class']);
	};
	this._afterOut = function (remove) {
		this.isOpen = false;
		this.el.removeClass(this['class']);
		if (remove === true) {
			this.inner.remove();
		}
	};



    // Initialise and return our new overlay
	this.init(args);
	return this;

};
