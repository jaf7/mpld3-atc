function binarySearch( array, element ) {
  let low = 0;
  let high = array.length - 1;
  let mid;
  let guess;

  while ( low <= high ) {
    mid = Math.floor( ( low + high ) / 2 );
    guess = array[mid];

    console.log( 'mid: ', mid );

    if ( guess < element ) {
      low = mid + 1;
    } else if ( guess > element ) {
      high = mid -1;
    } else {
      return 'element is at index ' + mid;
    }
    console.log( 'low: ', low, 'high: ', high );
  }
}

var myList = [1, 3, 5, 7, 9];
var myList2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function generateIntegerArray( size ) {
  let myArray = new Array;
  for ( let i = 1; i <= size; i++ ) {
    myArray.push(i);
  }
  return myArray;
}
var newArray = generateIntegerArray( 100 );
console.log( newArray );
