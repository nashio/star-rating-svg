### A star rating jQuery plugin using svg

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="jquery.fivestars.js"></script>
	```

2. Include plugin's css:

	```html
    <link rel="stylesheet" type="text/css" href="fivestars.css">
	```

3. Call the plugin:

	```javascript
    $(".my-rating").fivestars({
        totalStars: 5,
        starSize: 25, // pixels
        emptyColor: 'lightgray',
        hoverColor: 'salmon',
        activeColor: 'cornflowerblue',
        initialRating: 3,
        callback: function(currentRating){
            // make a server call here
        }
    });
	```

#### [demo/](https://github.com/nashio/jquery-fivestars/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

#### [dist/](https://github.com/nashio/jquery-fivestars/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://github.com/nashio/jquery-fivestars/tree/master/src)

## Team

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
