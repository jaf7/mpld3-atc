function iterateArray( inputArray, element ) {
  for ( let i = 0; i < inputArray.length; i++ ) {
    if ( inputArray[i] === element ) {
      return true;
    }
  }
  return false;
}


function iterateArray( inputArray, element ) {
  for ( let i = 0; i < inputArray.length; i++ ) {
    if ( inputArray[i] === element ) {
      return 'element ' + element
             +  ' is at index ' + i;
    }
  }
  return 'element ' + element
         + ' is not contained in the input array';
}