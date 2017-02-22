## L-systems under a kilobyte

## Introduction

This app is an entry into the [js1k-2017](http://js1k.com/2017-magic/) competition. It implements the [Lindenmayer system](https://en.wikipedia.org/wiki/L-system) with less than 1024 bytes. It has some understandable limitations though :stuck_out_tongue_winking_eye:

## Files

`index.html` is a shim environment provided by the contest organizers.

`human-readable/app.js` is a place you might want to take a look to understand what's going on in the application.

 `src/app.js` is what was actually developed having in mind further minification. It was automatically minified into `dist/app.min.js` by the Gulp plugin.

Finally, `submission/app.min.js` is a result of aggressive minification by means of the [Closure Compiler](https://closure-compiler.appspot.com/home) and a couple of further tweaks. That's what was submitted to the competition.

## How to play

Run `index.html`. Copy this: {"step": 6, "orig": {"x": 0.1, "y": 0.1}, "dir": 20, "start": "F+", "angle": 90, "rules":["F=F+F-F-F+F"], "n":5} and paste it into the input on the top. Once the input loses focus - the app draws your L-system. Google "L-system" and enjoy tweaking that JSON!

Please note all the keys in the JSON input are mandatory. The app can fail either silently or giving you an error.

Property of the parsed object:
 - "step" - pixels per step
 - "orig" - starting point on the canvas. {"x": 0, "y": 0} - the upper left corner. {"x": 1, "y": 1} - the bottom right corner.
 - "dir" - an initial direction in degrees. 0 - like facing west.
 - "start" - an initial string from what you start to develop your L-system. An "axiom" in terms of the L-systems.
 - "rules" - is a set of production rules by which variables can be replaced with combinations of constants and other variables.
 - "angle" - an angle by which it turns left or right.
 - "n" - a number of iterations. Some of the L-systems grow very quickly and drawing them can hang your browser.

The equal sign is a reserved character and cannot be present in your rules. You can use any other characters to set up your L-system and control its flow, but only the following ones perform actual wok:
- "+" - turn right by the provided angle
- "-" - turn left by the provided angle
- "F" - step forward, pen down
- "G" - step forward, pen down
- "M" - step forward, pen up
