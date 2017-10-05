# mpld3-growth-complexity-demo

A learning project that presents descriptions of algorithm growth complexities and big-O notation using interactive plots.

## Purpose

* To learn more about the tools used: Python, JavaScript, jQuery, HTML/CSS, matplotlib, mpld3, Flask, Heroku, virtualenv
* To begin to learn what back-end and front-end are and how they function
* To review the basics of algorithmic growth complexity learned in [MIT 6.00.1x](https://www.edx.org/course/introduction-computer-science-mitx-6-00-1x-9) ([certificate](https://courses.edx.org/certificates/be5594d409634b2fb9bbf9b668939c47))
* To take joy in the study

## Demo

[Heroku app](https://mpld3-growth-complexity-demo.herokuapp.com) - Single dyno: first request needs a couple of seconds to spin up. N.B. Mobile (< ~480px width) presentation is less complete.

## Built Using

* [HTML/CSS](http://learn.shayhowe.com/html-css/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [jQuery](https://jquery.com/)
* [Python](https://www.python.org) - Back-end: Using matplotlib & mpld3 to dynamically generate graphic comparisons of orders of growth
* [Flask](http://flask.pocoo.org/) - Microframework for web apps: used with Python for back-end
* [matplotlib](http://matplotlib.org/) - Python 2D plotting library: used to generate plot figures
* [mpld3](http://mpld3.github.io/) - Used to export matplotlib graphics to HTML (renders [D3](https://d3js.org/))
* [Heroku](https://devcenter.heroku.com/) - deployed to Heroku remote, running on a single web dyno
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) - For running a local development server inside a virtual environment, logging to stdout, spinning up dynos
* Forked from [mpld3-flask](https://github.com/nipunbatra/mpld3-flask) - Minimal Flask app using mpld3
* [Underscore.js](underscorejs.org) - Great utility library, learned about debounce()
* [StackOverflow debounce answer](http://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript) - A helpful explication of how debounce() works
* [Responsive Bootstrap Toolkit](https://github.com/maciej-gurban/responsive-bootstrap-toolkit) - Breakpoint detection in JavaScript (not used in latest version: implemented custom detection/adjustment from scratch, but very valuable to learn from especially OO design)
* [noUiSlider](https://refreshless.com/nouislider/) - Lightweight JavaScript range slider
* [Waypoints](http://imakewebthings.com/waypoints/) - Javascript library for triggering functions when scrolling to elements
* [classList.js](https://github.com/eligrey/classList.js) - Make element.classList work for older IE browsers (cross-browser JS shim)

## Resources Used

* [MIT 6.00.1x Intro to Computer Science and Programming Using Python](https://www.edx.org/course/introduction-computer-science-mitx-6-00-1x-9)
* [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms) Currently reading
* [Computer Science Distilled](https://leanpub.com/computer-science-distilled) - Currently reading
* [Eloquent JavaScript](eloquentjavascript.net) - Chaps 1-6, reviewing
* [Dash](https://kapeli.com/dash) - API Documentation Browser: Incredibly useful piece of software
* [Debounce Function Explained](https://davidwalsh.name/javascript-debounce-function) - David Walsh, excellent JS resource
* [Demystifying Debounce in JS](https://john-dugan.com/javascript-debounce/) - John Dugan, another helpful JS resource
* [How JavaScript Timers Work](http://ejohn.org/blog/how-javascript-timers-work/) - John Resig, creator of [jQuery](https://jquery.com)
* [html5Doctor](http://html5doctor.com/) - HTML5 learning resource
* [matplotlib - What is a Backend?](http://matplotlib.org/faq/usage_faq.html#what-is-a-backend)
* [matplotlib in a webapp server](http://matplotlib.org/faq/howto_faq.html#matplotlib-in-a-web-application-server)
* [IIFE lesson](https://www.kirupa.com/html5/immediately_invoked_function_expressions_iife.htm) - Immediately Invoked Function Expressions @ Kirupa.com: Great JavaScript lessons
* [IIFE tutorial](http://www.tutorialsteacher.com/javascript/immediately-invoked-function-expression-iife) - Another helpful tutorial on Immediately Invoked Function Expressions
* [Writing Better Ajax](https://medium.com/coding-design/writing-better-ajax-8ee4a7fb95f#.wkx1uei9f) - Terry Mun on [Medium](https://medium.com)
* [What are Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises) - Web | Google Developers
* [Debugging JS in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/) - Web | Google Developers
* [git-scm](https://git-scm.com) - git learning resource
* [Stack Overflow](stackoverflow.com) - For learning, not copy / paste.

#### TODO

* Improve structure and readability of app.js []
* Work on understanding debouncing & implement [x]
* Add debounce() functionality to waypoint scrolling function [x]
* Get responsive resizing of graphs working correctly [x]
* Improve fade transition times of graphs []
* Tune graph size ratio to window size []
* Figure out ScalarFormatter for Matplotlib (ax.ticklabel_format()) []
* Correct affix behaviour at bottom of scroll (remove at appropriate location relative to #plot-space) []
* Change #plot-text for small screens []
* Add re-plot button to slider input []
* For small screens and column wrapping: add plot-text user guidance for using plot buttons
* Fix MathJax font & button responsiveness [x]
* Refactor app.js using Object Oriented principles []
* Improve / re-design styling and layout [\]
* Fix footnote link offsets []
* Finish writing content []
* Learn to use Jinja Templates correctly (& how to  pages from correct directory) []
* Learn how to affect label precision on y-axis of plot
* Make code examples switchable between Ruby and JavaScript []
* Add "run it in repl.it" links to code []
* ...
