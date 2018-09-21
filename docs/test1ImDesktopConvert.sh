
rm -rf test1ImOutput
mkdir test1ImOutput
convert rotate.png -distort barrel '0.7 -0.009 0.0' -resize 200% test1ImOutput/distorBarrel1_rotateOut.png
convert rotate.png -rotate 90 -resize 200% test1ImOutput/rotateAndResize1_rotateOut.png
convert rotate.png -sigmoidal-contrast 4,0% test1ImOutput/sigmoidalContrast1_rotateOut.png
convert rotate.png -sparse-color Barycentric '0,0 black 0,%h white' -function polynomial 4,-4,1 test1ImOutput/sparseColor1_rotateOut.png
convert rotate.png -sigmoidal-contrast 15x30% '(' +clone -sparse-color Barycentric '0,0 black 0,%h gray80' -solarize 50% -level 50%,0 ')' -compose Blur -set option:compose:args 10 -composite test1ImOutput/composite1_rotateOut.png
convert rotate.png -colorspace HSL -channel Hue -separate test1ImOutput/colorspaceChannelSeparate1_rotateOut.png
convert Hermitcrab.gif -distort barrel '0.7 -0.009 0.0' -resize 200% test1ImOutput/distorBarrel1_HermitcrabOut.gif
convert Hermitcrab.gif -rotate 90 -resize 200% test1ImOutput/rotateAndResize1_HermitcrabOut.gif
convert Hermitcrab.gif -sigmoidal-contrast 4,0% test1ImOutput/sigmoidalContrast1_HermitcrabOut.gif
convert Hermitcrab.gif -sparse-color Barycentric '0,0 black 0,%h white' -function polynomial 4,-4,1 test1ImOutput/sparseColor1_HermitcrabOut.gif
convert Hermitcrab.gif -sigmoidal-contrast 15x30% '(' +clone -sparse-color Barycentric '0,0 black 0,%h gray80' -solarize 50% -level 50%,0 ')' -compose Blur -set option:compose:args 10 -composite test1ImOutput/composite1_HermitcrabOut.gif
convert Hermitcrab.gif -colorspace HSL -channel Hue -separate test1ImOutput/colorspaceChannelSeparate1_HermitcrabOut.gif
convert zelda.gif -distort barrel '0.7 -0.009 0.0' -resize 200% test1ImOutput/distorBarrel1_zeldaOut.gif
convert zelda.gif -rotate 90 -resize 200% test1ImOutput/rotateAndResize1_zeldaOut.gif
convert zelda.gif -sigmoidal-contrast 4,0% test1ImOutput/sigmoidalContrast1_zeldaOut.gif
convert zelda.gif -sparse-color Barycentric '0,0 black 0,%h white' -function polynomial 4,-4,1 test1ImOutput/sparseColor1_zeldaOut.gif
convert zelda.gif -sigmoidal-contrast 15x30% '(' +clone -sparse-color Barycentric '0,0 black 0,%h gray80' -solarize 50% -level 50%,0 ')' -compose Blur -set option:compose:args 10 -composite test1ImOutput/composite1_zeldaOut.gif
convert zelda.gif -colorspace HSL -channel Hue -separate test1ImOutput/colorspaceChannelSeparate1_zeldaOut.gif
convert gnu.jpg -distort barrel '0.7 -0.009 0.0' -resize 200% test1ImOutput/distorBarrel1_gnuOut.jpg
convert gnu.jpg -rotate 90 -resize 200% test1ImOutput/rotateAndResize1_gnuOut.jpg
convert gnu.jpg -sigmoidal-contrast 4,0% test1ImOutput/sigmoidalContrast1_gnuOut.jpg
convert gnu.jpg -sparse-color Barycentric '0,0 black 0,%h white' -function polynomial 4,-4,1 test1ImOutput/sparseColor1_gnuOut.jpg
convert gnu.jpg -sigmoidal-contrast 15x30% '(' +clone -sparse-color Barycentric '0,0 black 0,%h gray80' -solarize 50% -level 50%,0 ')' -compose Blur -set option:compose:args 10 -composite test1ImOutput/composite1_gnuOut.jpg
convert gnu.jpg -colorspace HSL -channel Hue -separate test1ImOutput/colorspaceChannelSeparate1_gnuOut.jpg
convert react.svg -distort barrel '0.7 -0.009 0.0' -resize 200% test1ImOutput/distorBarrel1_reactOut.png
convert react.svg -rotate 90 -resize 200% test1ImOutput/rotateAndResize1_reactOut.png
convert react.svg -sigmoidal-contrast 4,0% test1ImOutput/sigmoidalContrast1_reactOut.png
convert react.svg -sparse-color Barycentric '0,0 black 0,%h white' -function polynomial 4,-4,1 test1ImOutput/sparseColor1_reactOut.png
convert react.svg -sigmoidal-contrast 15x30% '(' +clone -sparse-color Barycentric '0,0 black 0,%h gray80' -solarize 50% -level 50%,0 ')' -compose Blur -set option:compose:args 10 -composite test1ImOutput/composite1_reactOut.png
convert react.svg -colorspace HSL -channel Hue -separate test1ImOutput/colorspaceChannelSeparate1_reactOut.png
convert pic.tiff -distort barrel '0.7 -0.009 0.0' -resize 200% test1ImOutput/distorBarrel1_picOut.png
convert pic.tiff -rotate 90 -resize 200% test1ImOutput/rotateAndResize1_picOut.png
convert pic.tiff -sigmoidal-contrast 4,0% test1ImOutput/sigmoidalContrast1_picOut.png
convert pic.tiff -sparse-color Barycentric '0,0 black 0,%h white' -function polynomial 4,-4,1 test1ImOutput/sparseColor1_picOut.png
convert pic.tiff -sigmoidal-contrast 15x30% '(' +clone -sparse-color Barycentric '0,0 black 0,%h gray80' -solarize 50% -level 50%,0 ')' -compose Blur -set option:compose:args 10 -composite test1ImOutput/composite1_picOut.png
convert pic.tiff -colorspace HSL -channel Hue -separate test1ImOutput/colorspaceChannelSeparate1_picOut.png
convert holocaust.jpg -distort barrel '0.7 -0.009 0.0' -resize 200% test1ImOutput/distorBarrel1_holocaustOut.png
convert holocaust.jpg -rotate 90 -resize 200% test1ImOutput/rotateAndResize1_holocaustOut.png
convert holocaust.jpg -sigmoidal-contrast 4,0% test1ImOutput/sigmoidalContrast1_holocaustOut.png
convert holocaust.jpg -sparse-color Barycentric '0,0 black 0,%h white' -function polynomial 4,-4,1 test1ImOutput/sparseColor1_holocaustOut.png
convert holocaust.jpg -sigmoidal-contrast 15x30% '(' +clone -sparse-color Barycentric '0,0 black 0,%h gray80' -solarize 50% -level 50%,0 ')' -compose Blur -set option:compose:args 10 -composite test1ImOutput/composite1_holocaustOut.png
convert holocaust.jpg -colorspace HSL -channel Hue -separate test1ImOutput/colorspaceChannelSeparate1_holocaustOut.png

