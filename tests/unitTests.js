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

// exports['checkFourOfAKind'] = function(test) {
//     var tests = 
// }
//                      
// exports['findHighCard'] = function(test) {
//     var handsToTest = [[2,3,5,7,8], [2,2,5,6,7], [13,2,2,13,14], [2,2,2,4,5]
//                        , [14,2,3,4,5], [11,10,11,11,10], [10,10,10,10,13]];
//     var answers = [8, 7, 14, 5, 14, 11, 13];
//     for(var i = 0; i < handsToTest.length; i++) {
//         
//     }
//     test.equal(score, )
// }
// 
// exports['chooseWinner_good_hands'] = function(test) {
//     var goodHandPairs = [
//         [{'withWilds':'23579', 'withoutWilds':'23579', 'rank':null}
//          , {'withWilds':'23579', 'withoutWilds':'23579', 'rank':null}];
//     for(var i = 0; i < goodHandPairs.length; i++) {
//         var score = poker.chooseWinner({'withWilds':goodHands[i]
//                          , 'withoutWilds':goodHands[i]
//                          , 'rank':goodHandRanks[i]
//                          , 'score':null});
//         test.equal(score, )
//     }
//     test.done();
// }