import { reinit, keyframes } from '../index';
import * as assert from 'assert';
describe("keyframes", function () {
    it('supports $debugName in animation name', function () {
        reinit();
        var animationName = keyframes({
            $debugName: 'fade-in',
            from: { opacity: 0 },
            to: { opacity: 1 }
        });
        assert.equal(animationName, 'fade-in_f1gwuh0p');
    });
    it('supports generated animation name', function () {
        reinit();
        var animationName = keyframes({
            from: { opacity: 0 },
            to: { opacity: 1 }
        });
        assert.equal(animationName, 'f1gwuh0p');
    });
});
