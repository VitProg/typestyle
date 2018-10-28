"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe("fontFace", function () {
    it('support font faces', function () {
        index_1.reinit();
        index_1.fontFace({
            fontFamily: '"Bitstream Vera Serif Bold"',
            src: 'url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf")'
        });
        assert.equal(index_1.getStyles(), '@font-face{font-family:"Bitstream Vera Serif Bold";src:url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf")}');
    });
});
