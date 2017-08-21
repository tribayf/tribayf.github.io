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
- image: /assets/portfolio/maxscore-for-ipad/client-server/before-connecting.png
  desc: "Prior to connecting iPad client to server"
- image: /assets/portfolio/maxscore-for-ipad/client-server/after-connecting.png
  desc: "After connecting, the server's UI provides feedback indicating that user \"Clarinet\" has connected."
- image: /assets/portfolio/maxscore-for-ipad/client-server/after-sending-score.png
  desc: "After sending a score to the iPad"
- image: /assets/portfolio/maxscore-for-ipad/client-server/after-booting.png
  desc: "After booting all connected iPads"
comparisons:
- image: /assets/portfolio/maxscore-for-ipad/comparisons/dots-and-beams-ms.png
  desc: "Dots and beams in MaxScore"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/dots-and-beams-ipad.png
  desc: "Dots and beams in MaxScore for iPad"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/enharmonic-spell-ms.png
  desc: "Enharmonic spellings in MaxScore"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/enharmonic-spell-ipad.png
  desc: "Enharmonic spellings in MaxScore for iPad"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/keysig-accidentals-ms.png
  desc: "Key signatures and accidentals in MaxScore"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/keysig-accidentals-ipad.png
  desc: "Key signatures and accidentals in MaxScore for iPad"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-01-ms.png
  desc: "Ties and slurs in MaxScore"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-01-ipad.png
  desc: "Ties and slurs in MaxScore for iPad"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-02-ms.png
  desc: "More ties and slurs in MaxScore"
- image: /assets/portfolio/maxscore-for-ipad/comparisons/ties-slurs-02-ipad.png
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

One of the largest projects I've worked on to date, MaxScore for iPad is a software package developed for realtime distribution of musical scores to musicians for live performance. It was commissioned by Dr. Arne Eigenfeldt for use in his research in [Music for Humans by Machine](https://aeigenfeldt.wordpress.com/music-for-humans-by-machine/){:target='_blank'}.

MaxScore for iPad has been used in two performances of Dr. Eigenfelt's *An Unnatural Selection*. The first was by Vancouver's Turning Point Ensemble May 2, 2014 at SFU Woodwards in Vancouver, and the second at Sound and Music Computing in Hamburg, August 2016, as part of the S.T.R.E.A.M. Festival at Kampnagel.

