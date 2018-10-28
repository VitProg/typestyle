"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe("keyframes", function () {
    it('supports $debugName in animation name', function () {
        index_1.reinit();
        var animationName = index_1.keyframes({
            $debugName: 'fade-in',
            from: { opacity: 0 },
            to: { opacity: 1 }
        });
        assert.equal(animationName, 'fade-in_f1gwuh0p');
    });
    it('supports generated animation name', function () {
        index_1.reinit();
        var animationName = index_1.keyframes({
            from: { opacity: 0 },
            to: { opacity: 1 }
        });
        assert.equal(animationName, 'f1gwuh0p');
    });
});
