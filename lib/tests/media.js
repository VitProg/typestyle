"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe("media query", function () {
    it("standard freestyle", function () {
        index_1.reinit();
        index_1.style({
            color: 'red',
            $nest: {
                '@media (min-width: 400px)': { color: 'red' }
            }
        });
        var standardFreeStyle = index_1.getStyles();
        index_1.reinit();
        index_1.style({ color: 'red' }, index_1.media({
            minWidth: 400
        }, { color: 'red' }));
        assert.equal(index_1.getStyles(), standardFreeStyle);
    });
    it("support type", function () {
        index_1.reinit();
        index_1.style({ color: 'red' }, index_1.media({ minWidth: 400, type: 'screen' }, { color: 'red' }));
        assert.equal(index_1.getStyles(), '.f1960l9c{color:red}@media screen and (min-width: 400px){.f1960l9c{color:red}}');
    });
    it("support $nest", function () {
        index_1.reinit();
        index_1.style(index_1.media({ minWidth: 400 }, {
            color: 'red',
            $nest: {
                '&:hover': {
                    color: 'green'
                }
            }
        }));
        assert.equal(index_1.getStyles(), '@media (min-width: 400px){.f1wrs385{color:red}.f1wrs385:hover{color:green}}');
    });
    it("support non-pixel min-width", function () {
        index_1.reinit();
        var mediaRules = index_1.media({ minWidth: '20vh' }, { width: '10vh' });
        index_1.cssRule('.component', mediaRules);
        assert.equal(index_1.getStyles(), '@media (min-width: 20vh){.component{width:10vh}}');
    });
    it("support non-pixel max-width", function () {
        index_1.reinit();
        var mediaRules = index_1.media({ maxWidth: '20vh' }, { width: '10vh' });
        index_1.cssRule('.component', mediaRules);
        assert.equal(index_1.getStyles(), '@media (max-width: 20vh){.component{width:10vh}}');
    });
    it("support non-pixel min-height", function () {
        index_1.reinit();
        var mediaRules = index_1.media({ minHeight: '20vh' }, { height: '10vh' });
        index_1.cssRule('.component', mediaRules);
        assert.equal(index_1.getStyles(), '@media (min-height: 20vh){.component{height:10vh}}');
    });
    it("support non-pixel max-height", function () {
        index_1.reinit();
        var mediaRules = index_1.media({ maxHeight: '20vh' }, { height: '10vh' });
        index_1.cssRule('.component', mediaRules);
        assert.equal(index_1.getStyles(), '@media (max-height: 20vh){.component{height:10vh}}');
    });
    it("support orientation", function () {
        index_1.reinit();
        var mediaRules = index_1.media({ orientation: 'portrait' }, { color: 'red' });
        index_1.cssRule('.component', mediaRules);
        assert.equal(index_1.getStyles(), '@media (orientation: portrait){.component{color:red}}');
    });
});
