var poker = require('../mementoPoker');

var goodHands = ['23578', '22567', 'K22KA', '22245', 'A2345', 'JTJJT', 'TTTTK'];
var goodHandRanks = ['HIGHCARD', 'PAIR', 'TWOPAIR', 'THREEOFAKIND', 'STRAIGHT'
                     , 'FULLHOUSE', 'FOUROFAKING'];
                     
exports['parseHandToList_good_hands'] = function(test) {
    var handsToTest = ['23578', '22567', 'K22KA', '22245'
                       , 'A2345', 'JTJJT', 'TTTTK'];
    var expectedResults = [[2,3,5,7,8], [2,2,5,6,7], [13,2,2,13,14], [2,2,2,4,5]
                       , [14,2,3,4,5], [11,10,11,11,10], [10,10,10,10,13]];
    for(var i = 0; i < handsToTest.length; i++) {
        test.deepEqual(poker.parseHandToList(handsToTest[i]), expectedResults[i]);
    }
    test.done();
};

/*
testHandIsValid
*/

exports['testHandIsValid_good_hands'] = function(test) {
    var handsToTest = ['23578', '22567', 'K22KA', '22245'
                       , 'A2345', 'JTJJT', 'TTTTK'];
    for(var i = 0; i < handsToTest.length; i++) {
        test.ok(poker.testHandIsValid(handsToTest[i]));
    }
    test.done();
};

exports['testHandIsValid_wrong_length'] = function(test) {
    var handsToTest = ['2345', '', '234678'];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = !(poker.testHandIsValid(handsToTest[i]));
        test.ok(result);
    }
    test.done();
}

exports['testHandIsValid_bad_characters'] = function(test) {
    var handsToTest = ['12345', '0KKKK', 'LKK34', '$23JJ'];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = !(poker.testHandIsValid(handsToTest[i]));
        test.ok(result);
    }
    test.done();
}

/*
countRepeatsInList
*/

exports['countRepeatsInList'] = function(test) {
    var handsToTest = [[2,3,4,5,6], [2,2,3,4,5], [2,2,3,2,4], [3,2,2,2,2]
                       , [2,2,3,3,4], [2,2,3,2,3]];
    var expectedResults = [{1:5}, {2:1, 1:3}, {3:1, 1:2}, {4:1, 1:1}
                           , {2:2, 1:1}, {3:1, 2:1}];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.countRepeatsInList(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsFourOfAKind
*/

exports['checkIsFourOfAKind_true'] = function(test) {
    var handsToTest = [[4,4,4,4,9], [13,13,13,13,2]];
    var expectedResults = [true, true];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFourOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsFourOfAKind_false'] = function(test) {
    var handsToTest = [[4,2,3,13,9], [2,3,4,5,6]];
    var expectedResults = [false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFourOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsFullHouse
*/

exports['checkIsFullHouse_true'] = function(test) {
    var handsToTest = [[8,8,8,4,4], [2,2,2,13,13]];
    var expectedResults = [true, true];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFullHouse(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsFullHouse_false'] = function(test) {
    var handsToTest = [[8,2,3,4,5], [12,12,12,12,12], [13,13,10,10,11]];
    var expectedResults = [false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFullHouse(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsStraight
*/

exports['checkIsStraight_true'] = function(test) {
    var handsToTest = [[14,2,3,4,5], [2,3,4,5,6], [10,11,12,13,14]];
    var expectedResults = [true, true, true];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsStraight(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsStraight_false'] = function(test) {
    var handsToTest = [[8,2,3,4,5], [12,13,14,2,3], [13,13,13,10,14]];
    var expectedResults = [false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsStraight(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsThreeOfAKind
*/

exports['checkIsThreeOfAKind_true'] = function(test) {
    var handsToTest = [[2,2,2,4,5], [2,5,13,5,5]];
    var expectedResults = [true, true];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsThreeOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsThreeOfAKind_false'] = function(test) {
    var handsToTest = [[2,2,2,4,4], [2,5,13,6,7], [2,2,2,2,5], [4,4,3,3,1]];
    var expectedResults = [false, false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsThreeOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsTwoPair
*/

exports['checkIsTwoPair_true'] = function(test) {
    var handsToTest = [[2,2,4,4,5], [2,2,13,13,5]];
    var expectedResults = [true, true];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsTwoPair(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsTwoPair_false'] = function(test) {
    var handsToTest = [[2,2,2,4,4], [2,5,13,6,7], [2,2,2,2,5], [4,4,4,3,1]];
    var expectedResults = [false, false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsTwoPair(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsPair
*/

exports['checkIsPair_true'] = function(test) {
    var handsToTest = [[2,2,4,5,6]];
    var expectedResults = [true];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsPair(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsPair_false'] = function(test) {
    var handsToTest = [[2,2,2,4,4], [2,5,13,6,7], [2,2,2,2,5]
                       , [4,4,4,3,1], [2,2,4,4,5]];
    var expectedResults = [false, false, false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsPair(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}
