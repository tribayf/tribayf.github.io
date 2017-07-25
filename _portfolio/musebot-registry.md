---
title: Musebot Registry
date: 2016-10-01
draft: false
category: Programming
incl:
  type: image
  uri: /assets/portfolio/musebot-registry/musebot-registry-menu.png
  alt: Musebot Registry generated menu
carousel:
 - image: /assets/portfolio/musebot-registry/musebot-registry-all.png
 - image: /assets/portfolio/musebot-registry/musebot-registry-add-new.png
 - image: /assets/portfolio/musebot-registry/musebot-registry-types.png
 - image: /assets/portfolio/musebot-registry/musebot-registry-settings.png
 - image: /assets/portfolio/musebot-registry/musebot-registry-table.png
---

{%
    include image.html
    uri=page.incl.uri
    alt=page.incl.alt
%}

A WordPress plugin, commissioned by [Musical Metacreation (MuMe)](http://musicalmetacreation.org/){:target='_blank'} for tracking and publishing information about MuMe hosted Musebots.<!--more-->

{%
    include aside.html
    float="right"
    style="text-align:left;width:33%"
    content="
    <em>What is a Musebot, you ask?</em> Musebots are networked software agents that collaborate in ensembles to produce music together in real time. Each bot performs a particular task in the effort, where they come together in an emergent fashion. It's all very exciting and you can learn more about them <a href='http://musicalmetacreation.org/musebots/' target='_blank'>here!</a>"
%}

This represents one of my best attempts at writing professional grade software---designed to meet the client's needs while keeping future developers in mind.

**Feature Summary**

- A Musebot custom post type
- A Musebot custom taxonomy
- Dynamic navigation menu generation
- Permalink management
- Custom admin panels and webforms for data entry
- A modular, object-oriented design built for extension

The plugin provides a solution to a problem the client was facing, namely the need for a central data store, a convenient and easy to use interface for data entry, automated publishing, and an effective means to browse published data in a way that would help promote and spread knowledge of the project's existence.

As MuMe were already using WordPress---full featured and extensible blogging software that utilizes the MySQL database management system---a WordPress plugin was a natural fit: make use of software that had already been adopted, and build off of current, familiar workflows without introducing unnecessary complexity.

The Musebot Registry plugin thus enables data entry in a manner that is similar to creating a new blog post or page. It provides a custom interface that constrains what information may be entered, helping maintain data consistency and avoiding introduction of errors. As Musebots naturally fall into taxonomic categories, a custom taxonomy provides the ability to tag them with the appropriate term. Once a Musebot entry is created, its data is saved to WordPress' database and published to the website. To aid in discovery, a public facing navigation menu is dynamically populated with the available taxa (see image above), each leading site visitors to a view of all Musebots tagged with the respective term.

Below are a series of screenshots for each of the administration panels exposed by the plugin. The final image shows how the data for a single Musebot is rendered for public consumption. *Note that a separate plugin called Tabby was used to wrap the individual entries in a tabs. Tabby is released by another developer and is not part of the Musebot Registry plugin.*

<div class="flexslider-container">
    <div class="flexslider">
      <ul class="slides">
        {% for slides in page.carousel %}
        <li data-thumb="{{ slides.image }}">
            <div class="slider-image">
                <a href="{{ slides.image }}" target="_blank"><img src="{{ slides.image }}"></a>
            </div>
        </li>
        {% endfor %}
      </ul>
    </div>
    <span><em>* click images to expand</em></span>
</div>
