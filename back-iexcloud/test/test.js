exports.it = (function () {
    'use strict';

    /**
     * test function
     * @param {string} desc
     * @param {function} fn
     */
    function it(desc, fn) {
        try {
            fn();
            console.log('\x1b[32m%s\x1b[0m', '\u2714  ' + desc);
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);//Red Color
            // console.log('\x1b[33m%s\x1b[0m', '\u2718 ' + desc);//warning color
            // console.error(error);
        }
    }
    it('should fail', function () {
        assert(1 !== 1);
    });
    it('should pass', function () {
        assert(1 === 1);
    });
})();
function assert(isTrue) {
    if (!isTrue) {
        throw new error;
    }
};