**Website : [autumn leaves](https://cancerberosgx.github.io/autumn-leaves/#/)**

 * Nice UI experience for ImageMagick transformations
 * small visual tools for concrete things: add a frame, distort, format conversor, remove background, etc
 * Runs 100% in the browser and offline. 
 * Easy to use, small tools for concrete tasks like adding a frame, distort, format conversor, remove background, etc
 * Both a website and a framework around WASM-ImageMagick library
 * author, store, reuse, share transformations with others. 
 * Check out [convert demo page](https://cancerberosgx.github.io/autumn-leaves/#/convertDemo) to see WAM-ImageMagick in action, navigate through IM examples, edit them and execute them on different image formats!

# STATUS / ROADMAP

 * WIP
 * separated generic-high level framework on top of wasm-imagemagick : imagemagick-browser
 * separated react related utilities in react-imagemagick
 * researching IM complex use cases
 * composite IM commands: chain of commands so some can consume other's output. WIP
 * designing a friendly JS API for IM commands
 * (research) don't know how well wasm-IM will behave for complex tasks. Done: seems to be equivalent of using IM cli, besides no supported libs like fft. 
 * start by being just a im transformation editor by just editing im CLI text. Done: https://cancerberosgx.github.io/autumn-leaves/#/convertDemo
 * try to compose (examples) real - life examples like http://www.fmwconcepts.com/imagemagick
 * then start designing and develop a nice UI to edit the commands more visually (no plain text)

# TODO / INVESTIGATE / ROADMAP

 * Issue: initial editor binding in image frame app

## Ideas

 * Idea : ImageMagick react component: <ImageMagick src="foo.png" convert=['-rotate', '88'] /> that displays given image in src using the convertion. (WIP)
 * CommandEditor : autogenerate editors for IM commands from given metadata implemented as react components. Able to render as a IM Command[] and notify changes. (WIP)
 * idea make a "photo frame" editor. (WIP)
 * composite commands (WIP)
 * test1 : commands in js - build sh script calling im that generates imgs and then show them in the page for comparing. (WIP - only compare in html UI is missing)

 * idea: image format conversion tool - png, jpg, gif, tiff, svg, pdf, psd, ps, pnm, .ico, tga, webp, xpm, xbm, xcf
 * idea: convert image.jpg -quality 75 output_file.jpg
 * idea: montage image1.jpg image2.jpg image3.jpg image4.jpg -geometry +2+2 output_montage.jpg
 * idea: convert output_montage.jpg output_montage.pdf
 * idea: merge pdfs convert pdf1.pdf pdf2.pdf output_pdf.pdf
 * idea: png2pdf and pdf2png
 * idea: build isometric shapes: https://imagemagick.org/Usage/warping/#sheared_cube
 * represent IM commands as staked compositions, ["convert","$INPUT",  "-charcoal","4","-blur", "0x2","-rotate", "40", "$OUTPUT"]  there you have three. order is importatn. users able to add/remove/move commands from the list. use auto-editor-form. be able to admin several compositions , be able to mane them and use compositions in others.
 * IM manual : https://imagemagick.org/script/command-line-processing.php
 * API to talk to the tool externally as a js library: import autumn from 'http://autumnleaves.com/lib.js'; const outputImage = await autumn.convert('http://my.img.jpg', 'myImg.png')
 * the wizard should ask first the transformation because it will be responsible of declaring how/which kind of files it requires as input. eg: user chooses pdf2png transformation so the wizard will ask the user to choose a .pdf document
 * -tint 50% -fill red - https://www.imagemagick.org/script/command-line-options.php?#filter
 * image encryption and decription toop /using text or image passprhase - https://imagemagick.org/script/cipher.php 
 * tool for morph : https://www.imagemagick.org/script/command-line-options.php#morph
 * tool for create 3d - glass enabled image : https://www.imagemagick.org/script/command-line-options.php#stereo
 * idea - crazy - 2d objects user can drag. When an object is close to another an effect on the first is made defined by the second - according to the distance. eg: the closer any object is to object A the more red-tinted is. user can move and other can be moved random or in a pattern. user can add new (images) and declare its behavior. the context contains the distance and other properties 
 
## Useful links and tips

 * magick logo: gif:- | display gif:-
 * https://www.imagemagick.org/script/examples.php




# about this setup
 * at least three projects here : imagemagick-browser (high level API for wasm-imagemagick), react-imagemagick (basic IM react componenets), autumn-leaves (end user application with visual utilities and initial research) 
 * webpack - production and dev
 * material-ui
 * typescript 
 * react, react-router
 * jest and enzyme for unit test
