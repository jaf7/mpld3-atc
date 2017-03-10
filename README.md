# mpld3-growth-complexity-demo

A learning project that will present descriptions and interactive plots for growth complexities of algorithms as described in big-O notation.  

## Purpose

* To learn more about the tools used: Python, JavaScript, jQuery, HTML/CSS, matplotlib, mpld3, Flask, Heroku
* To begin to learn what back-end and front-end are and how they function
* To review the basics of algorithmic growth complexity learned in MIT 6.00.1x
* To take joy in the study

## Demo

[Heroku app](https://mpld3-growth-complexity-demo.herokuapp.com) - Work in progress! Single dyno: first request needs a couple of seconds to wake up

## Built Using

* [HTML/CSS](http://learn.shayhowe.com/html-css/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [jQuery](https://jquery.com/)
* [Python](https://www.python.org) - Back-end: Using matplotlib & mpld3 to dynamically generate graphic comparisons of orders of growth
* [Flask](http://flask.pocoo.org/) - Microframework for web apps: used with Python for back-end
* [matplotlib](http://matplotlib.org/) - Python 2D plotting library: used to generate plot figures
* [mpld3](http://mpld3.github.io/) - Used to export matplotlib graphics to HTML (renders [D3](https://d3js.org/))
* Forked from [mpld3-flask](https://github.com/nipunbatra/mpld3-flask) - Minimal Flask app using mpld3
* [Underscore.js](underscorejs.org) - Great utility library, learned about debounce()
* [Responsive Bootstrap Toolkit](https://github.com/maciej-gurban/responsive-bootstrap-toolkit) - Breakpoint detection in JavaScript
* [noUiSlider](https://refreshless.com/nouislider/) - Lightweight JavaScript range slider
* [Waypoints](http://imakewebthings.com/waypoints/) - Javascript library for triggering functions when scrolling to elements
* [classList.js](https://github.com/eligrey/classList.js) - Make element.classList work for older IE browsers (cross-browser JS shim)

## Resources Used

* [MIT 6.00.1x Intro to Computer Science and Programming Using Python](https://www.edx.org/course/introduction-computer-science-mitx-6-00-1x-9)
* [Eloquent JavaScript](eloquentjavascript.net) - Chaps 1-6, reviewing
* [Dash](https://kapeli.com/dash) - API Documentation Browser: Incredibly useful piece of software
* [Debounce Function Explained](https://davidwalsh.name/javascript-debounce-function) - David Walsh, excellent JS resource
* [Demystifying Debounce in JS](https://john-dugan.com/javascript-debounce/) - John Dugan, another helpful JS resource
* [How JavaScript Timers Work](http://ejohn.org/blog/how-javascript-timers-work/) - John Resig, creator of [jQuery](https://jquery.com)
* [html5Doctor](http://html5doctor.com/) - HTML5 learning resource
* [matplotlib - What is a Backend?](http://matplotlib.org/faq/usage_faq.html#what-is-a-backend)
* [matplotlib in a webapp server](http://matplotlib.org/faq/howto_faq.html#matplotlib-in-a-web-application-server)
* [IIFE lesson](https://www.kirupa.com/html5/immediately_invoked_function_expressions_iife.htm) - Immediately Invoked Function Expressions @ Kirupa.com: wonderful JavaScript lessons
* [IIFE tutorial](http://www.tutorialsteacher.com/javascript/immediately-invoked-function-expression-iife) - Another helpful tutorial on Immediately Invoked Function Expressions
* [Writing Better Ajax](https://medium.com/coding-design/writing-better-ajax-8ee4a7fb95f#.wkx1uei9f) - Terry Mun on [Medium](https://medium.com)
* [What are Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises) - Web | Google Developers
* [Debugging JS in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/) - Web | Google Developers
* [git-scm](https://git-scm.com) - git learning resource
* [Stack Overflow](stackoverflow.com) - At least 5 times a day!

#### TODO

* Improve structure and readability of app.js []
* Work on understanding debouncing & implement [x]
* Add debounce() functionality to waypoint scrolling function []
* Get responsive resizing of graphs working correctly []
* Fix MathJax font & button responsiveness []
* Refactor app.js using Object Oriented principles []
* Improve / re-design styling and layout [\\]
* Finish writing content
  (descriptions and resources for analysis of orders of growth and big-O) []
* ...
