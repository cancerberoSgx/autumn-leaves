Abstractions and types fof WASM-ImageMagick so it's easy to use.

**WIP**

## Chain: easy API

There is WIP for an easy programatic API to build up IM commands. Right now just a POC but the idea is to make it grow. Objectives : 

 * IM commands described with interfaces so is easy to get started with them
 * chained API to build and execute a command in one statement.

Example:

```js
import {convert } from 'imagemagick-browser'
// execute in one statement
const result = await convert('img1.png').rotate(33).image('output.png').execute()

// just build a command that can be then `execute()`
const command = convert(['img1.png', 'img2.png']).image('output2.gif').toCommand()
```

# TODO
 * execute() to work with array of commands - right now just executing the first one - make all output images available to subsequent commands
 * require() and run from node.js