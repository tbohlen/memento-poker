#Memento Poker Coding Challenge

This program defines a CLI that determines the winner of two poker hands.

It takes as input two strings of five characters representing the ranks of the
five cards in each poker hand:

* 2 through 9 are represented by the respective number, 2-9
* 10s are represented by T
* Jacks are represented by J
* Queens are represented by Q
* Kings are represented by K
* Aces are represented by A
* Wild Cards are represented by asterisks

Aces are considered high. Wilds do not function as high cards. In otherwords,
if the comparison of two hands comes down to high card, and one has A234\* while
the other has \*2345, A234\* will win.

The hands are, in increasing ranking:

* HIGHCARD (if you don't have anything else the highest card in your hand, A2467)
* PAIR (any two cards of same value, AA234)
* TWOPAIR (two pairs, AA223)
* THREEOFAKIND (any three cards of same value, KKK23)
* STRAIGHT (five cards in order, 23456)
* FULLHOUSE (a pair and three of a kind, AAKKK)
* FOUROFAKIND (four cards of same value, AAAA2)

The output is the named rank of each hand and a winner, 0 if hand 0 won, 1 if
hand 1, and 01 if it was a tie.

Sample Input:
 
Input Line #1: AAKKK, 23456
Output #1: FULLHOUSE, STRAIGHT, 0
 
Input Line #2: KA225, 33A47
Output #2: PAIR, PAIR, 1
 
Input Line #3: AA225, 44465
Output #3: TWOPAIR, THREEOFAKIND, 1
 
Input Line #4: TT4A2, TTA89
Output #4: PAIR, PAIR, 01 
 
Input Line #5: A345\*, 254\*6
Output #5: STRAIGHT, STRAIGHT, 1
 
Input Line #4: QQ2AT, QQT2J
Output #4: PAIR, PAIR, 0