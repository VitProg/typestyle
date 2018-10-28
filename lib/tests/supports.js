"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe('@supports', function () {
    it('standard freestyle', function () {
        index_1.reinit();
        index_1.style({
            color: 'red',
            $nest: {
                '@supports (display: flex)': {
                    color: 'white'
                }
            }
        });
        assert.equal(index_1.getStyles(), '.f5f13tn{color:red}@supports (display: flex){.f5f13tn{color:white}}');
    });
});
