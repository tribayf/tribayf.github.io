---
title: Randomized Bezier Patch
date: 2012-10-01
draft: false
category: Programming
incl:
  type: ytube
  uri: https://www.youtube-nocookie.com/embed/MC6mq3SbrDw
  alt: Demonstration video
---

{%
    include ytube.html
    uri=page.incl.uri
    alt=page.incl.alt
%}

Bezier patch rendering with OpenGL ES in iOS. <!--more-->Clicking the randomize button randomizes heights of the control points, which determine how the patch is drawn. Each new position is interpolated from the old position, with low-pass filtering applied to add a natural feel to the transition.
