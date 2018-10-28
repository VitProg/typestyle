"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe("test rules", function () {
    it("it should provide expected output when used as css framework", function () {
        index_1.reinit();
        /** Sample variables */
        var colors = {
            primary: 'blue',
            info: 'lightblue',
            success: 'green',
            warning: 'orange',
            danger: 'red',
            bgColor: 'white'
        };
        var fonts = {
            baseSize: '14pt'
        };
        // set html styles
        index_1.cssRule('html', {
            height: '100%'
        });
        // set default body styles
        index_1.cssRule('body', {
            fontSize: fonts.baseSize,
            margin: 0,
            padding: 0,
            height: '100%',
            backgroundColor: colors.bgColor,
            color: colors.primary
        });
        assert.equal(index_1.getStyles(), 'html{height:100%}body{background-color:white;color:blue;font-size:14pt;height:100%;margin:0;padding:0}');
    });
    it("support application style layout", function () {
        index_1.reinit();
        /** Use full window size for application */
        index_1.cssRule('html, body', {
            height: '100%',
            width: '100%',
            padding: 0,
            margin: 0
        });
        /** Use border box */
        index_1.cssRule('html', {
            boxSizing: 'border-box'
        });
        index_1.cssRule('*,*:before,*:after', {
            boxSizing: 'inherit',
        });
        assert.equal(index_1.getStyles(), 'html, body{height:100%;margin:0;padding:0;width:100%}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}');
    });
    it('support global media queries', function () {
        index_1.reinit();
        /** Save ink with a white background */
        index_1.cssRule('@media print', {
            $nest: {
                body: {
                    background: 'white'
                }
            }
        });
        assert.equal(index_1.getStyles(), '@media print{body{background:white}}');
    });
});
