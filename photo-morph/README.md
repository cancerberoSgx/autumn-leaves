ideas: 

progresively start swirling the image, and tint it till is very "green" (possibly also crop and scale too). Same for the other. then concat both sequences. 

convert rose:  -swirl 1110 -crop 50% -gravity center -scale 200% -fill green -tint 100  $$UNIQUE_NAME

 * http://www.imagemagick.org/Usage/anim_opt/#speed - do the same for two images and compose blurs in the middle

size=`identify -format %wx%h rose:`
convert rose: -shear 0x10 -resize `$size`! `uniqueName`.miff
convert rose: -shear 0x20 -resize `$size`! `uniqueName`.miff
convert rose: -shear 0x30 -resize `$size`! `uniqueName`.miff
convert rose: -shear 0x40 -resize `$size`! `uniqueName`.miff
convert rose: -shear 0x60 -resize `$size`! `uniqueName`.miff
convert rose: -shear 0x70 -resize `$size`! `uniqueName`.miff
convert -delay 30 `ls *.miff` `uniqueName`.gif

* preview mode to transform quickly resizing the images to small.could be defnied by context.preview=true && optionally context.previewWidth=50 context.previewHeight=50