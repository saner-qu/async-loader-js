(function(root, factory) {

	if (root === null) {
		throw new Error('async-loader-js package can be used only in browser');
	}

	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.AsyncLoader = factory();
	}

})(typeof window !== 'undefined' ? window : null, function() {


	'use strict';


	var version = '';

	var script = null;

	var module = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;


	var AsyncLoader = {};


	AsyncLoader.URL = '';

	AsyncLoader.KEY = '';

	AsyncLoader.LIBRARIES = [];

	AsyncLoader.CLIENT = null;

	AsyncLoader.CHANNEL = null;

	AsyncLoader.LANGUAGE = null;

	AsyncLoader.REGION = null;

	AsyncLoader.VERSION = moduleVersion;

	AsyncLoader.MODULE = '';

	AsyncLoader.NOCACHE = true;

	AsyncLoader.WINDOW_CALLBACK_NAME = '__async_loader_provider_initializator__';


	AsyncLoader._aMockApiObject = {};


	AsyncLoader.load = function(fn) {
		if (module === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[AsyncLoader.WINDOW_CALLBACK_NAME] = function() {
					ready(fn);
				};

				AsyncLoader.createLoader();
			}
		} else if (fn) {
			fn(module);
		}
	};


	AsyncLoader.createLoader = function() {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = AsyncLoader.createUrl();

		document.body.appendChild(script);
	};


	AsyncLoader.isLoaded = function() {
		return module !== null;
	};


	AsyncLoader.createUrl = function() {
		var url = AsyncLoader.URL;

		url += '?callback=' + AsyncLoader.WINDOW_CALLBACK_NAME;

		if (AsyncLoader.KEY) {
			url += '&key=' + AsyncLoader.KEY;
		}

		if (AsyncLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + AsyncLoader.LIBRARIES.join(',');
		}

		if (AsyncLoader.VERSION) {
			url += '&v=' + AsyncLoader.VERSION;
		}

		if (AsyncLoader.CHANNEL) {
			url += '&channel=' + AsyncLoader.CHANNEL;
		}

		if (AsyncLoader.LANGUAGE) {
			url += '&language=' + AsyncLoader.LANGUAGE;
		}

		if (AsyncLoader.REGION) {
			url += '&region=' + AsyncLoader.REGION;
		}

		if(AsyncLoader.NOCACHE){
			url += '&_=' + (new Date()).valueOf();
		}

		return url;
	};


	AsyncLoader.release = function(fn) {
		var release = function() {
			AsyncLoader.KEY = null;
			AsyncLoader.LIBRARIES = [];
			AsyncLoader.CLIENT = null;
			AsyncLoader.CHANNEL = null;
			AsyncLoader.LANGUAGE = null;
			AsyncLoader.REGION = null;
			AsyncLoader.VERSION = version;

			module = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.module !== 'undefined') {
				delete window.module;
			}

			if (typeof window[AsyncLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[AsyncLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				AsyncLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			AsyncLoader.load(function() {
				release();
			});
		} else {
			release();
		}
	};


	AsyncLoader.onLoad = function(fn) {
		onLoadEvents.push(fn);
	};


	AsyncLoader.makeMock = function() {
		originalCreateLoaderMethod = AsyncLoader.createLoader;

		AsyncLoader.createLoader = function() {
			window.module = AsyncLoader._aMockApiObject;
			window[AsyncLoader.WINDOW_CALLBACK_NAME]();
		};
	};


	var ready = function(fn) {
		var i;

		loading = false;

		if (module === null) {
			module = window[AsyncLoader.MODULE];
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](module);
		}

		if (fn) {
			fn(module);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](module);
		}

		callbacks = [];
	};


	return AsyncLoader;

});
