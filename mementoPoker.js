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

/*
countRepeatsInList builds a dictionary of numbers mapped to the number of values
that appear in the list that many times. See the test cases for examples.

This is helpful for deciding when we have a pair, twopair, threeofakind,
fullhouse, or fourofakind.
*/

function countRepeatsInList(hand) {
    var frequencyCount = {};
    for(var i = 0; i < hand.length; i++) {
        var value = hand[i];
        if(value in frequencyCount) {
            frequencyCount[value]++;
        }
        else {
            frequencyCount[value] = 1;
        }
    }
    
    var repeatCount = {};
    for(key in frequencyCount) {
        var value = frequencyCount[key];
        if(value in repeatCount) {
            repeatCount[value]++;
        }
        else {
            repeatCount[value] = 1;
        }

    }
    return repeatCount;
}

exports['countRepeatsInList'] = countRepeatsInList;

/*
checkIsFourOfAKind
*/
exports['checkIsFourOfAKind'] = function checkIsFourOfAKind(hand) {
    var repeats = countRepeatsInList(hand);
    if(Object.keys(repeats).length == 2
       && repeats[4] == 1
       && repeats[1] == 1) {
        return true;
    }
    
    return false;
}

/*
checkIsFullHouse
*/

exports['checkIsFullHouse'] = function checkIsFullHouse(hand) {
    var repeats = countRepeatsInList(hand);
    if(Object.keys(repeats).length == 2
       && repeats[3] == 1
       && repeats[2] == 1) {
        return true;
    }
    
    return false;
}

/*
checkIsStraight
*/
exports['checkIsStraight'] = function checkIsStraight(hand) {
    var sortedHand = hand.sort();
    var lastCard = (sortedHand[0] == 14) ? 1 : sortedHand[0];
    for(var i = 1; i < sortedHand.length; i++) {
        var thisCard = sortedHand[i];
        if(thisCard != (lastCard+1)) {
            return false;
        }
        else {
            lastCard = thisCard;
        }
    }
    
    return true;
}

/*
checkIsThreeOfAKind
*/

exports['checkIsThreeOfAKind'] = function checkIsThreeOfAKind(hand) {
    var repeats = countRepeatsInList(hand);
    if(Object.keys(repeats).length == 2
       && repeats[3] == 1
       && repeats[1] == 2) {
        return true;
    }
    
    return false;
}

/*
checkIsTwoPair
*/

exports['checkIsTwoPair'] = function checkIsTwoPair(hand) {
    var repeats = countRepeatsInList(hand);
    if(Object.keys(repeats).length == 2
       && repeats[2] == 2
       && repeats[1] == 1) {
        return true;
    }
    
    return false;
}

/*
checkIsPair
*/

exports['checkIsPair'] = function checkIsPair(hand) {
    var repeats = countRepeatsInList(hand);
    if(Object.keys(repeats).length == 2
       && repeats[2] == 1
       && repeats[1] == 3) {
        return true;
    }
    
    return false;
}