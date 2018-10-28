"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe("raw css support", function () {
    it('should insert raw css by itself', function () {
        index_1.reinit();
        var rawCSS = "\n    body {\n      width: '100%'\n    }\n";
        index_1.cssRaw(rawCSS);
        assert.equal(index_1.getStyles(), rawCSS);
    });
    it('should insert raw CSS followed by style', function () {
        index_1.reinit();
        var rawCSS = "\n    body {\n      width: '100%'\n    }\n";
        index_1.style({
            color: 'red'
        });
        index_1.cssRaw(rawCSS);
        assert.equal(index_1.getStyles(), rawCSS + '.f1jvcvsh{color:red}');
    });
});
