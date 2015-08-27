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
* Read-only mode
* Unload mode


<br/>![](http://ignaciochavez.com/files/star-rating/stars-rating-demo.jpg)
[Checkout the demo here](http://nashio.github.io/star-rating-svg/) 

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

## Options

| option  | default  | description  |
|---|---|---|
| totalStar  | 5  | Amount of stars to show  |
| initialRating | 0 | Initial rating applied on load |
| starSize | 40 | width in pixels of each star |
| emptyColor | lightgray | Color assigned to an empty star |
| hoverColor | orange | Color assigned to hovered star |
| activeColor | gold | Color assigned to active rated star |
| useGradient | true | Active stars will use gradient coloring |
| | | To use this option you need to populate the object [starGradient] |
| starGradient | {start: '#FEF7CD', end: '#FF9511'} | Define the star and end colors for the gradient |
| readonly | false | If false any interaction is disabled |
| strokeWidth | 0 | Defines the thickness of the border, 0 is disabled |
| strokeColor | black | Defines the color for the border |
| callback | noop | Executes when rating |

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
