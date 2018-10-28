"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe("initial test", function () {
    it("should pass", function () {
        index_1.reinit();
        assert(index_1.getStyles() === '');
        index_1.style({ color: 'red' });
        assert.equal(index_1.getStyles(), '.f1jvcvsh{color:red}');
    });
    it("reinit should clear", function () {
        index_1.reinit();
        assert(index_1.getStyles() === '');
        index_1.style({ color: 'red' });
        assert.equal(index_1.getStyles(), '.f1jvcvsh{color:red}');
    });
    it("child same", function () {
        index_1.reinit();
        index_1.style({ color: 'red', $nest: { '&>*': { color: 'red' } } });
        assert.equal(index_1.getStyles(), '.f1nv0def,.f1nv0def>*{color:red}');
    });
    it("child same unique", function () {
        index_1.reinit();
        index_1.style({ color: 'red', $nest: { '&>*': { color: 'red', $unique: true } } });
        assert.equal(index_1.getStyles(), '.f1nv0def{color:red}.f1nv0def>*{color:red}');
    });
    it("child different", function () {
        index_1.reinit();
        index_1.style({ color: 'red', $nest: { '&>*': { color: 'blue' } } });
        assert.equal(index_1.getStyles(), '.fv84gyi{color:red}.fv84gyi>*{color:blue}');
    });
    it("media same", function () {
        index_1.reinit();
        index_1.style({
            color: 'red',
            $nest: {
                '@media (min-width: 400px)': { color: 'red' }
            }
        });
        assert.equal(index_1.getStyles(), '.f12z113b{color:red}@media (min-width: 400px){.f12z113b{color:red}}');
    });
    it("media different", function () {
        index_1.reinit();
        index_1.style({ color: 'red', $nest: { '@media (min-width: 400px)': { color: 'blue' } } });
        assert.equal(index_1.getStyles(), '.fxfrsga{color:red}@media (min-width: 400px){.fxfrsga{color:blue}}');
    });
    it("classes should compose", function () {
        assert.equal(index_1.classes("a", "b"), "a b");
        assert.equal(index_1.classes("a", false && "b"), "a");
        assert.equal(index_1.classes("a", false && "b", "c"), "a c");
    });
    it("transparent string should render transparent in color property", function () {
        index_1.reinit();
        index_1.cssRule('.transparent', { color: 'transparent' });
        index_1.style({ color: 'transparent' });
        assert.equal(index_1.getStyles(), '.transparent,.fwarpl0{color:transparent}');
    });
    it("should support dedupe by default", function () {
        index_1.reinit();
        index_1.style({
            color: 'blue',
            $nest: {
                '&::-webkit-input-placeholder': {
                    color: "rgba(0, 0, 0, 0)",
                },
                '&::-moz-placeholder': {
                    color: "rgba(0, 0, 0, 0)",
                },
                '&::-ms-input-placeholder': {
                    color: "rgba(0, 0, 0, 0)",
                }
            }
        });
        assert.equal(index_1.getStyles(), '.f13byakl{color:blue}.f13byakl::-webkit-input-placeholder,.f13byakl::-moz-placeholder,.f13byakl::-ms-input-placeholder{color:rgba(0, 0, 0, 0)}');
    });
    it("should support $unique", function () {
        index_1.reinit();
        index_1.style({
            color: 'blue',
            $nest: {
                '&::-webkit-input-placeholder': {
                    $unique: true,
                    color: "rgba(0, 0, 0, 0)",
                },
                '&::-moz-placeholder': {
                    $unique: true,
                    color: "rgba(0, 0, 0, 0)",
                },
                '&::-ms-input-placeholder': {
                    $unique: true,
                    color: "rgba(0, 0, 0, 0)",
                }
            }
        });
        assert.equal(index_1.getStyles(), '.f13byakl{color:blue}.f13byakl::-webkit-input-placeholder{color:rgba(0, 0, 0, 0)}.f13byakl::-moz-placeholder{color:rgba(0, 0, 0, 0)}.f13byakl::-ms-input-placeholder{color:rgba(0, 0, 0, 0)}');
    });
    it("should support $debugName", function () {
        index_1.reinit();
        index_1.style({
            $debugName: 'sample',
            color: 'blue',
            $nest: {
                '&:hover': {
                    color: 'rgba(0, 0, 0, 0)',
                }
            }
        });
        assert.equal(index_1.getStyles(), '.sample_fy3xmhm{color:blue}.sample_fy3xmhm:hover{color:rgba(0, 0, 0, 0)}');
    });
    it("should generate meaningful classnames using stylesheet", function () {
        index_1.reinit();
        var classes = index_1.stylesheet({
            warning: {
                color: 'red'
            },
            success: {
                color: 'green'
            }
        });
        assert.deepEqual(classes, {
            warning: 'warning_f1jvcvsh',
            success: 'success_fmubem1'
        });
        assert.equal(index_1.getStyles(), '.warning_f1jvcvsh{color:red}.success_fmubem1{color:green}');
    });
    it("style should ignore 'false' 'null' and 'undefined'", function () {
        index_1.reinit();
        index_1.style({ color: 'blue' }, false && { color: 'red' }, null, undefined, { backgroundColor: 'red' });
        assert.equal(index_1.getStyles(), '.fb25ljk{background-color:red;color:blue}');
    });
    it("should generate unique instances when typestyle() is called", function () {
        var ts1 = index_1.createTypeStyle({ textContent: '' });
        var ts2 = index_1.createTypeStyle({ textContent: '' });
        ts1.style({ fontSize: 14 });
        ts2.style({ fontSize: 16 });
        assert.equal(ts1.getStyles(), '.fc4zu15{font-size:14px}');
        assert.equal(ts2.getStyles(), '.f1rwc7t7{font-size:16px}');
    });
    it("should work if no target is set on an instance", function () {
        var ts = index_1.createTypeStyle();
        ts.cssRule('body', { fontSize: 12 });
        assert.equal(ts.getStyles(), 'body{font-size:12px}');
    });
});
