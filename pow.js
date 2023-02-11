const pow = JSON.parse('input-pow-json-here');
const crypto = require('crypto-js');

function solveChallenge(pow) {
    let buffered = '';
    buffered += pow.pow.algorithm.version;
    buffered += ':';
    buffered += pow.pow.complexity;
    buffered += ':';
    buffered += pow.pow.timestamp;
    buffered += ':';
    buffered += pow.pow.algorithm.resourse;
    buffered += ':';
    buffered += pow.pow.algorithm.extension;
    buffered += ':';
    buffered += pow.pow.random_string;
    buffered += ':';

    for (let j = 0; j < Number.MAX_SAFE_INTEGER; j++) {
        let doubleBuffer = '';
        doubleBuffer += buffered;
        doubleBuffer += j;

        let hash = crypto.SHA3(doubleBuffer, { outputLength: 512 });
        if (hash.toString().startsWith('0'.repeat(pow.pow.complexity))) {
            return j;
        }
    }

    return -1;
}

const pow_final = solveChallenge(pow);
console.log(pow_final);