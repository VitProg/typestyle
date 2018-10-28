"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var assert = require("assert");
describe("extend", function () {
    it("plain objects should be preserved", function () {
        assert.deepEqual(index_1.extend({ color: 'red' }), { color: 'red' });
    });
    it("nested objects should not get flattened", function () {
        assert.deepEqual(index_1.extend({
            $nest: { '&:hover': { color: 'red' } }
        }), {
            $nest: { '&:hover': { color: 'red' } }
        });
    });
    it("nested objects should merge into non nested", function () {
        assert.deepEqual(index_1.extend({ color: 'grey' }, { $nest: { '&:hover': { color: 'red' } } }), {
            color: 'grey',
            $nest: { '&:hover': { color: 'red' } }
        });
    });
    it("nested objects should merge together", function () {
        assert.deepEqual(index_1.extend({ color: 'grey' }, { backgroundColor: 'grey' }, { $nest: { '&:hover': { color: 'red' } } }, { $nest: { '&:hover': { backgroundColor: 'red' } } }), {
            color: 'grey',
            backgroundColor: 'grey',
            $nest: {
                '&:hover': {
                    color: 'red',
                    backgroundColor: 'red'
                }
            }
        });
    });
    it("extend should compose i.e. should be nestable", function () {
        assert.deepEqual(index_1.extend(index_1.extend({ $nest: { '&:hover': { color: 'red' } } }), { $nest: { '&:hover': { backgroundColor: 'red' } } }), {
            $nest: {
                '&:hover': {
                    color: 'red',
                    backgroundColor: 'red'
                }
            }
        });
    });
    it("extend should compose i.e. should be truly nestable", function () {
        assert.deepEqual(index_1.extend(index_1.extend({ $nest: { '&:hover': { color: 'red' } } }), index_1.extend({ $nest: { '&:hover': { backgroundColor: 'red' } } })), {
            $nest: {
                '&:hover': {
                    color: 'red',
                    backgroundColor: 'red'
                }
            }
        });
    });
    it("different nested keys should not merge", function () {
        assert.deepEqual(index_1.extend({ $nest: { '&:hover': { color: 'red' } } }, { $nest: { '&:hover': { backgroundColor: 'red' } } }, { $nest: { '&:focus': { backgroundColor: 'red' } } }, { $nest: { '&:hover': { fontSize: '14px' }, '&:focus': { fontFamily: 'arial' } } }), {
            $nest: {
                '&:hover': {
                    fontSize: '14px',
                    color: 'red',
                    backgroundColor: 'red'
                },
                '&:focus': {
                    fontFamily: 'arial',
                    backgroundColor: 'red'
                }
            }
        });
    });
});
