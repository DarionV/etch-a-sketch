# The Odin Project - Etch-A-Sketch

This is an assignment from The Odin Project. The goal was to practice flexbox, CSS and Javascript while creating a simple drawing application.

## Assignment
 - Generate a grid of divs that will act as a canvas. The divs will be
   "pixels" that can be painted. 
 - Add button that lets user change the grid size.
 - Add button that randomizes colors.
 - Hover effect when hovering over a pixel

Full description: https://www.theodinproject.com/lessons/foundations-etch-a-sketch

## Idea
I knew I wanted to create visually pleasing drawing application. The old school devices from the 70's inspired me and the video game PONG was what I used as main source of inspiration. The idea was to create something that looked like an old retro device. Even though not practical, it would act as a good opportunity to practice CSS. 

I took some liberties and removed some of the requested features from the original assignment to better suit my idea.

## Problems
**Problem**
An issue I identified early was that it wouldn't be possible to combine different grid sizes when drawing. I wanted the user to be able to draw with a small brush then, change to a bigger size and continue drawing with the canvas being unchanged. 
**Solution**
I decided to generate a grid with the smallest grid size. This grid of divs would act as the pixels that would light up. They will never change size.

I then generated another grid *on top* of the pixels. This is the grid that the user will interact with. When the user clicks a grid element on this grid, the app checks the bounding box coordinates for the grid element and finds the pixels that corresponds to the same coordinates. It then paints the pixels. 

**Problem**
In my previous project, "Rock, Paper, Scissors", I used a lot of images and sounds that increased the load time of the page. I wanted to still have a visually pleasing page but with faster load time.
**Solution**
Instead of relying too much on images I tried creating the graphics with CSS. It was a good opportunity to practice and learn different CSS techniques. Every element except for the coiled cord, the noise effect on the tablet, and the reflections in the screen is done with CSS.

**Problem**
I knew I wanted to have a screen with an old CRT-monitor feel to it with flickering and scanlines and some chromatic aberration. My initial thought was to create a   red and a blue colored div with offset in different directions for each pixels but that would turn out to be too unpractical. 
**Solution**
For the CRT-effect I added a small shadow that matched the pixel color so that the pixels would look a bit blurry. For the flickering, I added a black div and key framed the opacity. I found a tutorial online that already had the key frames laid out for a nice flicker effect so I used that. I then added the scanlines that had a simple translate animation. 

For the chromatic aberration I learned that its possible to have multiple shadows on the same element. That way I could make a red shadow and a blue shadow to create a chromatic aberration effect.

**Problem**
When browsing through the other submissions for this project I noticed that there was never a visual feedback when changing the grid size which made it hard to dial in the size you wanted.
**Solution**
Keep track of if the grid is toggled on or not by the user. If not, display the grid while changing the size. I think it makes for a bit nicer user experience.

## Takeaways

I learned a lot about styling and positioning elements with CSS. I realized you can make use of multiple box-shadows on the same element to create interesting effects. When creating the pencil and buttons I learned about linear gradients, clipping paths and variables in CSS. The flickering screen was a useful for learning a bit about animations and keyframes. 

I also learned the hard way about naming your classes in a structured way and to keep your html files nice and tidy. 

I'm pleased with the result and I'm happy that I was able to create the image I had in my mind. 



