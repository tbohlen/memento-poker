var poker = require('../mementoPoker');
                     
exports['parseHandToList_good_hands'] = function (test) {
    var handsToTest = ['23578', '22567', 'K22KA', '22**5'
                       , 'A2345', 'JT*JT', 'TTTTK'];
    var expectedResults = [[2,3,5,7,8], [2,2,5,6,7], [13,2,2,13,14], [2,2,0,0,5]
                       , [14,2,3,4,5], [11,10,0,11,10], [10,10,10,10,13]];
    for(var i = 0; i < handsToTest.length; i++) {
        test.deepEqual(poker.parseHandToList(handsToTest[i]), expectedResults[i]);
    }
    test.done();
};

/*
testHandIsValid
*/

exports['testHandIsValid_good_hands'] = function (test) {
    var handsToTest = ['23678', '22Q69', 'K22KA', '22**5'
                       , 'A2345', 'JTJ*T', 'TTTTK'];
    for(var i = 0; i < handsToTest.length; i++) {
        test.ok(poker.testHandIsValid(handsToTest[i]));
    }
    test.done();
};

exports['testHandIsValid_wrong_length'] = function (test) {
    var handsToTest = ['2345', '', '234678'];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = !(poker.testHandIsValid(handsToTest[i]));
        test.ok(result);
    }
    test.done();
}

