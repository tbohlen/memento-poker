var rankNames = ['HIGHCARD', 'PAIR', 'TWOPAIR', 'THREEOFAKIND', 'STRAIGHT'
                 , 'FULLHOUSE', 'FOUROFAKIND'];
var handRankChecks = [checkIsFourOfAKind, checkIsFullHouse, checkIsStraight
                  , checkIsThreeOfAKind, checkIsTwoPair, checkIsPair];

exports['rankNames'] = rankNames;

/*
lowHighSort is the comparison function that sorts numbers from lowest to highest
*/
function lowHighSort(a, b) {
    return a-b;
}

/*
highLowSort is the comparison function that sorts numbers from highest to lowest
*/
function highLowSort(a, b) {
    return b-a;
}

/*
TestHandIsValid takes an input string and makes sure that it is of the
expected format.

It checks for a length of 5 and that the string contains the correct characters
*/

function testHandIsValid(hand) {
    var acceptableChars = ['T', 'J', 'Q', 'K', 'A', '*'];
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
exports['testHandIsValid'] = testHandIsValid;

/*
parseHandToList takes in a valid hand and converts it to an array of integer
values for easier handling by the rest of this program.

Very simply, each character of a string represented by a hand is converted to
the number rank of the card, with ace, being high, becoming 14 rather than 1.
*/
function parseHandToList(hand) {
    var result = [];
    var charToIntDict = {'T':10, 'J':11, 'Q':12, 'K':13, 'A':14, '*':0};
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
exports['parseHandToList'] = parseHandToList;

/*
countRepeatsInList builds a dictionary of numbers mapped to the number of values
that appear in the list that many times. See the test cases for examples.

This is helpful for deciding when we have a pair, twopair, threeofakind,
fullhouse, or fourofakind.

frequencyCount maps each card rank to the number of times it shows up in the
hand.

repeatCountToNumber maps a number to all the card ranks that show up that many
times in the hand.
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
    
    var repeatCountToNumber = {};
    for(key in frequencyCount) {
        var value = frequencyCount[key];
        if(value in repeatCountToNumber) {
            repeatCountToNumber[value].push(parseInt(key));
        }
        else {
            repeatCountToNumber[value] = [parseInt(key)];
        }

    }
    return [frequencyCount, repeatCountToNumber];
}
exports['countRepeatsInList'] = countRepeatsInList;

/*
checkIsFourOfAKind
*/
function checkIsFourOfAKind(hand) {
    var countResult = countRepeatsInList(hand);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    if(Object.keys(repeats).length == 2
       && repeats[4] && repeats[4].length == 1
       && repeats[1] && repeats[1].length == 1) {
        return [6, repeats[4][0], repeats[1][0]];
    }
    
    return false;
}
exports['checkIsFourOfAKind'] = checkIsFourOfAKind;

/*
checkIsFullHouse
*/

function checkIsFullHouse(hand) {
    var countResult = countRepeatsInList(hand);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    if(Object.keys(repeats).length == 2
       && repeats[3] && repeats[3].length == 1
       && repeats[2] && repeats[2].length == 1) {
        return [5, repeats[3][0], repeats[2][0]];
    }
    
    return false;
}
exports['checkIsFullHouse'] = checkIsFullHouse;

/*
checkIsStraight
*/
function checkIsStraight(hand) {
    var sortedHand = hand.sort(lowHighSort);
    
    // in order to handle the fact that the ace (here 14) can be low, we special
    // case that situation
    if(sortedHand[0] == 2 && sortedHand[4] == 14) {
        sortedHand.splice(0, 0, 1);
        sortedHand.pop();
    }
    
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
    
    return [4, lastCard];
}
exports['checkIsStraight'] = checkIsStraight;

/*
checkIsThreeOfAKind
*/

function checkIsThreeOfAKind(hand) {
    var countResult = countRepeatsInList(hand);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    if(Object.keys(repeats).length == 2
       && repeats[3] && repeats[3].length == 1
       && repeats[1] && repeats[1].length == 2) {
        var highcard = repeats[1].sort(highLowSort)[0];
        return [3, repeats[3][0], highcard];
    }
    
    return false;
}
exports['checkIsThreeOfAKind'] = checkIsThreeOfAKind;

/*
checkIsTwoPair
*/

function checkIsTwoPair(hand) {
    var countResult = countRepeatsInList(hand);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    if(Object.keys(repeats).length == 2
       && repeats[2] && repeats[2].length == 2
       && repeats[1] && repeats[1].length == 1) {
        var pairs = repeats[2].sort(lowHighSort);
        var highcard = repeats[1][0];
        return [2, pairs[1], pairs[0], highcard];
    }
    
    return false;
}
exports['checkIsTwoPair'] = checkIsTwoPair;

/*
checkIsPair
*/

function checkIsPair(hand) {
    var countResult = countRepeatsInList(hand);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    if(Object.keys(repeats).length == 2
       && repeats[2] && repeats[2].length == 1
       && repeats[1] && repeats[1].length == 3) {
        var highcard = repeats[1].sort(highLowSort)[0];
        return [1, repeats[2][0], highcard];
    }
    
    return false;
}
exports['checkIsPair'] = checkIsPair;

/*
determineHandRank
*/

function determineHandRank(hand) {
    for(var i = 0; i < handRankChecks.length; i++) {
        var result = handRankChecks[i](hand)
        if(result) {
            return result;
        }
    }
    
    var highcard = hand.sort(highLowSort)[0];
    return [0, highcard];
}
exports['determineHandRank'] = determineHandRank;

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// hand comparison ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function compareHands(handOne, handTwo) {
    while(handOne.length < handTwo.length) {
        handOne.push(0);
    }
    while(handOne.length > handTwo.length) {
        handTwo.push(0);
    }
    
    for(var i = 0; i < handOne.length; i++) {
        if(handOne[i] > handTwo[i]) {
            return '0';
        }
        else if(handTwo[i] > handOne[i]) {
            return '1';
        }
    }
    return '01';
}
exports['compareHands'] = compareHands;