# FreqKeys

![Screenshot](http://i.imgur.com/PMGHIaX.png)

[Shred here.](https://freqkeys.xyz/)

FreqKeys is a synaesthetic synthesizer for your browser! You can change the parameters to create different sounds and colors. The waveform and colors react directly to the sounds you make.

## Technical details

There is so much cool technical stuff happening with this! Allow me to describe it.

### Colors

To get colors, I sample three points along the waveform every AnimationFrame, and map them to a 0-255 range, one each for an RGB color. I then find the two split-complementary colors at 30 degrees: I convert the RGB to HSV, rotate it by 150 and -150 degrees, then convert back to RGB so JS can handle them. Voila: color scheme.

### Waveforms

Note that different waveforms seem to have far different "volumes", all else being the same; mathematically, their amplitudes are identical, but the accumulation of overtones, especially in the sawtooth and square waves, spread out over the curve of your ear's frequency/amplitude response, while a sine wave only hits exactly one frequency. TL;DR: some waveforms just sound louder.

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
+ Responsive design
+ Multitouch support
+ Persistent database
+ Recorder stores all parameters
+ Envelopes
