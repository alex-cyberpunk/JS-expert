const {createSandBox} = require('sinon');
const sinon = createSandBox();
const assert = require('assert');
const Fibonacci = require('./fibonacci');

const fibonacci = new Fibonacci();

;(async () => {
    
    {
        //Numero de sequencias 5
        //[0] input = 5, current = 0, next = 1 output = 0
        //[1] input = 4, current = 1, next = 1 output = 1
        //[2] input = 3, current = 1, next = 2 output = 1
        //[3] input = 2, current = 2, next = 3 output = 2
        //[4] input = 1, current = 3, next = 5 output = 3
        //[5] input = 0

        for(const sequencia of fibonacci.execute(5)){
            const expectedCallCount = 6;
            assert.deepStrictEqual(spy.calLCount, expectedCallCount);
        }
    }
})()