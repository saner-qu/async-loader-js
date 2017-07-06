
# async-loader-js

Wrapper for asynchronously used async-loader-js API in browser.

This module does not change original a maps api in any way. It just provide easy way to load and use this API
asynchronously.

## Installation

Environment with common js:
```
$ npm install async-loader-js
```

Download and import one of these files into your .html file:
* [Development version](https://github.com/saner-qu/async-loader-js/blob/master/lib/async-loader-js.js)
* [Production version](https://github.com/saner-qu/async-loader-js/blob/master/lib/async-loader-js.min.js)

## Usage

```javascript
var AsyncLoader = require('async-loader-js'); // only for common js environments

AsyncLoader.load(function(al) {
	//TODO:al is js object
});
```

**If you are not using environment with common js support, you can use `AsyncLoader` variable directly. It is
already in `window` object.**

## Options

### Own API key

```javascript
AsyncLoader.KEY = 'qwertyuiopasdfghjklzxcvbnm';
```

### Business API client

```javascript
AsyncLoader.CLIENT = 'yourclientkey';
AsyncLoader.VERSION = '1.0';
```

### Libraries

```javascript
AsyncLoader.LIBRARIES = [];
```

### Localization

```javascript
AsyncLoader.LANGUAGE = 'zh-CN';
```

### Region

```javascript
AsyncLoader.REGION = 'GB';
```

## Unload amap api

For testing purposes is good to remove all amap objects and restore loader to its original state.

```javascript
AsyncLoader.release(function() {
	console.log('No amap api around');
});
```

## Events

### onLoad

```javascript
AsyncLoader.onLoad(function(ol) {
	console.log('I just loaded js');
});
```

## Tests

```

```

## Changelog list

* 1.0.0
	+ Initial version
