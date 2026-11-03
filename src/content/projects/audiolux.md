---
title: "Audiolux"
pn: "BS-FFT-16"
year: "2016"
lede: "An LED light show that reacts to music in real time. A Teensy splits incoming audio into frequency bands and maps each one to the lights."
order: 6
summary: "A real-time, audio-synchronized light show."
bullets:
  - "A Teensy runs a 1024-point FFT on incoming audio"
  - "Each of 16 frequency bands drives its own LEDs"
links:
  - ["Source", "https://github.com/benshanahan1/audiolux2"]
image: "/img/audiolux/case-side.jpg"
imageAlt: "Audiolux light controller"
specs:
  - ["Built with", "Teensy, C++"]
  - ["FFT", "1024 point, 16 bins"]
  - ["Source", "<a href=\"https://github.com/benshanahan1/audiolux2\" target=\"_blank\" rel=\"noreferrer\">GitHub</a>"]
---

![Side view of the Audiolux case. Switches turn each LED strip on and off.](/img/audiolux/case-side.jpg "Side view of the Audiolux case. Switches turn each LED strip on and off.")

The original Audiolux was a project for an art class. For the upgraded version, I switched to a faster microcontroller (a Teensy) that could run a small real-time FFT onboard. That let it visualize the frequency spectrum of the incoming audio instead of just its amplitude.

Audiolux reads incoming audio as an analog input on the microcontroller, then runs a real-time 1024 point FFT on it. It bins the FFT output logarithmically into 16 bins and assigns each one a color. The result is a hypnotizing audio-synchronized light show.

![The underside of the board.](/img/audiolux/board-bottom.jpg "The underside of the board.")

Two longer strips act as bass visualizers: a pulse of light shoots down them whenever the lowest FFT bin passes a set threshold.

<figure class="fig" data-caption="Audiolux in action"><iframe src="https://www.youtube-nocookie.com/embed/jn_87JqG4mw" title="Audiolux in action" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>
