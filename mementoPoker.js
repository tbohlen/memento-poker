/*
TestHandIsValid takes an input string and makes sure that it is of the
expected format.

It checks for a length of 5 and that the string contains the correct characters
*/

exports['testHandIsValid'] = function testHandIsValid(hand) {
    var acceptableChars = ['T', 'J', 'Q', 'K', 'A'];
    for(var i = 2; i < 10; i++) {
        acceptableChars.push(i.toString());
    }
    
    if(hand.length != 5) {
        return false;
    }
    
    for(var i = 0; i < hand.length; i++) {
        var character = hand[i];
        if(acceptableChars.indexOf(character) == -1) {
            return false
        }
    }
    
    return true;
}

/*
parseHandToList takes in a valid hand and converts it to an array of integer
values for easier handling by the rest of this program.

Very simply, each character of a string represented by a hand is converted to
the number rank of the card, with ace, being high, becoming 14 rather than 1.
*/
exports['parseHandToList'] = function parseHandToList(hand) {
    var result = [];
    var charToIntDict = {'T':10, 'J':11, 'Q':12, 'K':13, 'A':14};
    for(var i = 0; i < hand.length; i++) {
        var character = hand[i];
        var parsedChar = parseInt(character);
        if(parsedChar > 1 && parsedChar < 10) {
            result.push(parsedChar);
        }
        else {
            result.push(charToIntDict[character]);
        }
    }
    return result;
}