"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe('@events', function () {
    it('updated event', function (done) {
        index_1.reinit();
        index_1.events.once('updated', function () {
            assert.equal(index_1.getStyles(), '.f5f13tn{color:red}@supports (display: flex){.f5f13tn{color:white}}');
            done();
        });
        index_1.style({
            color: 'red',
            $nest: {
                '@supports (display: flex)': {
                    color: 'white'
                }
            }
        });
    });
    it('render event', function (done) {
        index_1.reinit();
        index_1.events.once('render', function (css) {
            assert.equal(css, '.f5f13tn{color:red}@supports (display: flex){.f5f13tn{color:white}}');
            assert.equal(index_1.getStyles(), '.f5f13tn{color:red}@supports (display: flex){.f5f13tn{color:white}}');
            done();
        });
        index_1.style({
            color: 'red',
            $nest: {
                '@supports (display: flex)': {
                    color: 'white'
                }
            }
        });
    });
});
