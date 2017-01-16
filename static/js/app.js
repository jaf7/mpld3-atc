/*-------------------------------------------------------------------
Wrapping in IIFE (advisable?)
-------------------------------------------------------------------*/
(function( $, document, window, viewport ) {

  $( document ).ready(function() {

    // For window.resize() listener
    var currentBreakPoint = viewport.current();

    // Params for plot_growth function in routes.py
    var qu = {
      lowerLimit: 1,
      upperLimit: 1000,
      plotWidth: 8,
      plotHeight: 7,
      compareType: "placeHolder" //linearLog, linearLogLinear, logLinearQuadratic,
    };                  //quadraticExponential

    var descriptions = {
      "linearLog" : "<p>linearLog description</p>",
      "linearLogLinear" :"linearLogLinear description",
      "logLinearQuadratic" : "logLinearQuadratic description",
      "quadraticExponential" : "quadraticExponential description"
    };

    //button handler
    $( ".btn-flex-container" ).on( 'click', '.btn-plot-choice', function() {
      console.log( "this.classList[0]: ", this.classList[0] );
      var compareChoice = this.classList[0];
      qu.compareType = compareChoice;
      setFigSize();
    });


    //Slider creation and handling https://refreshless.com/nouislider
    var limitSlider = document.getElementById( "limit-slider" ),
        lowerLimitInput = document.getElementById( "lower-limit-input" ),
        upperLimitInput = document.getElementById( "upper-limit-input" );

    noUiSlider.create(limitSlider, {
      start: [ 1, 1000 ],
      connect: [ true, true, false ],
      behaviour: 'tap-drag',
      step: 1,
      margin: 1,
      range: {
        'min': [ 1 ],
        'max': [ 5000 ]
      },
      format: wNumb({
        decimals: 0
      })
    });
    /*
     * Binding slider handle and input field values:
     * values is alwas an array of strings. handle is 0 or 1 and
     * indicates the handle that caused the event.
    */
    // Bind slider handle changes to input field values
    limitSlider.noUiSlider.on( "update", function( values, handle ) {
      // Need a Number to pass to plot_growth in routes.py
      var currentValue = parseInt( values[ handle ] );

      if ( handle === 0 ) {
        lowerLimitInput.value = currentValue;
        qu.lowerLimit = currentValue;
        console.log( "qu at low handle: ", qu );
      } else {
        upperLimitInput.value = currentValue;
        qu.upperLimit = currentValue;
        console.log( "qu at high handle: ", qu );
      }
    });
    // Bind input field changes to slider handle values
    lowerLimitInput.addEventListener( "change", function( values ) {
      limitSlider.noUiSlider.set( [ this.value, values[1] ] );
    });
    upperLimitInput.addEventListener( "change", function ( values ) {
      limitSlider.noUiSlider.set( [ values[0], this.value ] );
    });


    /* Since mpld3 figures are not responsive, this attempts
     * a workaround using ResponsiveBootstrapToolkit
     * https://github.com/maciej-gurban/responsive-bootstrap-toolkit
     */
    $( window ).resize(function() {
      currentBreakPoint = viewport.current();
      setFigSize();
      // console.log( "viewport changed" );
      // console.log( "viewport.current(): ", viewport.current() );
      // var timer;
      // clearTimeout( timer );
      // setTimeout( function () {
      //   if (currentBreakPoint !== viewport.current() ) {
      //     setFigSize();
      //   }
      // });

      // if ( currentBreakPoint !== viewport.current() ) {
      //   var timer;
      //   clearTimeout( timer );
      //   setTimeout( setFigSize(), 1000 );
      // }
      // viewport.changed( function() {
      //   setFigSize();
      // });
    });

    var someFunction = function() {
      if ( currentBreakPoint !== viewport.current() ) {
        genPlot();
      }
    };

    /* Set figure size for matplotlib, using
     * ResponsiveBootstrapToolkit public method .is()
     */
    var setFigSize = function() {

      // Define props on the qu object depending on viewport state
      if ( viewport.is('<=sm') ) {
        qu.plotWidth = 4;
        qu.plotHeight = 3;
      }
      if ( viewport.is('md') ) {
        qu.plotWidth = 7;
        qu.plotHeight = 6;
      }
      if ( viewport.is('>md') ) {
        qu.plotWidth = 8;
        qu.plotHeight = 7;
      }

      genPlot();
    };

    /*
    * Call $.ajax() method to submit updated state to query() in routes.py
    * Assign $.ajax() method to variable in order to use .done() promise callback
    * https://medium.com/coding-design/writing-better-ajax-8ee4a7fb95f#.wkx1uei9f
    * https://developers.google.com/web/fundamentals/getting-started/primers/promises
    */
    var genPlot = function() {
      // console.log( "compareType at start of genPlot: ", compareType );
      var getPlotSlide = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/query",
        data: JSON.stringify( qu ),
        dataType: "html"
      });
      getPlotSlide.done(function( data ) {
        console.log( "getPlotSlide.done" );
        console.log( "qu at getPlotSlide.done: ", qu );
        console.log( "descriptions[ qu.compareType ]: ", descriptions[ qu.compareType ] );
        // console.log( "data: ", data );
        $( "#plot-space" ).fadeTo( 500, 0, function() { //
          $( "#plot-space" ).html( data ).fadeTo( 500, 1 );
        });

        $( "#show-text" ).fadeTo(500, 0, function() {
          $( this ).html( descriptions[ qu.compareType ] ).fadeTo(500, 1, function() {} );
        });
      });
    };



  });
})( jQuery, document, window, ResponsiveBootstrapToolkit );
