**[autumn leaves](https://cancerberosgx.github.io/autumn-leaves/#/)**

 * Nice UI experience for ImageMagick transformations
 * Runs 100% in the browser and offline. 
 * Easy to use tools for common tasks. 
 * Both a website and a framework around WASM-ImageMagick library
 * author, store, reuse, share transformations. 

# STATUS / ROADMAP

 * WIP
 * now researching IM and designing a friendly JS API for IM commands
 * (research) don't know how well wasm-IM will behave for complex tasks.
 * start by being just a im transformation editor by just editing im CLI text
 * try to compose (examples) real - life examples like http://www.fmwconcepts.com/imagemagick
 * then start designing and develop a nice UI to edit the commands more visually (no plain text)

# TODO / INVESTIGATE

 * idea: image format conversion tool - png, jpg, gif, tiff, svg, pdf, psd, ps, pnm, .ico, tga, webp, xpm, xbm, xcf
 * idea: convert image.jpg -quality 75 output_file.jpg
 * idea: montage image1.jpg image2.jpg image3.jpg image4.jpg -geometry +2+2 output_montage.jpg
 * idea: convert output_montage.jpg output_montage.pdf
 * idea: merge pdfs convert pdf1.pdf pdf2.pdf output_pdf.pdf
 * idea: npg2pdf and pdf2png
 * IM manual : https://imagemagick.org/script/command-line-processing.php
 * API to talk to the tool externally as a js library: import autumn from 'http://autumnleaves.com/lib.js'; const outputImage = await autumn.convert('http://my.img.jpg', 'myImg.png')
 * the wizard should ask first the transformation because it will be responsible of declaring how/which kind of files it requires as input. eg: user chooses pdf2png transformation so the wizard will ask the user to choose a .pdf document

magick logo: gif:- | display gif:-




# about this setup

setup made from scratch,

## uses: 

 * webpack - production and dev
 * material-ui
 * typescript 
 * react, react-router
 * jest and enzyme for unit test
