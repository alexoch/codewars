/*
* 1, 246, 2, 123, 3, 82, 6, 41 are the divisors of number 246.
Squaring these divisors we get: 1, 60516, 4, 15129, 9, 6724, 36, 1681.
The sum of these squares is 84100 which is 290 * 290.
Task
Find all integers between m and n (m and n are integers with 1 <= m <= n) such that the sum of their squared divisors is itself a square.
We will return an array of subarrays or of tuples (in C an array of Pair) or a string.
The subarrays (or tuples or Pairs) will have two elements: first the number the squared divisors of which is a square and then the sum of the squared divisors.
Example:
m =  1, n = 250 --> [[1, 1], [42, 2500], [246, 84100]]
m = 42, n = 250 --> [[42, 2500], [246, 84100]]
* */

export const listSquared = (m: number, n: number): number[][] => {
    const currentTime = Date.now();
    const res = [];
    for (let i = m; i < n; i++) {
        const div = divisors(i);
        if (Math.sqrt(div) % 1 === 0) {
            res.push([i, div]);
        }
    }
    console.log(Date.now()-currentTime)

    return res
}

const divisors = (m: number): number => {
    let res = m*m;
    //const divs = [];
    for (let i = 1; i < Math.floor(m/2)+1; i++) {
        if (m % i === 0) {
      //      divs.push(i);
            res += i*i;
        }
    }
    //console.log(divs)
    return res;
}

console.log(listSquared(2500,7000))
