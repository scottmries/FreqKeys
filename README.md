# FreqKeys

FreqKeys is a synaesthetic synthesizer and visualizer for your browser! You can change the parameters to create different sounds. The waveform and colors react directly to the sounds you make!

## Technical details

There is so much cool technical stuff happening with this! Allow me to describe it.

### Colors

To get colors, I sample three points along the waveform every AnimationFrame, and map them to a 0-255 range, one each for an RGB color. I then find the two analogous colors at 30 degrees: I convert the RGB to HSV, rotate it by 30 and -30 degrees, then convert back to RGB so JS can handle them. Voila: color scheme.

### Tunings

Tuning digital instruments is trivial. Why not try out some of the many tuning systems people have used over the millenia? Here are a couple of paths down the rabbit hole:

[Equal temperament] (https://en.wikipedia.org/wiki/Equal_temperament)

[Pythagorean tuning] (https://en.wikipedia.org/wiki/Pythagorean_tuning)

[Correct temperament] (https://en.wikipedia.org/wiki/Werckmeister_temperament#Werckmeister_I_.28III.29:_.22correct_temperament.22_based_on_1.2F4_comma_divisions)

[Well tuning] (http://www.kylegann.com/wtp.html)

[5-limit] (https://en.wikipedia.org/wiki/Five-limit_tuning#Twelve_tone_scale)

I arbitrarily made C a multiple of 65hz here. In the Pythagorean system, I have C, D, F, and G set to the same frequency as their sharps, as the Pythagoreans didn't have a twelve-tone system. 5-limit tuning has dieses between F# and Gb, A# and Bb, and D and D-; I took the simpler ratio for the single key in all cases.

### Braggadocio

No jQuery (except key event handlers)! Anything that changes gets passed around in a Flux cycle. Yay!

### Future features

+ Filter and Q
+ Delay length and Feedback
+ Octave change
+ Mouse listeners
+ Responsive design
+ Multitouch support
+ Persistent database
+ Recorder stores all parameters
+ Custom waveforms and tunings
+ Envelopes
