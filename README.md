## L-systems under a kilobyte

### Introduction

This app is an entry into the [js1k-2017](http://js1k.com/2017-magic/) competition. It implements the [Lindenmayer system](https://en.wikipedia.org/wiki/L-system) with less than 1024 bytes. It has some understandable limitations though :stuck_out_tongue_winking_eye:

## Files

`index.html` is a shim environment provided by the contest organizers.

`human-readable/app.js` is a place you might want to take a look to understand what's going on in the application.

 `src/app.js` is what was actually developed having in mind further minification. It was automatically minified into `dist/app.min.js` by the Gulp plugin.

Finally, `submission/app.min.js` is a result of aggressive minification by means of the [Closure Compiler](https://closure-compiler.appspot.com/home) and a couple of further tweaks. That's what was submitted to the competition.
