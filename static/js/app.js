/*-------------------------------------------------------------------
Wrapping in IIFE (advisable?)
-------------------------------------------------------------------*/
(function($, document, window, viewport) {

  $(document).ready(function() {

    // Arguments to pass to plot_growth() in routes.py
    var plotData = {
      lowerLimit: 1,
      upperLimit: 1000,
      plotWidth: 8,
      plotHeight: 7,
      compareType: "placeHolder"
    };


    /*
      mpld3 figures are not responsive: Connect appropriate
      matplotlib figure size arguments to bootstrap viewport
      breakpoints using Responsive Bootstrap Toolkit.
      How to avoid duplicating this code? (see viewportChanged below)
    */
    if (viewport.is('<=sm')) {
      plotData.plotWidth = 6;
      plotData.plotHeight = 5;
    }
    if (viewport.is('md')) {
      plotData.plotWidth = 6;
      plotData.plotHeight = 5;
    }
    if (viewport.is('>md')) {
      plotData.plotWidth = 7;
      plotData.plotHeight = 6;
    }


    /*
      Handle click events on buttons. Use jQuery .on() method
      to filter the child element. This restricts the classList to
      the object existing before MathJax class insertions.
    */
    $(".btn-flex-container").on('click', '.btn-plot-choice', function() {
      var compareChoice = this.classList[0];
      plotData.compareType = compareChoice;
      genPlot();
    });


    // Slider creation and handling https://refreshless.com/nouislider
    var limitSlider = document.getElementById("limit-slider"),
      lowerLimitInput = document.getElementById("lower-limit-input"),
      upperLimitInput = document.getElementById("upper-limit-input");

    noUiSlider.create(limitSlider, {
      start: [1, 1000],
      connect: [true, true, false],
      behaviour: 'tap-drag',
      step: 1,
      margin: 1,
      range: {
        'min': [1],
        'max': [5000]
      },
      format: wNumb({
        decimals: 0
      })
    });
    /*
       Binding slider handle and input field values:
       values is alwas an array of strings. handle is 0 or 1 and
       indicates the handle that caused the event.
     */
    // Bind slider handle changes to input field values
    limitSlider.noUiSlider.on("update", function(values, handle) {
      // Need a Number to pass to plot_growth in routes.py
      var currentValue = parseInt(values[handle]);
      if (handle === 0) {
        lowerLimitInput.value = currentValue;
        plotData.lowerLimit = currentValue;
      } else {
        upperLimitInput.value = currentValue;
        plotData.upperLimit = currentValue;
      }
    });
    // Bind input field changes to slider handle values
    lowerLimitInput.addEventListener("change", function(values) {
      limitSlider.noUiSlider.set([this.value, values[1]]);
    });
    upperLimitInput.addEventListener("change", function(values) {
      limitSlider.noUiSlider.set([values[0], this.value]);
    });


    /*
      mpld3 figures are not responsive:
      window resize events should trigger re-drawing figure at appropriate
      dimensions. debounce() prevents multiple calls to plot_growth() and
      multiple mpld3 renderings. It will not trigger until it hasn't been
      invoked in [wait] milliseconds. [immediate] triggers on the leading
      edge instead of the trailing edge. This debounce() is adapted from
      Underscore.js and https://davidwalsh.name/javascript-debounce-function.
      Re-writing here to think through it (rather than sourcing underscore.js lib)
    */
    var debounce = function(myFunction, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;                   // store the correct references to pass into closures
        var callNow = immediate && !timeout;  // conditions for leading-edge firing
        var later = function() {              // to be fired on trailing edge of wait time
          timeout = null;                     // fired, reset to null so callNow is an option again
          if (!immediate) { myFunction.apply(context, args); }  // use apply() to pass in context of calling object (this)
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);    // why does this get invoked though it's stored in a variable? <--??
        if (callNow) { myFunction.apply(context, args); }
      };
    };
    /*
      The function to execute and fire rate limit.
      How to avoid duplicating this code? (Can't pass a
      reference into debounce() inner function scopes)
    */
    var viewportChanged = debounce(function() {
      if (viewport.is('<=sm')) {
        plotData.plotWidth = 6;
        plotData.plotHeight = 5;
      }
      else if (viewport.is('md')) {
        plotData.plotWidth = 6;
        plotData.plotHeight = 5;
      }
      else if (viewport.is('>md')) {
        plotData.plotWidth = 7;
        plotData.plotHeight = 6;
      }
      genPlot();
    }, 500);
    // On resize, pass to debounce() the function to execute
    window.addEventListener("resize", viewportChanged);


    /*
      $.ajax() method wrapper: submit updated state to plot_growth() in routes.py
      (why doesn't it work to call getPlotSlide directly?) <--??
      Assign $.ajax() method to a variable in order to use .done()
      promise callback in a more readable fashion.
    */
    var genPlot = function() {
      var getPlotSlide = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/query",
        data: JSON.stringify( plotData ),
        dataType: "html"
      });
      getPlotSlide.done(function(data) {
        $("#plot-space").fadeTo(500, 0, function() {
          $("#plot-space").html(data).fadeTo(500, 1);
        });
        $("#show-text").fadeTo(500, 0, function() {
          $(this).html(descriptions[plotData.compareType]).fadeTo(500, 1, function() {});
        });
      });
    };


    var descriptions = {
      "linearLog": "<p>linearLog description</p>",
      "linearLogLinear": "linearLogLinear description",
      "logLinearQuadratic": "logLinearQuadratic description",
      "plotDataadraticExponential": "plotDataadraticExponential description"
    };

  });
})(jQuery, document, window, ResponsiveBootstrapToolkit);
