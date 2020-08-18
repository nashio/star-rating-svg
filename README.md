
![](http://nashio.github.io/star-rating-svg/demo/img/star-rating-svg-logo.png)

###### A basic, yet flexible star rate jQuery plugin, using SVG.

### Features:
* Doesn't use external images
* Customize size
* Customize colors
* Use half or full stars
* Choose the number of stars to be displayed
* Define gradient color of selected stars
* Specify a border/stroke thickness and color
* Specify initial rating via options or markup data attribute
* Execute callback after rating (ex. to notify a server)
* onHover and onLeave events
* Locked / Read-only mode
* Unload option
  Change star shape (rounded or straight)
* Resize stars
* **Change rated star colors by level**


<br/>![](http://ignaciochavez.com/files/star-rating/stars-rating-demo.png)

## demo

For a working **demo**, see:
http://nashio.github.io/star-rating-svg/demo

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

3. Add the markup

    ```html
    <div class="my-rating"></div>
    ```

4. Call the plugin:

    ```javascript
    $(".my-rating").starRating({
        starSize: 25,
        callback: function(currentRating, $el){
            // make a server call here
        }
    });
    ```

## Options

| option  | default  | description  |
|---|---|---|
| totalStars  | 5  | Amount of stars to show  |
| initialRating | 0 | Initial rating applied on load |
| minRating | 0 | Specify the lowest rating |
| starSize | 40 | width in pixels of each star |
| useFullStars | false | rate using whole stars, if enabled, it doesn't use half-steps |
| emptyColor | lightgray | Color assigned to an empty star |
| hoverColor | orange | Color assigned to hovered star |
| activeColor | gold | Color assigned to active rated star |
| ratedColor | crimson | Color assigned to manually rated star |
| ratedColors | ['#333333', '#555555', '#888888', '#AAAAAA', '#CCCCCC'] | colors assigned to each level of rated stars |
| useGradient | true | Active stars will use gradient coloring |
| | | To use this option you need to populate the object [starGradient] |
| starGradient | {start: '#FEF7CD', end: '#FF9511'} | Define the star and end colors for the gradient |
| readOnly | false | If false any interaction is disabled |
| disableAfterRate | true | Removes further events once a rate is selected |
| strokeWidth | 0 | Defines the thickness of the border, 0 is disabled |
| strokeColor | black | Defines the color for the border |
| starShape | 'straight' or 'rounded' | Change the star shape type |
| baseUrl | false | when enabled (true), enables compatibility with the base tag in your head section |
| forceRoundUp | false | if true, forces rounding the initial rating to the nearest upper half even if the value is closer to the lower (1.1 -> 1.5 rather than 1.1 -> 1.0) |

## Methods

| method | arguments | description  |
|---|---|---|
| unload    |  &nbsp; | Destroys the instance and removes events attached to it |
| setRating | 0 to max stars (int), round (Boolean) | Manually sets the rating  |
| getRating | &nbsp; | Gets the current rating from instance |
| resize | 1 to 200 | Resize the stars on the fly |
| setReadOnly | Boolean | Disable or enable stars manually |

```javascript
// unload/destroy example
$('your-selector').starRating('unload')
// set rating example
$('your-selector').starRating('setRating', 2.5)
// set rating and round
$('your-selector').starRating('setRating', 2.8, true) // 3.0
// get rating example
$('your-selector').starRating('getRating')
// resize
$('your-selector').starRating('resize', 50)
// disable/enable stars manually
$('.your-selector').starRating('setReadOnly', true);

```

## Callbacks

| name | arguments | description |
|---|---|---|
| callback | rating, DOM element | Executes when selecting a rate |
```javascript
$('your-selector').starRating({
    callback: function(currentRating, $el){
    	// do something after rating
    }
});
```

## Events

| method | description  |
|---|---|
| onHover | executes a callback on mouseover |
| onLeave | executes a callback on mouseout |
```javascript
$('your-selector').starRating({
    onHover: function(currentIndex, currentRating, $el){
			// do something on mouseover
    },
    onLeave: function(currentIndex, currentRating, $el){
			// do something after mouseout
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

### Changelog

#### 1.3.0
- Define rated star colors per level by using an array of colors

#### 1.2.2
- Specify the lowest rating with 'minRating'

#### 1.2.1
- Adds color for manually rated stars 'ratedColor'

#### 1.2.0
- Adds public method to disable & enable stars manually

#### 1.1.1
- Fixes issue when using SVG + base tag

#### 1.1.0
- Change the star type
- Adds method to resize star on the fly

#### 1.0.1
- Fixes Firefox hover issues

#### 1.0.0
- Adds set rating, and get rating
- Adds onHover event
- Adds onLeave event

#### 0.9.4
- Fixes support for enabling full stars

#### 0.9.3
- Returns element on callback
- Fixed typos

#### 0.8.2
- Fixed bugs related to rendering in retina

#### 0.8.0
- Added readonly mode



License
------------
The MIT License (MIT)
