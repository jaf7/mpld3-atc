$(document).ready(function() {

  var descriptions = {
    linearLog : "<p>linearLog description</p>",
    linearLogLinear :"linearLogLinear description",
    logLinearQuadratic: "logLinearQuadratic description",
    quadraticExponential: "quadraticExponential description"
  };


  // range slider event handlers
  $( "#plot-space" ).on( "input", "#low-slider", function() {
    $( "#lower-limit" ).html( $(this).val() );
  });
  $( "#plot-space" ).on( "input", "#high-slider", function() {
    $( "#upper-limit" ).html( $(this).val() );
  });


  // plot chooser event handler
  $( ".plot-slides-button" ).click(function( event ) {

    // show loading indicator here?

    var compareType = event.target.id,
        qu = { "compare_type" : compareType };

    /*
    https://medium.com/coding-design/writing-better-ajax-8ee4a7fb95f#.gsx3d3ys7
    http://codehandbook.org/python-flask-jquery-ajax-post/
    $.ajax() method returns a promise object natively
    */
    var genPlot = $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/query",
      data: JSON.stringify( qu ),
      dataType: "html"
    });

    genPlot.done(function( data ) { // hide loading indicator here?
      $( "#plot-space" ).fadeTo( 500, 0, function() { //
        $( "#plot-space" ).html( data ).fadeTo( 500, 1 );
      });

      $( "#show-text" ).fadeTo(500, 0, function() {
        $( this ).html( descriptions[compareType] ).fadeTo(500, 1, function() {} );
      });
    });

    // complete: fire slide

  });

});
