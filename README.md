### jquery.fivestars.js
>v.0.9.5

Star rating jQuery plugin based on SVG shapes.

###Features:
* No images, uses SVG stars
* Custom size
* Custom colors
* Choose the number of stars to be displayed
* Define gradient color of selected stars
* Specify a border/stroke thickness and color
* Specify initial rating via options or markup data attribute
* Available callback to notify server with rating

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
            starSize: 25,
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

