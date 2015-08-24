### star-rating-svg.js
>v.0.9.5

A basic, yet customizable star rating jQuery plugin based on SVG shapes.

###Features:
* Doesn't use images
* Custom size
* Custom colors
* Choose the number of stars to be displayed
* Define gradient color of selected stars
* Specify a border/stroke thickness and color
* Specify initial rating via options or markup data attribute
* Available callback to notify server with rating
* Read-only mode // TODO:
* Unload mode // TODO:

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="jquery.star-rating-svg.js"></script>
	```

2. Include plugin's css:

	```html
    <link rel="stylesheet" type="text/css" href="star-rating-svg.css">
	```

3. Add your markup

    ```html
    <div class="my-rating"></div>
    ```

4. Call the plugin:

	```javascript
        $(".my-rating").fivestars({
            starSize: 25,
            callback: function(currentRating){
                // make a server call here
            }
        });
	```



### Files

Code example

#### [demo/index.html/](https://github.com/nashio/star-rating-svg/blob/master/demo/index.html "code examples")

Source file

#### [src/](https://github.com/nashio/star-rating-svg/tree/master/src "source file")

Minified version

#### [dist/](https://github.com/nashio/star-rating-svg/tree/master/dist "build files")



License
------------
The MIT License (MIT)