exports['testHandIsValid_bad_characters'] = function (test) {
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

exports['countRepeatsInList'] = function (test) {
    var handsToTest = [[2,3,4,5,6], [2,2,3,4,5], [2,2,3,2,4], [3,2,2,2,2]
                       , [2,2,3,3,4], [2,2,3,2,3]];
    var expectedResults = [[{2:1, 3:1, 4:1, 5:1, 6:1}, {1:[2,3,4,5,6]}]
                           , [{2:2, 3:1, 4:1, 5:1}, {2:[2], 1:[3,4,5]}]
                           , [{2:3, 3:1, 4:1}, {3:[2], 1:[3,4]}]
                           , [{2:4, 3:1}, {4:[2], 1:[3]}]
                           , [{2:2, 3:2, 4:1}, {2:[2,3], 1:[4]}]
                           , [{2:3, 3:2}, {3:[2], 2:[3]}]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.countRepeatsInList(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsFourOfAKind
*/

exports['checkIsFourOfAKind_true'] = function (test) {
    var handsToTest = [[4,4,4,4,9], [13,13,13,13,2], [2,2,2,0,4], [2,2,4,0,0]
                       , [2,0,6,0,0], [0,0,8,0,0], [4,4,4,4,0], [0,0,0,0,0]];
    var expectedResults = [[6,4,9], [6,13,2], [6,2,4], [6,2,4], [6,6,2], [6,14,8]
                           , [6,4,14], [6,14,14]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFourOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsFourOfAKind_false'] = function (test) {
    var handsToTest = [[4,2,3,13,9], [2,3,4,5,0], [2,2,3,0,4], [2,0,0,4,5]];
    var expectedResults = [false, false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFourOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsFullHouse

This test should probably be more thorough, but these are the only cases that
are not also four of a kinds, so, in the program, I need not worry about them.
*/

exports['checkIsFullHouse_true'] = function (test) {
    var handsToTest = [[8,8,8,4,4], [2,2,0,13,13]];
    var expectedResults = [[5,8,4], [5,13,2]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFullHouse(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsFullHouse_false'] = function (test) {
    var handsToTest = [[8,2,3,4,5], [13,13,10,10,11], [0,0,2,3,4], [0,2,3,4,5]
                       , [0,2,2,3,4]];
    var expectedResults = [false, false, false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsFullHouse(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsStraight
*/

exports['checkIsStraight_true'] = function (test) {
    var handsToTest = [[14,2,3,4,5], [2,3,4,5,6], [10,11,12,13,14], [0,3,4,5,6]
                       , [0,0,4,5,6], [0,0,0,2,6], [0,0,0,0,4], [4,0,6,0,7]
                       , [14,0,3,4,5], [12,14,0,0,0]];
    var expectedResults = [[4,5], [4,6], [4,14], [4,7], [4,8], [4,6], [4,8]
                           , [4,8], [4,5], [4,14]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsStraight(handsToTest[i]);
        test.deepEqual(result, expectedResults[i], handsToTest[i]);
    }
    test.done();
}

exports['checkIsStraight_false'] = function (test) {
    var handsToTest = [[8,2,3,4,5], [12,13,14,2,3], [13,13,13,10,14]
                       , [0,0,0,2,12], [2,3,4,0,8]];
    var expectedResults = [false, false, false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsStraight(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
checkIsThreeOfAKind
*/

exports['checkIsThreeOfAKind_true'] = function (test) {
    var handsToTest = [[2,2,2,4,5], [2,5,13,5,5], [0,0,0,5,6], [0,0,5,10,13]
                       , [0,6,6,9,12], [0,6,6,8,8]];
    var expectedResults = [[3,2,5], [3,5,13], [3,14,6], [3,13,10], [3,6,12]
                           , [3,8,6]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsThreeOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsThreeOfAKind_false'] = function (test) {
    var handsToTest = [[2,2,5,4,4], [2,5,13,6,7], [0,2,4,6,8]];
    var expectedResults = [false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsThreeOfAKind(handsToTest[i]);
        test.deepEqual(result, expectedResults[i], handsToTest[i]);
    }
    test.done();
}

/*
checkIsTwoPair
*/

exports['checkIsTwoPair_true'] = function (test) {
    var handsToTest = [[2,2,4,4,5], [2,2,13,13,5]];
    var expectedResults = [[2,4,2,5], [2,13,2,5]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsTwoPair(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsTwoPair_false'] = function (test) {
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

exports['checkIsPair_true'] = function (test) {
    var handsToTest = [[2,2,4,5,6]];
    var expectedResults = [[1,2,6]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsPair(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

exports['checkIsPair_false'] = function (test) {
    var handsToTest = [[2,2,2,4,4], [2,5,13,6,7], [2,2,2,2,5]
                       , [4,4,4,3,1], [2,2,4,4,5]];
    var expectedResults = [false, false, false, false, false];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.checkIsPair(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

/*
compareHands
*/

exports['compareHands'] = function (test) {
    var handsToTest = [[[5,2,4], [4,5,7]], [[5,3,5], [5,4,6]], [[5,3,2], [5,3,2]]];
    var expectedResults = ['0', '1', '01'];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.compareHands(handsToTest[i][0], handsToTest[i][1]);
        test.equal(result, expectedResults[i]);
    }
    test.done();
}

/*
determineHandRank
*/

exports['determineHandRank'] = function (test) {
    var handsToTest = [[2,3,4,6,8], [2,2,5,6,7], [2,2,4,4,6], [4,4,4,6,9]
                       , [4,5,6,7,8], [5,5,5,13,13], [14,14,14,14,3]];
    var expectedResults = [[0,8], [1,2,7], [2,4,2,6], [3,4,9], [4,8]
                           , [5,5,13], [6,14,3]];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.determineHandRank(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Replacing Wilds /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
removeWilds
*/

exports['removeWilds'] = function (test) {
    var handsToTest = [[2,3,5,7,8], [2,2,5,0,5], [14,0,0,4,5], [0,10,0,11,0]
                       , [0,0,0,0,13], [0,0,0,0,0]];
    var expectedResults = [[2,3,5,7,8], [2,2,5,5], [14,4,5], [10,11], [13], []];
    for(var i = 0; i < handsToTest.length; i++) {
        var result = poker.removeWilds(handsToTest[i]);
        test.deepEqual(result, expectedResults[i]);
    }
    test.done();
}



/*
replaceWildsForFour
*/
// exports['replaceWildsForFour'] = function (test) {
//     var handsToTest = [[2,3,4,5,6], [2,3,4,5,0], [2,2,3,0,4], [2,0,0,4,5]
//                        , [2,2,2,0,4], [2,2,4,0,0], [2,0,6,0,0], [0,0,8,0,0]
//                        , [4,4,4,4,0], [0,0,0,0,0]];
//     var expectedResults = [[2,3,4,5,6], [2,3,4,5,14], [2,2,3,14,4], [2,14,14,4,5]
//                        , [2,2,2,2,4], [2,2,4,2,2], [2,2,6,2,2], [14,14,8,14,14]
//                        , [4,4,4,4,14], [14,14,14,14,14]];
//     for(var i = 0; i < handsToTest.length; i++) {
//         var result = poker.replaceWildsFourOfAKind(handsToTest[i]);
//         test.deepEqual(result, expectedResults[i]);
//     }
//     test.done();
// }