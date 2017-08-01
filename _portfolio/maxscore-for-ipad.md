---
title: MaxScore for iPad
date: 2014-05-2
draft: false
category: Programming
incl:
  type: image
  uri: /assets/portfolio/maxscore-for-ipad/an-unnatarual-selection.jpg
  alt: Musicians playing first act of An Unnatural Selection
flexslider: true
clientserver:
-
  image: /assets/portfolio/maxscore-for-ipad/client-server/before-connecting.png
  desc: "Prior to connecting iPad client to server"
-
  image: /assets/portfolio/maxscore-for-ipad/client-server/after-connecting.png
  desc: "After connecting, the server's UI provides feedback indicating that user \"Clarinet\" has connected."
-
  image: /assets/portfolio/maxscore-for-ipad/client-server/after-sending-score.png
  desc: "After sending a score to the iPad"
-
  image: /assets/portfolio/maxscore-for-ipad/client-server/after-booting.png
  desc: "After booting all connected iPads"
comparisons:
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/dots-and-beams-ms.png
  desc: "Dots and beams in MaxScore"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/dots-and-beams-ipad.png
  desc: "Dots and beams in MaxScore for iPad"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/enharmonic-spell-ms.png
  desc: "Enharmonic spellings in MaxScore"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/enharmonic-spell-ipad.png
  desc: "Enharmonic spellings in MaxScore for iPad"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/keysig-accidentals-ms.png
  desc: "Key signatures and accidentals in MaxScore"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/keysig-accidentals-ipad.png
  desc: "Key signatures and accidentals in MaxScore for iPad"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-01-ms.png
  desc: "Ties and slurs in MaxScore"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-01-ipad.png
  desc: "Ties and slurs in MaxScore for iPad"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-02-ms.png
  desc: "More ties and slurs in MaxScore"
-
  image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-02-ipad.png
  desc: "More ties and slurs in MaxScore for iPad"
---

{%
    include figure.html
    uri=page.incl.uri
    alt=page.incl.alt
    caption="<cite>An Unnatrual Selection</cite> by Dr. Arne Eigenfelt. Performed by the Turning Point Ensemble at SFU Woodwards (May 2, 2014). The musicians are sight-reading their music from my iPad software!"
%}

<!--more-->

### Introduction

One of the largest projects I've worked on to date, MaxScore for iPad is a software package developed for realtime distribution of musical scores to musicians for live performance. It was commissioned by Dr. Arne Eigenfeldt for use in his research in [music for humans by machines](https://aeigenfeldt.wordpress.com/music-for-humans-by-machine/){:target='_blank'}.

MaxScore for iPad has been used in two performances of Dr. Eigenfelt's *An Unnatural Selection*. The first performance was by Vancouver's Turning Point Ensemble May 2, 2014 at SFU Woodwards in Vancouver, and the second at Sound and Music Computing in Hamburg, August 2016, as part of the S.T.R.E.A.M. Festival at Kampnagel.

Video links:
- [Turning Point Ensemble](https://www.youtube.com/watch?v=ILL-eDwdnDg){:target="_blank"}
- [S.T.R.E.A.M. Festival](https://youtu.be/kZ9JvmS9Tno){:target="_blank"}

### Technical Explanation

[TODO]

<br>

{%
    include figure.html
    uri='/assets/portfolio/maxscore-for-ipad/system-organization.svg'
    alt='System organization diagram'
    clickable=true
    caption='System organization'
%}

<br>

{%
    include slider.html
    name='client-server'
    slides=page.clientserver
%}

<br>

{%
    include slider.html
    name='comparisons'
    slides=page.comparisons
%}


### Challenges

[TODO]