Video links:
- [Turning Point Ensemble](https://www.youtube.com/watch?v=ILL-eDwdnDg){:target="_blank"}
- [S.T.R.E.A.M. Festival](https://youtu.be/kZ9JvmS9Tno){:target="_blank"}

### Technical Explanation

MaxScore for iPad comprises two components: a server for transmitting scores to musicians via network connection, and an iPad application for rendering scores to screen as they are received. That's the *TL;DR*, anyhow. The long explanation follows, but first I want to clear up a potential point of confusion:

There are three things that I am going to refer to with "Max" in their name. First is [Max](https://cycling74.com/){:target="_blank"} (also known as Max/MSP), a graphical environment for multimedia programming. Second is [MaxScore](http://www.computermusicnotation.com/){:target='_blank'}, a music notation package that facilities musical score creation within Max. Finally, there is my work, <span style="color:black; font-weight:400;">MaxScore for iPad</span>---not officially a part of MaxScore, but named for it because MaxScore for iPad understands a subset of the MaxScore's native XML format---more on this later. So, yes, those are the three things with "Max" in their name, and hopefully I've cleared up any potential for confusion. Okay, on with the explaining!

{%
    include figure.html
    uri='/assets/portfolio/maxscore-for-ipad/system-organization.svg'
    alt='component diagram'
    clickable=true
    caption="System diagram"
%}

The diagram above gives a broad overview of how the system is configured. First is Dr. Eignefeldt's generative music system, responsible for algorithmically generating novel music. Once generated, the music is forwarded to the first part of my work, the MaxScore for iPad server module. The server module manages persistent connections with iPads running MaxScore for iPad software and transmitting music to them such that each player receives their intended parts. On receipt of a musical part by an iPad, the music is quickly parsed and rendered to screen.

Going into further detail, the generative system interacts with MaxScore (the Max package that brings musical score creation to Max) to generate an internal representation of the music. On completion of a new score, the representation is exported to XML, then forwarded to the server module. The exported XML natively represents MaxScore's internal representation. This is the basis for naming MaxScore for iPad, as it understands a subset of this XML. As developing a package that could parse many formats was out of the scope of the project, it is in this sense that MaxScore for iPad is something of an extension of MaxScore while not officially being a part of it.

Drilling down into the server module, there are three major components. The first contains logic for splitting and routing scores. Scores are received from the generative system such that they contain the parts for all players, and must therefore be split into parts and routed accordingly. Following the splitting/routing logic is the server-proper. The server was written in Java because it is more amenable to server-side programming than Max; however, this required that the server be packaged as a Max object to be able to run in within the Max environment. Finally, a graphical interface for the server enables manually interacting with it, as well as provides a place for entering score splitting rules.

For each connection with an iPad, a widget is drawn representing that connection. Included in the widget are the display name entered for the player (defaulting to "Anonymous" if none was entered), as well as a field for entering a score splitting rule. Score splitting rules are entered for each connection, and offer the flexibility of specifying any combination of parts to be sent to any player.

Another feature of the server is that it offers two modes of transmitting scores---immediate and retained. When scores are received from the generative system, they are immediately transmitted to the players. However, scores may also be loaded from the file system and will be retained until being prompted to send via clicking the interface's Send button. Scores may additionally be previewed using MaxScore's canvas object by clicking the Open Canvas button. A few other actions are made available through the interface, which can be seen from the images below.

{%
    include slider.html
    name="client-server"
    slides=page.clientserver
%}

Finally we get to the iPad application---the pièce de résistance of this work. The MaxScore for iPad app functions to communicate with the server, as well as efficiently parse and render music as it is received. One of the main challenges of was, not surprisingly, to get parsing and rendering to happen quickly in order to support realtime performances. (In the case of *An Unnatural Selection*, score parts were sent 3 measures at a time. The first two were performed, while the third previewed what was to come next.)

For interacting with the app, two screens and a rather... utilitarian interface are provided. The first screen includes a few settings and controls for managing connections with the server. Prior to connecting, an optional name may be entered for the player using the iPad (e.g. "Clarinet" for the clarinet player). The name need not be unique as the server assigns an identifier to each iPad as it connects. Once connected, the second screen can be navigated to, where scores will be displayed as they are rendered.

Early on in this project, I learned that the layout of music notation, or *engraving* as it is called, is an art form. There is no single, correct way to do it. In terms of computation it is an NP Hard problem. To get around this, MaxScore for iPad uses several heuristics. There are no fancy intelligent algorithms in use. Rather, it is somewhat like an expert system employing many if-else rules. Using MaxScore's own canvas output as an authoritative source of what "correct" rendering should look like, was also a natural choice to make.

The next set of images compares the rending between MaxScore and MaxScore for iPad. These examples are not meant to be musical, but rather to produce a number of unique situations for rendering. You may notice a few ways in which the rendering differs. Most notably, MaxScore for iPad uses bezier curves for drawing note ties and slurs for a more natural look.

{%
    include slider.html
    name="comparisons"
    slides=page.comparisons
%}

### Conclusion

This was one of the most challenging projects I have taken on to date. Not least of the challenges encountered was all of the learning that I had to do. In pretty much every aspect of the work, I was starting out fresh, without any prior knowledge of what is needed to develop a software package that operates across multiple platforms requiring the use of several programming languages (namely Max's graphical, object based language; JavaScript for parts of the server's interface; and Objective-C for the iPads), and incorporates both client- and serve-side network programming, XML parsing, and advanced use of fonts (i.e. music fonts) in conjunction with 2D graphics programming. On top of everything, the software had to efficiently and reliably get the music to the musicians, while rendering the music correctly and legibly.

Needless to say, I learned a ton. The project was large enough that I had to really persevere to get it done, but I finished, and I am glad to now be able to share my work with interested people. Of course, I am also happy to have seen it used in two performances before large audiences!

If you have stuck with my article this far I would like to thank you for reading through. It was difficult to keep it both short and informative. If you have any questions regarding something that was not addressed above, please feel free to contact me.

Finally, I would like to thank Dr. Eigenfeldt for his belief in me and providing me with the opportunity to work on this project, from which I have gained so much valuable experience.
