import { style, getStyles, reinit, cssRaw } from '../index';
import * as assert from 'assert';
describe("raw css support", function () {
    it('should insert raw css by itself', function () {
        reinit();
        var rawCSS = "\n    body {\n      width: '100%'\n    }\n";
        cssRaw(rawCSS);
        assert.equal(getStyles(), rawCSS);
    });
    it('should insert raw CSS followed by style', function () {
        reinit();
        var rawCSS = "\n    body {\n      width: '100%'\n    }\n";
        style({
            color: 'red'
        });
        cssRaw(rawCSS);
        assert.equal(getStyles(), rawCSS + '.f1jvcvsh{color:red}');
    });
});
