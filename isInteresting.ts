/*
*     7777...8?!??!", exclaimed Bob, "I missed it again! Argh!" Every time there's an interesting number coming up, he notices and then promptly forgets. Who doesn't like catching those one-off interesting mileage numbers?

Let's make it so Bob never misses another interesting number. We've hacked into his car's computer, and we have a box hooked up that reads mileage numbers. We've got a box glued to his dash that lights up yellow or green depending on whether it receives a 1 or a 2 (respectively).

It's up to you, intrepid warrior, to glue the parts together. Write the function that parses the mileage number input, and returns a 2 if the number is "interesting" (see below), a 1 if an interesting number occurs within the next two miles, or a 0 if the number is not interesting.

Note: In Haskell, we use No, Almost and Yes instead of 0, 1 and 2.
"Interesting" Numbers

Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:

    Any digit followed by all zeros: 100, 90000
    Every digit is the same number: 1111
    The digits are sequential, incementing†: 1234
    The digits are sequential, decrementing‡: 4321
    The digits are a palindrome: 1221 or 73837
    The digits match one of the values in the awesomePhrases array

    † For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
    ‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

So, you should expect these inputs and outputs:

// "boring" numbers
isInteresting(3, [1337, 256]);    // 0
isInteresting(3236, [1337, 256]); // 0

// progress as we near an "interesting" number
isInteresting(11207, []); // 0
isInteresting(11208, []); // 0
isInteresting(11209, []); // 1
isInteresting(11210, []); // 1
isInteresting(11211, []); // 2

// nearing a provided "awesome phrase"
isInteresting(1335, [1337, 256]); // 1
isInteresting(1336, [1337, 256]); // 1
isInteresting(1337, [1337, 256]); // 2

Error Checking

    A number is only interesting if it is greater than 99!
    Input will always be an integer greater than 0, and less than 1,000,000,000.
    The awesomePhrases array will always be provided, and will always be an array, but may be empty. (Not everyone thinks numbers spell funny words...)
    You should only ever output 0, 1, or 2.

* */

import {describe, it} from "node:test";

export function isInteresting(n: number, awesomePhrases: number[]): number {
    if (n < 100) {
        return 0;
    }

    const isAwesome = (n: number) => awesomePhrases.includes(n);
    const predicates = [
        isIncrementing,
        isDecrementing,
        isPalindrome,
        hasAllTheSame,
        hasAllZeros,
        isAwesome
    ];

    return predicates.reduce((accum, predicate) => {
        if (accum === 2) {
            return accum;
        }
        if (executePredicate(n, predicate) === 2) {
            return 2;
        }
        if (executePredicate(n, predicate) === 1 && accum !== 2) {
            return 1;
        }
        return accum;
    }, 0);
}

const hasAllZeros = (n: number): boolean => Number(n.toString().slice(1)) === 0;
const hasAllTheSame = (n: number): boolean => n.toString().split("").every((x, _, arr) => x === arr[0]);
const isIncrementing = (n: number): boolean => n.toString().split("").reduce((accum, element, currentIndex, arr) => {
    if (currentIndex === 0) {
        return accum;
    }
    if (element === "1" && arr[currentIndex - 1] === "0") {
        return false;
    }
    if (element === "0" && arr[currentIndex - 1] === "9") {
        return true;
    }
    return accum ? Number(element) === Number(arr[currentIndex - 1]) + 1 : accum;
}, true);
const isDecrementing = (n: number): boolean => n.toString().split("").reduce((accum, element, currentIndex, arr) => {
    if (currentIndex === 0) {
        return accum;
    }
    if (element === "9" && arr[currentIndex - 1] === "0") {
        return false;
    }
    return accum ? Number(element) === Number(arr[currentIndex - 1]) - 1 : accum;
}, true);
const isPalindrome = (n: number): boolean => n.toString().split("").every((x, index, arr) => {
    return arr.length % 2 !== 0 && Math.floor(arr.length % 2) === index ? true : x === arr[arr.length - index - 1];
})
const executePredicate = (n: number, predicate: (x: number) => boolean): 0 | 1 | 2 => {
    if (predicate(n)) {
        return 2;
    }
    if (predicate(n + 1) || predicate(n + 2)) {
        return 1;
    }
    return 0
}

console.log(isPalindrome(7987))

import {assert} from "chai";

function test(n: number, awesome: number[], expected: number) {
    assert.strictEqual(isInteresting(n, awesome), expected);
}

describe("solution", function () {
    it('should work, dangit!', function () {
        test(3, [1337, 256], 0);
        test(1336, [1337, 256], 1);
        // test(1337, [1337, 256],  2);
        // test(11208, [1337, 256], 0);
        // test(11209, [1337, 256], 1);
        // test(11211, [1337, 256], 2);
    });
});