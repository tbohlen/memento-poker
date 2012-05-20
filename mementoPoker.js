var rankNames = ['HIGHCARD', 'PAIR', 'TWOPAIR', 'THREEOFAKIND', 'STRAIGHT'
                 , 'FULLHOUSE', 'FOUROFAKIND'];
var handRankChecks = [checkIsFourOfAKind, checkIsFullHouse, checkIsStraight
                  , checkIsThreeOfAKind, checkIsTwoPair, checkIsPair];

exports['rankNames'] = rankNames;

/*
lowHighSort is the comparison function that sorts numbers from lowest to highest
*/
function lowHighSort(a, b) {
    return parseInt(a)-parseInt(b);
}

/*
highLowSort is the comparison function that sorts numbers from highest to lowest
*/
function highLowSort(a, b) {
    return parseInt(b)-parseInt(a);
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
checkIsFourOfAKind tests to see if hand contains a four of a kind.
*/
function checkIsFourOfAKind(hand) {
    var handNoWilds = removeWilds(hand);
    var countResult = countRepeatsInList(handNoWilds);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    var wilds = hand.length - handNoWilds.length;
    var largestKey = parseInt(Object.keys(repeats).sort(highLowSort)[0]);
    if(wilds > 4) {
        return [6, 14, 14];
    }
    else if(wilds == 4) {
        return [6, 14, repeats[largestKey].sort(highLowSort)[0]];
    }
    else if(wilds+largestKey > 4) {
        var four = repeats[largestKey].sort(highLowSort)[0];
        return [6, four, 14];
    }
    else if (wilds+largestKey == 4) {
        var four = repeats[largestKey].sort(highLowSort)[0];
        var highcard;
        var sortedHandNoWilds = handNoWilds.sort(highLowSort)
        if (sortedHandNoWilds.indexOf(four) > 0) {
            highcard = sortedHandNoWilds[0];
        }
        else {
            highcard = sortedHandNoWilds[sortedHandNoWilds.length - 1];
        }
        return [6, four, highcard];
    }
    
    return false;
}
exports['checkIsFourOfAKind'] = checkIsFourOfAKind;

/*
checkIsFullHouse checks to see if hand is a full house.

NOTE: In the interest of time, this only handles the cases that are not also
four of a kinds! I'm sure there is an easy way to handle all cases, but this is
not it.
*/

function checkIsFullHouse(hand) {
    var handNoWilds = removeWilds(hand);
    var countResult = countRepeatsInList(handNoWilds);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    var wilds = hand.length - handNoWilds.length;
    if (2 in repeats && repeats[2].length ==2 && wilds == 1) {
        var sortedPairs = repeats[2].sort(highLowSort);
        return [5, sortedPairs[0], sortedPairs[1]];
    }
    else if (2 in repeats && 3 in repeats) {
        return [5, repeats[3][0], repeats[2][0]];
    }
    
    return false;
}
exports['checkIsFullHouse'] = checkIsFullHouse;

/*
checkIsStraight checks to see if a hand contains a straight.

This is done by starting at the lowest number and stepping upward, using wilds
as necessary, to see if we can create a string of 5 consecutive cards.

Ugly.
*/
function checkIsStraight(hand) {
    var handNoWilds = removeWilds(hand);
    var wilds = hand.length - handNoWilds.length;
    var sortedHandUp = handNoWilds.sort(lowHighSort);
    var sortedHandDown = handNoWilds.slice(0).sort(highLowSort);
    
    // in order to handle the fact that the ace (here 14) can be low, we simply
    // include both a 1 and a 14 if an ace is in the hand and then check each
    // hand for a straight that starts high and again for one starting low
    // (the same thing for any hand that does not contain an ace)
    if(sortedHandDown[0] == 14) {
        sortedHandUp.splice(0, 0, 1);
        sortedHandUp.splice(sortedHandUp.length-1, 1);
    }
    
    var lastCardUp = sortedHandUp[0];
    var lastCardDown = sortedHandDown[0];
    var firstCardDown = lastCardDown;
    var straightUp = true;
    var straightDown = true;
    var wildsUp = wilds;
    var wildsDown = wilds;
    for(var i = 1; i < sortedHandUp.length; i++) {
        var thisCardUp = sortedHandUp[i];
        var cardUp = thisCardUp;
        var thisCardDown = sortedHandDown[i];
        var cardDown = thisCardDown;
        while(thisCardUp != lastCardUp+1 && wildsUp > 0) {
            wildsUp--;
            thisCardUp--;
        }
        if(thisCardUp != lastCardUp+1) {
            straightUp = false;
        }
        else {
            lastCardUp = cardUp;
        }
        
        while(thisCardDown != lastCardDown-1 && wildsDown > 0) {
            wildsDown--;
            thisCardDown++;
        }
        if(thisCardDown != lastCardDown-1) {
            straightDown = false;
        }
        else {
            lastCardDown = cardDown;
        }
    }
    
    var highestDown = firstCardDown + wildsDown;
    if (highestDown > 14) highestDown   = 14;
    var highestUp = lastCardUp + wildsUp;
    if (highestUp > 14) highestUp = 14;
    
    if(straightDown && straightUp) {
        var highcard = (highestUp > highestDown) ? highestUp : highestDown
        return [4, highcard];
    }
    else if(straightUp) {
        return [4, highestUp];
    }
    else if(straightDown) {
        return [4, highestDown];
    }
    
    return false;
}
exports['checkIsStraight'] = checkIsStraight;

/*
checkIsThreeOfAKind
*/

function checkIsThreeOfAKind(hand) {
    var handNoWilds = removeWilds(hand);
    var countResult = countRepeatsInList(handNoWilds);
    var frequencies = countResult[0];
    var repeats = countResult[1];
    var wilds = hand.length - handNoWilds.length;
    var largestKey = parseInt(Object.keys(repeats).sort(highLowSort)[0]);
    var highcard;
    var triple;
    if(wilds >= 4) {
        return [3,14,14];
    }
    else if(wilds == 3) {
        return [3,14,handNoWilds.sort(highLowSort)[0]];
    }
    else if(wilds+largestKey > 3) {
        var triple = (wilds >= 3) ? 14 : repeats[largestKey].sort(highcard)[0];
        var highcard = (wilds+largestKey > 3) ? 14 : sortedHand[0];
        return [3, triple, highcard];
    }
    else if(wilds+largestKey == 3) {
        var triple = (wilds >= 3) ? 14 : repeats[largestKey].sort(highLowSort)[0];
        var sortedHand = handNoWilds.sort(highLowSort);
        var highcard = (triple == sortedHand[0]) ? sortedHand[largestKey]
                                                 : sortedHand[0];
        return [3, triple, highcard];
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

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Wild Replacement ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function removeWilds(handWithWilds) {
    var result = [];
    for(var i = 0; i < handWithWilds.length; i++) {
        if (handWithWilds[i] != 0) {
            result.push(handWithWilds[i]);
        }
    }
    return result;
}

exports['removeWilds'] = removeWilds;


// function replaceWildsFourOfAKind(handWithWilds) {
//     var countResult = countRepeatsInList(hand);
//     var frequencies = countResult[0];
//     var repeats = countResult[1];
//     var wilds = (0 in frequencies) : frequencies[0] : 0;
//     var largestKey = Object.keys(repeats).sort(highLowSort)[0];
//     if(wilds+largestKey > 4) {
//         var four = repeats[largestKey].sort(highLowSort)[0];
//         var highcard = 14;
//         return [6, four, highcard];
//     }
//     else if (wilds+largestKey == 4) {
//         var four = repeats[largestKey].sort(highLowSort)[0];
//         var highcard;
//         var sortedHandNoWilds = handWithWilds.sort(highLowSort).splice(0,wilds);
//         if(sortedHandNoWilds.indexOf(four) > 0) {
//             highcard = sortedHandNoWilds[0];
//         }
//         else(sortedHand.indexOf(four)) {
//             highcard = sortedHandNoWilds[sortedHandNoWilds.length - 1];
//         }
//         return [6, four, highcard];
//     }
//     else {
//         return false
//     }
// }
// exports['replaceWildsFourOfAKind'] = replaceWildsFourOfAKind;