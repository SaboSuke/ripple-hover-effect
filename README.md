# Ripple Hover Effect

Javascript library to animate images on hover.

If this project help you, don't forget to star it.

[Codepen demo](https://codepen.io/Sabosuke/pen/eYWLGjv) by Essam Abed

## Demo

https://user-images.githubusercontent.com/42716267/128242527-6c0b5d7e-70cd-4fb9-83c3-34d5960f233d.mp4

## Installation 

Install using npm:

```
    npm i ripple-hover-effect
```

Or use a cdn:

> https://unpkg.com/browse/ripple-hover-effect@1.0.0/src/ripple-effect.js

## Use locally
To load the images you'll need to view the demo via a web server, simply open the projet with vscode then run the `index.html` file with `Live Server`.

## Basic usage

This little library needs [Three.js](https://threejs.org) and [Gsap](https://greensock.com/) to do the transition, so you need to include it before this library.

How it works:

```html
<!-- Div to draw the effect on -->
<div class="my-div"></div>

<!-- library needed -->
<script src="three.min.js"></script>
<script src="gsap.min.js"></script>

<script src="dist/ripple-effect.js"></script>
<script>
    var ripple = new RippleEffect({
        parent: document.querySelector('.my-div'),
        intensity: 1,
        strength: 2,
        area: 4,
        waveSpeed: 0.001,
        speedIn: 2,
        speedOut: 1.5,
        easing: 'Expo.easeInOut',
        hover: true,
        texture: './img/my-img.jpg',
    });
</script>
```

## Options

### Mandatory parameters

| Name                    | Type            | Default         | Description |
|-------------------------|-----------------|-----------------|-------------|
|`parent`                 | `Dom element`   | `null`          | The DOM element where the animation will be injected. The images of the animation will take the parent's size. |
|`texture`                | `Image`         | `null`          | The `Image` of the animation. |

### Optional parameters

| Name                    | Type      | Default         | Description |
|-------------------------|-----------|-----------------|-------------|
|`intensity`              | `Float`   | `1`             | Used to determine the intensity of the ripple effect. 0 is no effect and 1 is full ripple. |
|`strength`               | `Float`   | `2`             | Strength of the ripple effect. |
|`area`                   | `Float`   | `6`             | Area affected by the ripple effect. |
|`waveSpeed`              | `Float`   | `0.01`          | Ripple waves travel speed. |
|`speedIn`                | `Float`   | `1.4`           | Speed of the inbound animation (in seconds). |
|`speedOut`               | `Float`   | `1.2`           | Speed of the outbound animation (in seconds). |
|`hover`                  | `Boolean` | `true`          | if set to false the animation will not be triggered on hover (see `start` and `stop` function to interact) |
|`easing`                 | `String`  | `Expo.easeOut`  | Easing of the transition, see [greensock easing](https://greensock.com/ease-visualizer)|image width` example: `1080 / 1920` |

### Methods

| Name                    | Description             |
|-------------------------|-------------------------|
|`start`                  | Start the ripple effect.|
|`stop`                   | Stop the ripple effect. |

## Credits
Thanks to :
*   [Three.js](https://threejs.org)
*   Gsap by [GreenSock](https://greensock.com/)
*   Images from [Unsplash.com](http://unsplash.com/)


## Example

https://user-images.githubusercontent.com/42716267/128239935-5ce12c7a-00ba-4ce7-adc6-15443d1cffc2.mp4
